import mongoengine as me
import hashlib
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields
from datetime import datetime
from user import UserObj
from profile import ProfileObj
import json
User = UserObj.User
Profile = ProfileObj.Profile

class Board():
    """
    This class holds all the CRUD methods for the messages
    """
	
    # generic Thread class inheriting the mongo document 
    class Thread(me.Document):

        title = me.StringField(required=True)
        users = me.ListField(me.StringField(required=True))
        bodies = me.ListField(me.StringField(), default = [])
        timestamps = me.ListField(me.StringField(required=True))
        community = me.StringField(required=True)
        time_of_creation = me.DateTimeField(default=datetime.utcnow)
        total_number_of_replies = me.IntField(default = 0)
        saved_by = me.ListField(me.StringField(required=True), default = [])

        #the thread will be deleted after 1.5 days or 36.5 hours
        meta = {'indexes':[{
          'fields': ['time_of_creation'],
          'expireAfterSeconds': 131400
        }
        ]}


    def __init__(self, content):
        """
        Instantiates a new instance of MessageObj
        """
        self.content = content

    def db_create_thread(self):
        """
        creates a thread for the first time
        """
        x = checkFields(self.content, fields=['username', 'title', 'community'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if (User.objects(username=self.content['username']).count() <= 0):
            return make_response("Username does not exist.", 404)

        if self.content['body']:
            theCreatedThread = self.Thread(users=[self.content['username']], bodies=[self.content['body']], timestamps=[datetime.now().strftime("%d %b %Y, %H:%M:%S")], title = self.content['title'], community = self.content['community']).save()
        else:
            theCreatedThread = self.Thread(users=[self.content['username']], bodies=['NO DESCRIPTION'], timestamps=[datetime.now().strftime("%d %b %Y, %H:%M:%S")], title = self.content['title'], community = self.content['community']).save()
        
        return make_response(jsonify(theCreatedThread), 200)

    def db_put_thread_reply(self):
        x = checkFields(self.content, fields=['username', '_id', 'body'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if (User.objects(username=self.content['username']).count() <= 0):
            return make_response("Username does not exist.", 404)

        thread = self.Thread.objects(pk=self.content['_id']).first()
        if thread:
            thread.users.append(self.content["username"])
            thread.bodies.append(self.content["body"])
            thread.timestamps.append(datetime.now().strftime("%d %b %Y, %H:%M:%S"))
            thread.update(inc__total_number_of_replies = 1)
            thread.save()
            return make_response("", 200)
        else:
            return make_response("Thread does not exist.", 404)

    def db_get_thread_id(self):
        
        x = checkFields(self.content, fields=['_id'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        thread = self.Thread.objects(pk=self.content['_id']).first()
        if thread:
            return make_response(jsonify(thread), 200)
        else:
            return make_response("Thread does not exist.", 404)

    def db_get_all_threads(self):
        if self.content['option'] == "Trending":
            thread = self.Thread.objects.only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community').order_by('-total_number_of_replies')[:12]
        elif self.content['option'] == "My Discussions":
            thread = self.Thread.objects(users__0 = self.content['username']).only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community')[:12]
        elif self.content['option'] == "Saved":
            thread = self.Thread.objects(saved_by__in = self.content['username']).only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community')[:12]
        else:
            thread = self.Thread.objects.order_by('-$natural').only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community')[:12]

        if len(thread) > 0:
            board = []
            for t in thread:
                profile = Profile.objects(username = t.users[0]).only('name', 'profilePicture').first()
                timeLeftInSeconds = (datetime.now() - datetime.strptime(t.timestamps[0], "%d %b %Y, %H:%M:%S")).total_seconds()
                t = t.to_json()
                t = json.loads(t)
                t['name'] = profile.name
                t['profilePicture'] = profile.profilePicture
                t['timePassedInPercent'] = int(timeLeftInSeconds / 131400 * 100)
                board.append(t)
            return make_response(jsonify(board), 200)
        else:
            return make_response("No Threads", 404)

    def db_get_all_threads_of_community(self):
        x = checkFields(self.content, fields=['community'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if self.content['option'] == "Trending":
            thread = self.Thread.objects(community=self.content['community']).only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community').order_by('total_number_of_replies')[:12]
        elif self.content['option'] == "My Discussions":
            thread = self.Thread.objects(community=self.content['community'], users__0 = self.content['username']).only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community')[:12]
        elif self.content['option'] == "Saved":
            thread = self.Thread.objects(community=self.content['community'], saved_by__in = self.content['username']).only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community')[:12]
        else:
            thread = self.Thread.objects(community=self.content['community']).only('id', 'title', 'users', 'timestamps', 'total_number_of_replies', 'community').order_by('-$natural')[:12]

        if len(thread) > 0:
            board = []
            for t in thread:
                profile = Profile.objects(username = t.users[0]).only('name', 'profilePicture').first()
                timeLeftInSeconds = (datetime.now() - datetime.strptime(t.timestamps[0], "%d %b %Y, %H:%M:%S")).total_seconds()
                t = t.to_json()
                t = json.loads(t)
                t['name'] = profile.name
                t['profilePicture'] = profile.profilePicture
                t['timePassedInPercent'] = int(timeLeftInSeconds / 131400 * 100)
                board.append(t)
            return make_response(jsonify(board), 200)
        else:
            return make_response("No Threads", 404)

    def search_thread(self, incomingData):

        x = checkFields(incomingData, fields=['title'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        findThreadTitle= self.Thread.objects.search_text(incomingData['title']).all()
        
        if findThreadTitle:
            return make_response(jsonify(findThreadTitle), 200)
        else:
            return make_response("No Threads", 404)

    def remove_reply(self, incomingData):

        x = checkFields(incomingData, fields=['_id'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        findThread = self.Thread.objects(pk=incomingData['_id']).first()
        index = incomingData['index']

        if findThread:
            user = findThread.users
            user.pop(index)
            timestamps = findThread.timestamps
            timestamps.pop(index)
            bodies = findThread.bodies
            bodies.pop(index)
            findThread.update(set__users = user, set__timestamps = timestamps, set__bodies = bodies, dec__total_number_of_replies = 1)
            return make_response('Done', 200)
        else:
            return make_response("No Threads", 404)

    def delete_thread(self, incomingData):

        x = checkFields(incomingData, fields=['_id'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        findThread = self.Thread.objects(pk=incomingData['_id']).first()

        if findThread:
            findThread.delete()
            return make_response('Done', 200)
        else:
            return make_response('No Threads', 404)
