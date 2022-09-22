from datetime import datetime
from Exceptions.MissingRequiredField import checkFields
from post import PostObj
from profile import ProfileObj
import mongoengine as me
from flask import Flask, make_response, request, jsonify
profile = ProfileObj.Profile
posts = PostObj.Posts


class Interaction(me.EmbeddedDocument):
    postId=me.ReferenceField(posts)
    liked=me.BooleanField(default=False)
    lighten=me.BooleanField(default=False)
    timesViewed=me.IntField(default=1)
    points=me.IntField(dafault=10)
    timeList=me.ListField(me.DateTimeField(default=datetime.now()))
        
class UserInteractions(me.Document):
    userReference= me.ReferenceField(profile, reverse_delete_rule=me.CASCADE)
    username=me.StringField(unique=True)
    savedPosts=me.ListField(me.ReferenceField(posts, reverse_delete_rule=me.CASCADE))
    interaction=me.ListField(me.EmbeddedDocumentField(Interaction))


        
        
def db_create_interactions_profile(self):
    """
	Saves the current user to the database.
	"""
	# required fields
    x = checkFields(self.content, fields=['username'])
    if (x):
        return make_response("Missing required field: " + x, 400)
            
    if (self.UserInteractions.objects(username=self.content['username']).count() > 0):
        return make_response("Username already in use.", 400)

    userReference = profile.objects(username=self.content['username']).first()
        
    self.UserInteractions(
        userReference=userReference,
        username=self.content['username']
		).save()
    return make_response("", 200)
    
def store_interactions(self):
    print("hellodadd")
    return "World"