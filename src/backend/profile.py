
from email.policy import default
import json
import mongoengine as me
from mongoengine.fields import ListField
from mongoengine.fields import StringField
import hashlib
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields
from datetime import datetime


class ProfileObj():
	"""
	This class holds all the CRUD methods for the user profiles
	"""
	
	# generic user class inheriting the mongo document 
	class Profile(me.Document):

		username = me.StringField(required=True, unique = True)
		phone_number = me.StringField()
		first_name = me.StringField()
		last_name = me.StringField()
		name = me.StringField()
		time_join = me.StringField()
		description = me.StringField()
		languages = me.ListField(StringField(), default=list)
		completed_courses = me.ListField(StringField(), default=list)
		skills = me.ListField(StringField(), default=list)
		educations = me.ListField(StringField(), default=list)
		lookingForwardToLearn = me.ListField(StringField(), default=[])
		interests = me.ListField(StringField(), default=list)
		hate = me.ListField(StringField(), default=list)
		qualification=me.StringField()
		coreStream=me.StringField()
		friends= me.ListField(StringField(), default=list)
		connections= me.ListField(StringField(), default=list)
		pending = me.ListField(StringField(), default=list)
		profilePicture = me.StringField()
		notInterestedTopics=me.ListField(me.StringField(), default=list)

		def to_json(self):
			"""
			Returns the user object as a json.
			"""

			return {
				"username": self.username,
				"phone_number": self.phone_number,
				"first_name": self.first_name,
				"last_name": self.last_name,
				"name": self.name,
				"time_join": self.time_join,
				"description": self.description,
				"languages": self.languages,
				"completed_courses": self.completed_courses,
				"skills": self.skills,
				"educations": self.educations,
				"interests": self.interests,
				"lookingForwardToLearn": self.lookingForwardToLearn,
				"friends": self.friends,
				"connections": self.connections,
				'profilePicture' : self.profilePicture
			}

	def __init__(self, content):
		"""
		Instantiates a new instance of ProfileObj
		"""
		self.content = content


	def db_create_profile(self):
		"""
		Saves the current user to the database.
		"""
		# required fields
		x = checkFields(self.content, fields=['username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		username = self.content['username'].lower()

		if (self.Profile.objects(username=username).count() > 0):
			return make_response("Username already in use.", 400)

		self.Profile(username=username,
					phone_number='',
					first_name='',
					last_name='',
					name='',
					time_join=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
					description='').save()
		return make_response("", 200)
	
	def db_get_profile(self):
		"""
		Gets the profile given a username
		"""

		x = checkFields(self.content, fields=['username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()

		joinedOn = prof_obj.time_join
		print(type(joinedOn))
		joinedOn=datetime.strptime(joinedOn, "%Y-%m-%d %H:%M:%S")
		todayDate= datetime.now()
		print(todayDate-joinedOn)
		if prof_obj:
			prof_obj_to_dict=prof_obj.to_json()
			if str(todayDate-joinedOn).find(",") != -1:
				prof_obj_to_dict['total_days_joined']=(str(todayDate-joinedOn).split(","))[0]
			return make_response(jsonify(prof_obj_to_dict), 200)
		else:
			return make_response("Username does not exist", 404)


	def db_get_profile_picture(self):
		"""
		Gets the profile given a username
		"""

		x = checkFields(self.content, fields=['username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).only('profilePicture').first()

		if prof_obj:
			return make_response(jsonify(prof_obj), 200)
		else:
			return make_response("Username does not exist", 404)


	def db_update_profile_phone_number(self):
		"""
		Updates the phone number in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['phone_number', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(phone_number=self.content['phone_number'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_update_profile_first_name(self):
		"""
		Updates the first name in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['first_name', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.save()
			prof_obj.update(first_name=self.content['first_name'])
			prof_obj.reload()
			prof_obj.save()
			prof_obj.update(name=self.content['first_name'] + " " + prof_obj.last_name)
			prof_obj.reload()
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_update_profile_last_name(self):
		"""
		Updates the last name in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['last_name', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.save()
			prof_obj.update(last_name=self.content['last_name'])
			prof_obj.reload()
			prof_obj.save()
			prof_obj.update(name=prof_obj.first_name + " " + self.content['last_name'])
			prof_obj.reload()
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_update_profile_description(self):
		"""
		Updates the profile description in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['description', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(description=self.content['description'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_add_profile_language(self):
		"""
		Adds a profile language in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['language', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(add_to_set__languages=self.content['language'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_delete_profile_language(self):
		"""
		deletes a profile language in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['language', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(pull__languages=self.content['language'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_add_profile_completed_course(self):
		"""
		Adds a profile completed_course in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['completed_course', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(add_to_set__completed_courses=self.content['completed_course'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_delete_profile_completed_course(self):
		"""
		deleteds a profile completed_course in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['completed_course', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(pull__completed_courses=self.content['completed_course'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_add_profile_skill(self):
		"""
		Adds a profile skill in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['skill', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(add_to_set__skills=self.content['skill'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_delete_profile_skill(self):
		"""
		deleteds a profile skill in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['skill', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(pull__skills=self.content['skill'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_add_profile_education(self):
		"""
		Adds a profile education in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['education', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(add_to_set__educations=self.content['education'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_delete_profile_education(self):
		"""
		deleteds a profile educations in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['education', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(pull__educations=self.content['education'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_add_profile_interest(self):
		"""
		Adds a profile education in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['interest', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(add_to_set__interests=self.content['interest'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def db_delete_profile_interest(self):
		"""
		deleteds a profile educations in the database for the corresponding username
		"""

		x = checkFields(self.content, fields=['interest', 'username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		prof_obj = self.Profile.objects(username=self.content['username']).first()
		if prof_obj:
			prof_obj.update(pull__interests=self.content['interest'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)
	
	def db_add_education_from_questionaire(self):

		x = checkFields(self.content, fields=['listOfPreviousEducation', 'username', "coreStream", "listOfLookingForwardToLearn", "qualification"])
		if (x):
			return make_response("Missing required field: " + x, 400)
		
		prof_obj = self.Profile.objects(username=self.content['username']).first()

		if prof_obj:
			prof_obj.update(set__qualification=self.content['qualification'])
			prof_obj.update(set__coreStream=self.content['coreStream'])
			prof_obj.update(push_all__educations=self.content['listOfPreviousEducation'])
			prof_obj.update(push_all__lookingForwardToLearn=self.content['listOfLookingForwardToLearn'])
			return make_response("", 200)
		else:
			return make_response("User does not exist.", 404)

	def search_user_profile(self):

		x = checkFields(self.content, fields=['username','whoSearched'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		user_obj = self.Profile.objects(username__ne = self.content['whoSearched']).search_text(self.content['username'])[:10]

		if user_obj:
			return make_response(jsonify(user_obj), 200)
		else:
			return make_response("No user found with that username/name.", 404)

	def add_connection(self):

		x = checkFields(self.content, fields=['username1', 'username2'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		if self.content['username1'] != self.content['username2']:
			user_obj1 = self.Profile.objects(username=self.content['username1']).first()
			user_obj2 = self.Profile.objects(username=self.content['username2']).first()

			if user_obj1 and user_obj2:
				if user_obj2.username not in user_obj1.connections and user_obj1.username not in user_obj2.connections and user_obj1.username not in user_obj2.pending:
					user_obj1.update(push__connections = user_obj2.username)
					user_obj2.update(push__connections = user_obj1.username)
					user_obj2.update(push__pending = user_obj1.username)

				return make_response("Done", 200)
			else:
				return make_response("User Not Found", 200)
	
	def remove_connection(self):

		x = checkFields(self.content, fields=['username1', 'username2'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		user_obj1 = self.Profile.objects(username=self.content['username1']).first()
		user_obj2 = self.Profile.objects(username=self.content['username2']).first()

		if user_obj1 and user_obj2:
			if user_obj2.username in user_obj1.connections and user_obj1.username in user_obj2.connections:
				user_obj1.update(pull__connections = user_obj2.username)
				user_obj2.update(pull__connections = user_obj1.username)
				user_obj1.update(pull__pending = user_obj2.username)
				user_obj2.update(pull__pending = user_obj1.username)

			return make_response("Done", 200)
		else:
			return make_response("User Not Found", 200)
	
	def add_friend(self):

		x = checkFields(self.content, fields=['username1', 'username2'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		if self.content['username1'] != self.content['username2']:
			user_obj1 = self.Profile.objects(username=self.content['username1']).first()
			user_obj2 = self.Profile.objects(username=self.content['username2']).first()

			if user_obj1 and user_obj2:
				if user_obj2.username in user_obj1.connections and user_obj1.username in user_obj2.connections and user_obj2.username not in user_obj1.friends and user_obj1.username not in user_obj2.friends:
					user_obj1.update(pull__connections = user_obj2.username)
					user_obj2.update(pull__connections = user_obj1.username)
					user_obj1.update(pull__pending = user_obj2.username)

					user_obj1.update(push__friends = user_obj2.username)
					user_obj2.update(push__friends = user_obj1.username)

				return make_response("Done", 200)
			else:
				return make_response("User Not Found", 200)

	def remove_friend(self):

		x = checkFields(self.content, fields=['username1', 'username2'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		user_obj1 = self.Profile.objects(username=self.content['username1']).first()
		user_obj2 = self.Profile.objects(username=self.content['username2']).first()

		if user_obj1 and user_obj2:
			if user_obj2.username in user_obj1.friends and user_obj1.username in user_obj2.friends:
				user_obj1.update(pull__friends = user_obj2.username)
				user_obj2.update(pull__friends = user_obj1.username)
			return make_response("Done", 200)
		else:
			return make_response("User Not Found", 200)

	def get_pending(self):

		x = checkFields(self.content, fields=['username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		allTheConnections = self.Profile.objects(username=self.content['username']).only('username', 'pending', 'profilePicture').first()
		
		allThePendings = []
		if allTheConnections:
			for i in allTheConnections.pending:
				pendingUser = self.Profile.objects(username=i).only('username', 'profilePicture').first()
				if pendingUser:
					allThePendings.append(pendingUser)
			return make_response(jsonify(allThePendings), 200)
		else:
			return make_response("Missing required field: " + x, 400)

	def set_profile_picture(self, profilePictureFileName):
		
		user = self.Profile.objects(username = self.content['username']).first()

		if user:
			user.update(set__profilePicture = profilePictureFileName)
			return make_response('Profile picture updated successfully!', 200)
		else:
			return make_response("User does not exist.", 404)
		
	def add_not_interested_topic(self):

		x = checkFields(self.content, fields=['username'])
		if (x):
			return make_response("Missing required field: " + x, 400)

		user = self.Profile.objects(username = self.content['username']).first()

		if self.content['topic'] not in user.notInterestedTopics:
			user.update(push__notInterestedTopics= self.content['topic'])
			return make_response('Topic added successfully!', 200)
		else:
			return make_response('Topic already added', 200)