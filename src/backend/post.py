from email.policy import default
from io import BytesIO
from profile import ProfileObj
from flask.helpers import send_file
import mongoengine as me
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields
from Exceptions.MissingRequiredField import checkFieldsReturnAll
from datetime import datetime
import json
Profile = ProfileObj.Profile


class PostObj():

    """
	This class holds all the CRUD methods for the posts
	"""

    class Posts(me.Document):

        username=me.StringField(required=True)
        subject=me.StringField(required=True, max_length=45, min_length=3)
        topic=me.StringField(required=True, max_length=45, min_length=3)
        subtopic=me.StringField(required=True, max_length=45, min_length=3)
        type=me.StringField(required=True, choices=['News', 'Information' , 'News & Information'])
        fact=me.StringField(required=True)
        background=me.StringField()
        mcq1=me.StringField(required=True)
        mcq1Options=me.ListField(required=True, unique=False)
        #to store date in iso formate datetimefield can be used instead of string field by passing just datetime.now() object instead of converting it into string and passing ans also remember don't pass datetime.now() object directly or by default coz datetime object can't be iterated 
        creation_date_time=me.StringField()
        accuracy=me.FloatField(default = 1.0)
        public=me.BooleanField()
        prerequisite=me.ListField()
        totalLikes= me.IntField(default=0)
        totalLights=me.IntField(default=0)
        totalSaves=me.IntField(default=0)
        previousPost=me.ReferenceField('self')
        nextPost=me.ReferenceField('self')
        thread=me.ListField(me.StringField(), default = [])
        mainPost = me.StringField(required = True)

    def __init__(self, content):
        """
		Instantiates a new instance of PostObj
		"""
        self.content=content
    
    def create_a_post(self, nameOfImage):
        """
		Saves the post to the database.
		"""

        if (self.Posts.objects(fact=self.content['fact']).count() > 0):
            return make_response("Plagiarism Detected", 400)
        
        mcqOptions = self.content['mcq1Opts'].split(',')
        publicState = True if self.content['public'] == 'true' else False

        createPost = self.Posts(username = self.content['username'], subject=self.content['subject'], topic=self.content['topic'], subtopic=self.content['subtopic'], type=self.content['type'], fact=self.content['fact'], mcq1=self.content['mcq1'], mcq1Options= mcqOptions, creation_date_time=datetime.now().strftime("%d %b %Y, %H:%M:%S"), background= nameOfImage, public = publicState, previousPost = '', nextPost = '', mainPost = '').save()
        createPost.update(set__previousPost = createPost)
        createPost.update(set__nextPost = createPost)
        idOfCreatePost = str(createPost.id)
        createPost.update(set__mainPost = idOfCreatePost)
        createPost.update(push__thread = idOfCreatePost)


        objectOfTherecordOfTheUser = Profile.objects(username=self.content['username']).first()

        allSubjectsOfUser = objectOfTherecordOfTheUser.educations

        if self.content['subject'] not in allSubjectsOfUser:
            Profile.objects(username=self.content['username']).update_one(push__educations = self.content['subject'])

        return make_response(jsonify(createPost), 200)
    
    def delete_a_post(self):
        x = checkFields(self.content, fields=['username', 'id'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        postToBeDeleted = self.Posts.objects(me.Q(username = self.content['username']) & me.Q(id=self.content['id'])).first()
        mainPost = self.Posts.objects(id = postToBeDeleted.mainPost).first()

        idOfThePreviousPostOfCurrentPost =  postToBeDeleted.previousPost.id
        idOfTheNextPostOfCurrentPost = postToBeDeleted.nextPost.id
        previousPostOfTheCurrentPost = self.Posts.objects(pk = idOfThePreviousPostOfCurrentPost).first()
        nextPostOfTheCurrentPost = self.Posts.objects(pk = idOfTheNextPostOfCurrentPost).first()

        if postToBeDeleted:
            background = postToBeDeleted.background
            postToBeDeleted.delete()
            allTheInteractions = UserInteractions.objects(postId=self.content['id']).all()
            allTheInteractions.delete()

            listOfAllThePostIds = mainPost.thread
            idOfThePostToBeDeleted = str(postToBeDeleted.id)
            listOfAllThePostIds.remove(idOfThePostToBeDeleted)
            mainPost.update(set__thread = listOfAllThePostIds)
            listOfAllThePostIds =  list(listOfAllThePostIds)

            if str(postToBeDeleted.id)==postToBeDeleted.mainPost and len(listOfAllThePostIds) > 0:
                newMainPost = self.Posts.objects(id = listOfAllThePostIds[0]).first()
                newMainPost.update(set__thread = listOfAllThePostIds)
                
                for x in listOfAllThePostIds:
                    post = self.Posts.objects(id = x).first()
                    post.update(set__mainPost = listOfAllThePostIds[0])

            #Suppose their are 3 post in a thread named a b c
            #when post b is deleted so to change the nextPost field of post a and previousPost field of post b
            if idOfThePreviousPostOfCurrentPost != postToBeDeleted.id and idOfTheNextPostOfCurrentPost != postToBeDeleted.id:
                nextPostOfTheCurrentPost.update(set__previousPost = previousPostOfTheCurrentPost)
                previousPostOfTheCurrentPost.update(set__nextPost = nextPostOfTheCurrentPost)
            #when post a is deleted so to change the previousPost field of post b (referencing itself)
            elif idOfTheNextPostOfCurrentPost != postToBeDeleted.id:
                nextPostOfTheCurrentPost.update(set__previousPost = nextPostOfTheCurrentPost)
            #when post c is deleted so to change the nextPost field of post b (referencing itself)
            elif idOfThePreviousPostOfCurrentPost != postToBeDeleted.id:
                previousPostOfTheCurrentPost.update(set__nextPost = previousPostOfTheCurrentPost)


            if postToBeDeleted.id == idOfThePreviousPostOfCurrentPost == idOfTheNextPostOfCurrentPost:
                return background
            else:
                if (postToBeDeleted.background != previousPostOfTheCurrentPost.background != nextPostOfTheCurrentPost.background):
                    return background
                else:
                    return False
        else:
            return make_response('Post Not Found', 404)

    def get_all_post_of_user(self):

        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        postOfUser = self.Posts.objects(username = self.content['username']).only('username', 'background', 'subtopic', 'fact').order_by('-$natural')[:30]

        return make_response(jsonify(postOfUser), 200)

    def get_public_post_of_user(self):

        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        postOfUser = self.Posts.objects(me.Q(username = self.content['username']) & me.Q(public = True)).only('username', 'background', 'subtopic', 'fact').order_by('-$natural')[:30]

        return make_response(jsonify(postOfUser), 200)

    def add_next_post(self, nameOfImage):
        x = checkFields(self.content, fields=['username', 'currentPostId', 'listOfPosts'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        publicState = True if self.content['public'] == 'true' else False
        
        currentPost = self.Posts.objects(me.Q(username = self.content['username']) & me.Q(id = self.content['currentPostId'])).first()
        idOfTheCurrentPost = currentPost.id
        idOfTheNextPostOfCurrentPost =  currentPost.nextPost.id
        nextPostOfCurrentPost = False
        counter = 0

        if currentPost:
            incomingData = json.loads(self.content['listOfPosts'])
            for post in incomingData:

                if self.content['topic'] == currentPost.topic:

                    if (self.Posts.objects(fact = post['fact']).count() > 0):
                        return make_response("Plagiarism Detected", 400)

                    mainPost = self.Posts.objects(id = currentPost.mainPost).first()
                    idOfTheMainPost = str(mainPost.id)
                    listOfAllThePostIds = list(mainPost.thread)
                    indexToPlaceNextPostInTheList = listOfAllThePostIds.index(str(idOfTheCurrentPost)) + 1

                    if idOfTheNextPostOfCurrentPost != idOfTheCurrentPost:
                        nextPostOfCurrentPost = self.Posts.objects(id = currentPost.nextPost.id).first() 
                        nextPost = self.Posts(username = self.content['username'], subject=self.content['subject'], topic=self.content['topic'], subtopic=self.content['subtopic'], type=self.content['type'], fact=post['fact'], mcq1=post['mcq'], mcq1Options= post['mcq1Opts'], creation_date_time=datetime.now().strftime("%d %b %Y, %H:%M:%S"), background= nameOfImage, public = publicState, previousPost = currentPost, nextPost = nextPostOfCurrentPost, mainPost = idOfTheMainPost).save()
                        currentPost.update(set__nextPost = nextPost)
                        currentPost = nextPost
                        idOfTheCurrentPost = currentPost.id
                        idOfTheNextPostOfCurrentPost = nextPost.id
                    else:
                        nextPost = self.Posts(username = self.content['username'], subject=self.content['subject'], topic=self.content['topic'], subtopic=self.content['subtopic'], type=self.content['type'], fact=post['fact'], mcq1=post['mcq'], mcq1Options= post['mcq1Opts'], creation_date_time=datetime.now().strftime("%d %b %Y, %H:%M:%S"), background= nameOfImage, public = publicState, previousPost = currentPost, nextPost = '', mainPost = idOfTheMainPost).save()
                        nextPost.update(set__nextPost = nextPost)
                        currentPost.update(set__nextPost = nextPost)
                        currentPost = nextPost
                        idOfTheCurrentPost = currentPost.id
                        idOfTheNextPostOfCurrentPost = nextPost.id
                        
                    if incomingData.index(post) == (len(incomingData) -1) and nextPostOfCurrentPost:
                        nextPost.update(set__nextPost = nextPostOfCurrentPost)
                        nextPostOfCurrentPost.update(set__previousPost = nextPost)

                    listOfAllThePostIds.insert(indexToPlaceNextPostInTheList, str(idOfTheNextPostOfCurrentPost))
                    mainPost.update(set__thread = listOfAllThePostIds)

                    counter += 1

                    if counter == 1:
                        redirectPostId = str(nextPost.id)
                        print(redirectPostId)

                else:
                    return make_response('Post is either of different topic, private or deleted.', 400)
            
            return make_response(jsonify(redirectPostId), 200)

        else:
            return make_response('Post Not Found', 404)


    def search_posts_of_topic(self):

        x = checkFields(self.content, fields=['topic'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        postsOfParticualarTopicSubtopic = self.Posts.objects(public = True).search_text(self.content['topic']).only('username', 'background', 'subtopic', 'fact').order_by('-$natural')[:12]
        
        return make_response(jsonify(postsOfParticualarTopicSubtopic), 200)

    '''
    def display_posts_on_newsfeed(self):

        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        objectOfTherecordOfTheUser= Profile.objects(username=self.content['username']).first()

        allSubjectsOfUser= objectOfTherecordOfTheUser.educations
        
        if len(allSubjectsOfUser) <= 0:
            return make_response("Add a Subject First", 404)


        raw = list(self.Posts.objects(subject=any(allSubjectsOfUser)).all())

        return make_response(jsonify(raw), 200)
        
    '''        

    
    def display_posts_on_newsfeed(self):

        x = checkFields(self.content, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        


        objectOfTherecordOfTheUser= Profile.objects(username=self.content['username']).first()

        allSubjectsOfUser= objectOfTherecordOfTheUser.educations
        
        if len(allSubjectsOfUser) <= 0:
            return make_response("Add a Subject First", 404)

        postData = []
        
        '''
        var1=UserInteractions.objects(username=self.content['username']).only('interaction').to_json()
        var2=json.loads(var1)
        var3= var2[0]['interaction']
        if len(var3)!=0:
            listOfPostIds=[x['postId'] for x in var3]
            print(listOfPostIds, len(listOfPostIds))

        print(var3, sep="\n")'''
        
        for i in range(len(allSubjectsOfUser)):
            for post in self.Posts.objects(subject=allSubjectsOfUser[i]):
                #appending post in a list to send to client
                postData.append(post)
                #storing time in string, at which the user saw the post inside a timeList listfield
                timeRytNow=str(datetime.now().strftime("%d %b %Y, %H:%M:%S"))
                
                #storing the reference inside a user_interactions collection inside a interaction list
                postToString=post.to_json()
                postStringToDict=json.loads(postToString)
                idOfPost=postStringToDict['_id']['$oid']
                print(idOfPost)
                
                if UserInteractions.objects(me.Q(username=self.content['username']) & me.Q(postId=post)):
                    UserInteractions.objects(me.Q(username=self.content['username']) & me.Q(postId=post)).update_one(inc__timesViewed=1)
                    UserInteractions.objects(me.Q(username=self.content['username']) & me.Q(postId=post)).update_one(dec__points=1)
                    UserInteractions.objects(me.Q(username=self.content['username']) & me.Q(postId=post)).update_one(push__timeList=timeRytNow)
                else:
                    UserInteractions(userReference=objectOfTherecordOfTheUser,
                    username=self.content['username'],
                    postId=post,
                    timeList=[timeRytNow]
                    ).save()
           
        postData.reverse()
        return make_response(jsonify(postData), 200)

        #postData = self.Posts.objects(username=self.content['username']).exclude('background')first()
        #postImage = self.Posts.objects(username=self.content['username']).only('background').first()

        #bgImage=postImage.background.read()
        
        '''
        bgImage=postImage.background.read()
        filename = postImage.background.filename
        content_type = postImage.background.content_type
        '''
        '''
        imageBinary=read_image(postImage)
        responseImage=make_response(imageBinary)
        response.headers.set('Content-Type', 'image/jpg')
        response.headers.set('Content-Disposition', 'attachment', filename='%s.jpg' %imageBinary)
        return response
        '''      

        '''
        responseImage=make_response(send_file(bgImage, download_name=filename, mimetype=content_type))
        responseImage.headers['Content-Transfer-Encoding']='base64'
        return responseImage
       '''
        #return make_response(jsonify(postData.to_json()), 200)
        #return send_file(bgImage, download_name=filename, mimetype=content_type), 200




    
class UserInteractions(me.Document):
    userReference= me.ReferenceField(Profile, reverse_delete_rule=me.CASCADE)
    username=me.StringField()
    postId=me.ReferenceField(PostObj.Posts)
    liked=me.BooleanField(default=False)
    lighten=me.BooleanField(default=False)
    saved=me.BooleanField(default=False)
    timesViewed=me.IntField(default=1)
    points=me.IntField(default=10)
    #to store date in iso formate datetimefield can be used instead of string field
    timeList=me.ListField(me.StringField())

    def store_interactions(self):

        x = checkFields(self, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        if len(self['liked'])>0:
            for i in self['liked']:
                particularPost= UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=i)).first()
                if particularPost.liked == False:
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=i)).update(set__liked=True)
                    PostObj.Posts.objects(id=i).update(inc__totalLikes=1)

        if len(self['lighten'])>0:
            for i in self['lighten']:
                particularPost= UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=i)).first()
                if particularPost.lighten == False:
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=i)).update(set__lighten=True)
                    PostObj.Posts.objects(id=i).update(inc__totalLights=1)

        if len(self['savedPosts'])>0:
            for i in self['savedPosts']:
                particularPost= UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=i)).first()
                if particularPost.saved == False:
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=i)).update(set__saved=True)
                    PostObj.Posts.objects(id=i).update(inc__totalSaves=1)

        
        return make_response("", 200)

    def designing_newsfeed(self):

        x = checkFields(self, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        objectOfTherecordOfTheUser= Profile.objects(username=self['username']).first()

        allSubjectsOfUser= objectOfTherecordOfTheUser.educations
        
        if len(allSubjectsOfUser) <= 0:
            return make_response("Add a Subject First", 404)

        #Empty list that will curate most appropirate 10 posts to be send to the client
        postData=[]

        #storing time in string, at which the user saw the post inside a timeList listfield
        timeRytNow=str(datetime.now().strftime("%d %b %Y, %H:%M:%S"))
        
        # make a change here count() < 50:
        if UserInteractions.objects(username=self['username']).count()<10:

            for i in range(len(allSubjectsOfUser)):
                if len(postData)==10:
                    break
                for post in PostObj.Posts.objects(subject=allSubjectsOfUser[i]):
                    if UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post)):
                        pass
                    elif (post.public == False) and (post.username != self['username']):
                        pass
                    elif len(postData)==10:
                        break
                    else:
                        #making a document in user_interactions collection of new post for a particular user
                        user_interaction=UserInteractions(userReference=objectOfTherecordOfTheUser,
                        username=self['username'],
                        postId=post,
                        timeList=[timeRytNow]
                        ).save()

                        if post.mainPost != str(post.id):
                            mainPost = PostObj.Posts.objects(id = post.mainPost).only('thread').first()
                            listOfAllThePostIds = mainPost.thread
                        else:
                            listOfAllThePostIds = post.thread


                        #Combining the post data with the user interaction 
                        addThePostStr=post.to_json()
                        addTheInteractionStr=user_interaction.to_json()
                        combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                        objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                        objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                        #join user profileImage with the post 
                        profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()
                        objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                        objectOfTheCombinedString['name'] = profile.name

                        #appending the combined object build from two different strings to the postData List to send to client
                        postData.append(objectOfTheCombinedString)
            
            postData.reverse()
            return make_response(jsonify(postData), 200)

        else:

            #sending MCQ's for chechking retention
            if UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__lte=8)).order_by('timesViewed')[:3]:
                questionPosts=UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__lte=8)).order_by('timesViewed')[:3]
                
                #updating user_interactionsData
                for post in questionPosts:
                    yo=post.postId.id
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post.postId)).update_one(inc__timesViewed=1)
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post.postId)).update_one(dec__points=1)
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post.postId)).update_one(push__timeList=timeRytNow)

                    #searching the post the user ever interacted with using the 24 character hexadecimal oid/objectId of the primary index key
                    addThePost=PostObj.Posts.objects(id=yo).first()

                    if addThePost.mainPost != str(addThePost.id):
                        mainPost = PostObj.Posts.objects(id = addThePost.mainPost).only('thread').first()
                        listOfAllThePostIds = mainPost.thread
                    else:
                        listOfAllThePostIds = addThePost.thread

                    #Combining the post data with the user interaction 
                    addThePostStr=addThePost.to_json()
                    addTheInteractionStr=post.to_json()
                    combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                    objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                    objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                    #join user profileImage with the post 
                    profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()
                    objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                    objectOfTheCombinedString['name'] = profile.name


                    #appending the combined object build from two different strings to the postData List to send to client
                    postData.append(objectOfTheCombinedString)



            #sending old posts to ensuring retention
            if UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__gte=9) & me.Q(points__lte=10)).order_by('timesViewed')[:4]:
                oldPostsToRevise=UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__gte=9) & me.Q(points__lte=10)).order_by('timesViewed')[:4]
                
                #updating user_interactionsData
                for post in oldPostsToRevise:
                    yo=post.postId.id
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post.postId)).update_one(inc__timesViewed=1)
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post.postId)).update_one(dec__points=1)
                    UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post.postId)).update_one(push__timeList=timeRytNow)
                    
                    #searching the post the user ever interacted with using the 24 character hexadecimal oid/objectId of the primary index key
                    addThePost=PostObj.Posts.objects(id=yo).first()

                    if addThePost.mainPost != str(addThePost.id):
                        mainPost = PostObj.Posts.objects(id = addThePost.mainPost).only('thread').first()
                        listOfAllThePostIds = mainPost.thread
                    else:
                        listOfAllThePostIds = addThePost.thread

                    #Combining the post data with the user interaction 
                    addThePostStr=addThePost.to_json()
                    addTheInteractionStr=post.to_json()
                    combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                    objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                    objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                    #join user profileImage with the post 
                    profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()
                    objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                    objectOfTheCombinedString['name'] = profile.name


                    #appending the combined object build from two different strings to the postData List to send to client
                    postData.append(objectOfTheCombinedString)



            #sending new post's to maintain the uncertainity            
            for i in range(len(allSubjectsOfUser)):
                if len(postData)==12:
                    break
                for post in PostObj.Posts.objects(subject=allSubjectsOfUser[i]):
                    if UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post)):
                        pass
                    elif (post.public == False) and (post.username != self['username']):
                        pass
                    elif len(postData)==12:
                        break
                    else:
                        #making a document in user_interactions collection of new post for a particular user
                        user_interaction=UserInteractions(userReference=objectOfTherecordOfTheUser,
                        username=self['username'],
                        postId=post,
                        timeList=[timeRytNow]
                        ).save()

                        if post.mainPost != str(post.id):
                            mainPost = PostObj.Posts.objects(id = post.mainPost).only('thread').first()
                            listOfAllThePostIds = mainPost.thread
                        else:
                            listOfAllThePostIds = post.thread

                        #Combining the post data with the user interaction 
                        addThePostStr=post.to_json()
                        addTheInteractionStr=user_interaction.to_json()
                        combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                        objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                        objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                        #join user profileImage with the post 
                        profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()
                        objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                        objectOfTheCombinedString['name'] = profile.name

                        #appending the combined object build from two different strings to the postData List to send to client
                        postData.append(objectOfTheCombinedString)


            postData.reverse()
            return make_response(jsonify(postData), 200)

    def mcq_response(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        if 'idAdd' in incomingData.keys():
            UserInteractions.objects(me.Q(username=incomingData['username']) & me.Q(postId=incomingData['idAdd'])).update_one(inc__points=3)
        else:
            UserInteractions.objects(me.Q(username=incomingData['username']) & me.Q(postId=incomingData['idSub'])).update_one(dec__points=1)
        
        return make_response("", 200)

    def designing_newsfeed_for_load_more_btn(self):

        x = checkFields(self, fields=['username', 'allTheCurrentPosts'])
        if (x):
            return make_response("Missing required field: " + x, 400)


        objectOfTherecordOfTheUser= Profile.objects(username=self['username']).first()

        allSubjectsOfUser= objectOfTherecordOfTheUser.educations
        
        if len(allSubjectsOfUser) <= 0:
            return make_response("Add a Subject First", 404)

        #Empty list that will curate most appropirate 10 posts to be send to the client
        postData=[]

        #storing time in string, at which the user saw the post inside a timeList listfield
        timeRytNow=str(datetime.now().strftime("%d %b %Y, %H:%M:%S"))
        
        # make a change here count() < 50:
        if UserInteractions.objects(username=self['username']).count()<10:

            for i in range(len(allSubjectsOfUser)):
                if len(postData)==10:
                    break
                for post in PostObj.Posts.objects(subject=allSubjectsOfUser[i]):
                    if UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post)):
                        pass
                    elif (post.public == False) and (post.username != self['username']):
                        pass
                    elif len(postData)==10:
                        break
                    else:
                        #making a document in user_interactions collection of new post for a particular user
                        user_interaction=UserInteractions(userReference=objectOfTherecordOfTheUser,
                        username=self['username'],
                        postId=post,
                        timeList=[timeRytNow]
                        ).save()

                        if post.mainPost != str(post.id):
                            mainPost = PostObj.Posts.objects(id = post.mainPost).only('thread').first()
                            listOfAllThePostIds = mainPost.thread
                        else:
                            listOfAllThePostIds = post.thread

                        #Combining the post data with the user interaction 
                        addThePostStr=post.to_json()
                        addTheInteractionStr=user_interaction.to_json()
                        combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                        objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                        objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                        #join user profileImage with the post 
                        profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()
                        objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                        objectOfTheCombinedString['name'] = profile.name

                        #appending the combined object build from two different strings to the postData List to send to client
                        postData.append(objectOfTheCombinedString)
            
            postData.reverse()
            return make_response(jsonify(postData), 200)

        else:


