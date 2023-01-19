import mongoengine as me
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields
from datetime import datetime
import json
from profile import ProfileObj
from board import Board

UserProfile = ProfileObj.Profile
Thread = Board.Thread

class Notification(me.Document):
    recipient = me.StringField(required=True)
    sender = me.StringField(required=True)
    activity_type = me.StringField(required = True)
    object_type = me.StringField(required=True)
    object_id = me.StringField()
    time_of_creation = me.StringField()
    is_read = me.BooleanField(default=False)

    def create_notification(incomingData):
        x = checkFields(incomingData, fields=['activity_type'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if incomingData['activity_type'] == 'replied to the discussion' :
            thread = Thread.objects(pk = incomingData['_id']).first()
            if thread.users[0] != incomingData['username']:
                Notification(
                    recipient = thread.users[0],
                    sender = incomingData['username'],
                    activity_type = 'replied to the discussion',
                    object_type = 'thread',
                    object_id = incomingData['_id'],
                    time_of_creation = datetime.now().strftime("%d %b %Y, %H:%M:%S")
                ).save()
            return
        elif incomingData['activity_type'] == 'connected with you' :
            Notification(
                recipient = incomingData['username2'],
                sender = incomingData['username1'],
                activity_type = 'connected with you',
                object_type = 'connection',
                time_of_creation = datetime.now().strftime("%d %b %Y, %H:%M:%S")
            ).save()
        elif incomingData['activity_type'] == 'added you friend' :
            Notification(
                recipient = incomingData['username2'],
                sender = incomingData['username1'],
                activity_type = 'added you friend',
                object_type = 'friend',
                time_of_creation = datetime.now().strftime("%d %b %Y, %H:%M:%S")
            ).save()
        else:
            return

    def get_all_notifications(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        latestNotifications = Notification.objects(recipient = incomingData['username']).order_by('-$natural')[:20]
        top20LatestNotifications = []

        for i in latestNotifications:
            if i.object_type == 'thread':
                thread = Thread.objects(pk = i.object_id).first()
                profile = UserProfile.objects(username = i.sender).first()
                notificationToSend = json.loads(i.to_json())
                notificationToSend['title'] = thread.title
                notificationToSend['time_of_creation'] = str(datetime.now() - datetime.strptime(i.time_of_creation, '%d %b %Y, %H:%M:%S'))
                notificationToSend['profilePicture'] = profile.profilePicture
                top20LatestNotifications.append(notificationToSend)

            elif i.object_type == 'connection' or i.object_type == 'friend':
                profile = UserProfile.objects(username = i.sender).first()
                notificationToSend = json.loads(i.to_json())
                notificationToSend['time_of_creation'] = str(datetime.now() - datetime.strptime(i.time_of_creation, '%d %b %Y, %H:%M:%S'))
                notificationToSend['profilePicture'] = profile.profilePicture
                top20LatestNotifications.append(notificationToSend)

            else:
                pass

            if i.is_read == False:
                i.update(set__is_read = True)

        return make_response(jsonify(top20LatestNotifications), 200)


    
    def get_number_of_unseen_notification(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        totalUnseenNotifications = Notification.objects(me.Q(is_read = False ) & me.Q(recipient = incomingData['username'])).count()

        return make_response(str(totalUnseenNotifications), 200)

    def delete_notification(incomingData):
        
        x = checkFields(incomingData, fields=['activity_type'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if incomingData['activity_type'] == 'replied to the discussion':

            if incomingData['username'] == 'DELETE ALL THE NOTIFICATION FOR THIS THREAD':
                notificationToBeDeleted = Notification.objects(object_id = incomingData['_id']).all()
                notificationToBeDeleted.delete()
                return
            else:
                notificationToBeDeleted = Notification.objects(me.Q(object_id = incomingData['_id']) & me.Q(sender = incomingData['username'])).order_by('-$natural').first()
                
                if notificationToBeDeleted:
                    notificationToBeDeleted.delete()
                    
                return
        elif incomingData['activity_type'] == 'connected with you':

            notificationToBeDeleted = Notification.objects((me.Q(recipient = incomingData['username2']) | me.Q(recipient = incomingData['username1'])) & (me.Q(sender = incomingData['username2']) | me.Q(sender = incomingData['username1'])) & me.Q(object_type = 'connection'))[:2]

            if notificationToBeDeleted:
                notificationToBeDeleted.delete()
                return
            else:
                return
        elif incomingData['activity_type'] == 'added you friend':

            notificationToBeDeleted = Notification.objects((me.Q(recipient = incomingData['username2']) | me.Q(recipient = incomingData['username1'])) & (me.Q(sender = incomingData['username2']) | me.Q(sender = incomingData['username1'])) & me.Q(object_type = 'friend'))[:2]

            if notificationToBeDeleted:
                notificationToBeDeleted.delete()
                return
            else:
                return