from enum import unique
import json
import mongoengine as me
import hashlib
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields
from datetime import datetime
from profile import ProfileObj
Profile = ProfileObj.Profile


class MessageObj():
    """
    This class holds all the CRUD methods for the messages
    """
	
    # generic user class inheriting the mongo document 
    class Message(me.Document):

        username1 = me.StringField(required=True)
        username2 = me.StringField(required=True)
        message = me.StringField(required=True)
        time = me.StringField(required=True)
        user1seen = me.BooleanField(default = True)
        user2seen = me.BooleanField(default = False)


    def __init__(self, content):
        """
        Instantiates a new instance of MessageObj
        """
        self.content = content

    def db_send_message(self):
        """
        Sends a message between users, stores the user whos letter appears first in user1
        """
        x = checkFields(self.content, fields=['username1', 'username2', 'message'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if (Profile.objects(username=self.content['username1']).count() <= 0):
            return make_response("Username1 does not exist.", 404)
        if (Profile.objects(username=self.content['username2']).count() <= 0):
            return make_response("Username2 does not exist.", 404)

        self.Message(username1=self.content['username1'], username2=self.content['username2'], message=self.content['message'], time=datetime.now().strftime("%d %b %Y, %H:%M:%S")).save()
        return make_response("", 200)

    def db_delete_message(self):
        """
        Delete a message
        """
        x = checkFields(self.content, fields=['id'])
        if (x):
            return make_response("Missing required field: " + x, 400)


        messageToBeDeleted = self.Message.objects(id=self.content['id']).first()
        currentTime = datetime.now() - datetime.strptime(messageToBeDeleted.time, "%d %b %Y, %H:%M:%S")

        if messageToBeDeleted and currentTime.total_seconds() < 600:
            messageToBeDeleted.delete()
            return make_response("", 200)
        else:
            print('here')
            return make_response("Message is 10 Mins older", 400)
    
    def db_get_messages(self):
        """
        Gets all the messages between two users
        """
        x = checkFields(self.content, fields=['username1','username2'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        messages = []

        raw = self.Message.objects(me.Q(username1=self.content['username1'],username2=self.content['username2']) | me.Q(username2=self.content['username1'],username1=self.content['username2'])).all()

        for message in raw:
            messages.append(message)

        raw = self.Message.objects(username2=self.content['username1'],username1=self.content['username2']).all()

        for message in raw:
            if message.user2seen == False:
                message.update(set__user2seen = True)

        if len(messages) == 0:
            return make_response("Messages between users does not exist", 404)
        else:
            return make_response(jsonify(messages), 200)

    def db_get_messaged_users(self):
        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        messages = []

        uniqueUsers=[self.content['username']]

        raw = self.Message.objects(me.Q(username1=self.content['username']) | me.Q(username2=self.content['username'])).order_by('-$natural').all()
        
        for i in raw:
            if len(messages)==10:
                break
            if i.username2 not in uniqueUsers or i.username1 not in uniqueUsers:
                latestMessage = i.to_json()
                latestMessage = json.loads(latestMessage)
                timeOfMessage = datetime.strptime(latestMessage['time'] , "%d %b %Y, %H:%M:%S")
                timeDifference = datetime.now() - timeOfMessage
                latestMessage['time'] = str(timeDifference)

                if i.username2 == self.content['username']:
                    profilePicture = Profile.objects(username = i.username1).only('profilePicture').first()
                    uniqueUsers.append(i.username1)
                else:
                    profilePicture = Profile.objects(username = i.username2).only('profilePicture').first()
                    uniqueUsers.append(i.username2)

                latestMessage['profilePicture'] = profilePicture.profilePicture

                messages.append(latestMessage)

        return make_response(jsonify(messages), 200)

    def db_get_unseen_user_number(self):
        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        uniqueUsers=[self.content['username']]
        
        for i in self.Message.objects(me.Q(username2=self.content['username']) & me.Q(user2seen= False)).all():
            if i.username2 not in uniqueUsers or i.username1 not in uniqueUsers:
                uniqueUsers.append(i.username1 if i.username2==self.content['username'] else i.username2)

        totalNumberOfUnseenUsers = str(len(uniqueUsers) - 1)
        return make_response(totalNumberOfUnseenUsers, 200)