#I think For loop lagana pdega to include posts which arent currently on the news feed
            

            #sending MCQ's for chechking retention
            if UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__lte=8)):
                counterMCQ=0
                for mcqPost in UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__lte=8)).order_by('timesViewed'):
                    if counterMCQ == 3:
                        break
                    if mcqPost.postId.id not in self['allTheCurrentPosts']:
                        counterMCQ+=1
                        #updating user_interactionsData
                        yo=mcqPost.postId.id
                        UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=mcqPost.postId)).update_one(inc__timesViewed=1)
                        UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=mcqPost.postId)).update_one(dec__points=1)
                        UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=mcqPost.postId)).update_one(push__timeList=timeRytNow)

                        #searching the post the user ever interacted with using the 24 character hexadecimal oid/objectId of the primary index key
                        addThePost=PostObj.Posts.objects(id=yo).first()

                        if addThePost.mainPost != str(addThePost.id):
                            mainPost = PostObj.Posts.objects(id = addThePost.mainPost).only('thread').first()
                            listOfAllThePostIds = mainPost.thread
                        else:
                            listOfAllThePostIds = addThePost.thread

                        #Combining the post data with the user interaction 
                        addThePostStr=addThePost.to_json()
                        addTheInteractionStr=mcqPost.to_json()
                        combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                        objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                        objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                        #join user profileImage with the post 
                        profile = Profile.objects(username = addThePost.username).only("profilePicture", 'name').first()
                        objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                        objectOfTheCombinedString['name'] = profile.name


                        #appending the combined object build from two different strings to the postData List to send to client
                        postData.append(objectOfTheCombinedString)



            #sending old posts to ensuring retention
            if UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__gte=9) & me.Q(points__lte=10)):
                counterOld=0
                for mcqPost in UserInteractions.objects(me.Q(username=self['username']) & me.Q(points__gte=9) & me.Q(points__lte=10)).order_by('timesViewed'):
                    if counterOld==4:
                        break
                    if mcqPost.postId.id not in self['allTheCurrentPosts']:
                        counterOld+=1
                        #updating user_interactionsData
                        yo=mcqPost.postId.id
                        UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=mcqPost.postId)).update_one(inc__timesViewed=1)
                        UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=mcqPost.postId)).update_one(dec__points=1)
                        UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=mcqPost.postId)).update_one(push__timeList=timeRytNow)

                        #searching the post the user ever interacted with using the 24 character hexadecimal oid/objectId of the primary index key
                        addThePost=PostObj.Posts.objects(id=yo).first()

                        if addThePost.mainPost != str(addThePost.id):
                            mainPost = PostObj.Posts.objects(id = addThePost.mainPost).only('thread').first()
                            listOfAllThePostIds = mainPost.thread
                        else:
                            listOfAllThePostIds = addThePost.thread

                        #Combining the post data with the user interaction 
                        addThePostStr=addThePost.to_json()
                        addTheInteractionStr=mcqPost.to_json()
                        combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                        objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                        objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                        #join user profileImage with the post 
                        profile = Profile.objects(username = addThePost.username).only("profilePicture", 'name').first()
                        objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                        objectOfTheCombinedString['name'] = profile.name


                        #appending the combined object build from two different strings to the postData List to send to client
                        postData.append(objectOfTheCombinedString)



            #sending new post's to maintain the uncertainity            
            for i in range(len(allSubjectsOfUser)):
                if len(postData)==12:
                    break
                for post in PostObj.Posts.objects(subject=allSubjectsOfUser[i]):
                    if UserInteractions.objects(me.Q(username=self['username']) & me.Q(postId=post)):
                        pass
                    elif (post.public == False) and (post.username != self['username']):
                        pass
                    elif len(postData)==12:
                        break
                    else:
                        #making a document in user_interactions collection of new post for a particular user
                        user_interaction=UserInteractions(userReference=objectOfTherecordOfTheUser,
                        username=self['username'],
                        postId=post,
                        timeList=[timeRytNow]
                        ).save()

                        if post.mainPost != str(post.id):
                            mainPost = PostObj.Posts.objects(id = post.mainPost).only('thread').first()
                            listOfAllThePostIds = mainPost.thread
                        else:
                            listOfAllThePostIds = post.thread

                        #Combining the post data with the user interaction 
                        addThePostStr=post.to_json()
                        addTheInteractionStr=user_interaction.to_json()
                        combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                        objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                        objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

                        #join user profileImage with the post 
                        profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()
                        objectOfTheCombinedString['profilePicture'] = profile.profilePicture
                        objectOfTheCombinedString['name'] = profile.name


                        #appending the combined object build from two different strings to the postData List to send to client
                        postData.append(objectOfTheCombinedString)


            postData.reverse()
            return make_response(jsonify(postData), 200)

    def get_saved_post_of_user(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        postOfUser = UserInteractions.objects(me.Q(username = incomingData['username']) & me.Q(saved = True)).only('postId').order_by('-$natural')[:30]

        postData=[]

        for post in postOfUser:
            yo=post.postId.id
                    
            #searching the post the user ever interacted with using the 24 character hexadecimal oid/objectId of the primary index key
            addThePost = PostObj.Posts.objects(id=yo).only( 'username', 'background', 'subtopic', 'fact').first()

            #Combining the post data with the user interaction 
            addThePostStr=addThePost.to_json()
            addTheInteractionStr=post.to_json()
            combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
            objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)

            #appending the combined object build from two different strings to the postData List to send to client
            postData.append(objectOfTheCombinedString)

        return make_response(jsonify(postData), 200)
    
    def get_particular_post(incomingData):

        x = checkFields(incomingData, fields=['username', 'id'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        post = PostObj.Posts.objects(id=incomingData['id']).first()
        profile = Profile.objects(username = post.username).only("profilePicture", 'name').first()

        if post:

            userInteraction = UserInteractions.objects(me.Q(username = incomingData['username']) & me.Q(postId = incomingData['id'])).first()
            
            if post.mainPost != str(post.id):
                mainPost = PostObj.Posts.objects(id = post.mainPost).only('thread').first()
                listOfAllThePostIds = mainPost.thread
            else:
                listOfAllThePostIds = post.thread

            if userInteraction:

                addThePostStr=post.to_json()
                addTheInteractionStr=userInteraction.to_json()
                combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds

            
            else:
                timeRytNow=str(datetime.now().strftime("%d %b %Y, %H:%M:%S"))
                objectOfTherecordOfTheUser= Profile.objects(username=incomingData['username']).first()
                user_interaction=UserInteractions(userReference=objectOfTherecordOfTheUser, username=incomingData['username'], postId=post, timeList=[timeRytNow]).save()

                #Combining the post data with the user interaction 
                addThePostStr=post.to_json()
                addTheInteractionStr=user_interaction.to_json()
                combinedPost_InteractionDocument = addTheInteractionStr[:-1] + ", " + addThePostStr[1:]
                objectOfTheCombinedString=json.loads(combinedPost_InteractionDocument)
                objectOfTheCombinedString['listOfAllThePostIds'] = listOfAllThePostIds
            
            objectOfTheCombinedString['profilePicture'] = profile.profilePicture
            objectOfTheCombinedString['name'] = profile.name
            
            return make_response(jsonify(objectOfTheCombinedString), 200)
            
        else:

            return make_response('post not found', 400)
    
    def show_often(incomingData):

        x = checkFields(incomingData, fields=['username', 'id'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        post = PostObj.Posts.objects(id=incomingData['id']).first()

        if post:
            userInteraction = UserInteractions.objects(me.Q(username = incomingData['username']) & me.Q(postId = incomingData['id'])).first()
            if userInteraction:
                userInteraction.update(set__points= '10', set__timesViewed = '1')
                return make_response('Done', 200)
            
        else:
            return make_response('post not found', 400)