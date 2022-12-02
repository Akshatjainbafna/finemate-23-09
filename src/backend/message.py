from enum import unique
import json
import mongoengine as me
import hashlib
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields
from datetime import datetime
from user import UserObj
User = UserObj.User 

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


        def to_json(self):
            """
            Returns the message object as a json.
            """

            return {
                "username1": self.username1,
                "username2": self.username2,
                "message": self.message, 
                "time": self.time,
            }

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

        if (User.objects(username=self.content['username1']).count() <= 0):
            return make_response("Username1 does not exist.", 404)
        if (User.objects(username=self.content['username2']).count() <= 0):
            return make_response("Username2 does not exist.", 404)

        self.Message(username1=self.content['username1'], username2=self.content['username2'], message=self.content['message'], time=datetime.now().strftime("%Y/%m/%d, %H:%M:%S")).save()
        return make_response("", 200)
    
    def db_get_messages(self):
        """
        Gets all the messages between two users
        """
        x = checkFields(self.content, fields=['username1','username2'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        #in case if want messages from a name irrespective the case the username is stored
        lowercaseTargetUserName=self.content['username2'].lower()
        uppercaseTargetUserName=self.content['username2'].upper()
        swapcaseTargetUserName=self.content['username2'].swapcase()
        titlecaseTargetUserName=self.content['username2'].title()
        capitalcaseTargetUserName=self.content['username2'].capitalize()
        
        messages = []

        raw = self.Message.objects(username1=self.content['username1'],username2=self.content['username2']).all()

        for message in raw:
            messages.append(message.to_json())

        raw = self.Message.objects(username2=self.content['username1'],username1=self.content['username2']).all()

        for message in raw:
            if message.user2seen == False:
                message.update(set__user2seen = True)
            messages.append(message.to_json())

        if len(messages) == 0:
            return make_response("Messages between users does not exist", 404)
        else:
            messages = sorted(messages, key=lambda k: k['time'], reverse=False)
            return make_response(jsonify(messages), 200)

    def db_get_messaged_users(self):
        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        messages = []

        uniqueUsers=[self.content['username']]

        raw = self.Message.objects(me.Q(username1=self.content['username']) | me.Q(username2=self.content['username'])).order_by('-time').all()
        
        for i in raw:
            if len(messages)==10:
                break
            if i.username2 not in uniqueUsers or i.username1 not in uniqueUsers:
                latestMessage = i.to_json()
                timeOfMessage = datetime.strptime(latestMessage['time'] , "%Y/%m/%d, %H:%M:%S")
                timeDifference = datetime.now() - timeOfMessage
                latestMessage['time'] = str(timeDifference)
                messages.append(latestMessage)
                uniqueUsers.append(i.username1 if i.username2==self.content['username'] else i.username2)

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