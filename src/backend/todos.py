from datetime import datetime
from email.policy import default
from Exceptions.MissingRequiredField import checkFields
from profile import ProfileObj
import mongoengine as me
from flask import Flask, make_response, request, jsonify
profile = ProfileObj.Profile


class Todo(me.EmbeddedDocument):
    title=me.StringField(required="true")
    importance=me.IntField(choices=[1,2])
    inNewsfeed=me.BooleanField(default=False)
    image=me.StringField(default='work.png')


class TodoDocument(me.Document):
    userId=me.ReferenceField(profile, reverse_delete_rule=me.CASCADE)
    username=me.StringField()
    todo=me.EmbeddedDocumentListField(Todo)

    def db_create_todo_profile(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        username = incomingData['username'].lower()
        
        userProfile = profile.objects(username=username).first()

        if userProfile:
            TodoDocument(userId=userProfile, username=username).save()

        return "Done"

    def db_add_todo(incomingData):
        print(incomingData)
        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if incomingData['imageName']==False:
            todoAdded = Todo(title=incomingData['title'], importance=2, inNewsfeed=incomingData['inNewsfeed'])   
        else:
            if incomingData['importance'] == 'Extremely Important':
                todoAdded = Todo(title=incomingData['title'], importance=1, inNewsfeed=incomingData['inNewsfeed'], image=incomingData['imageName'])
            else:
                todoAdded = Todo(title=incomingData['title'], importance=2, inNewsfeed=incomingData['inNewsfeed'], image=incomingData['imageName'])

        todoAccountOfUser = TodoDocument.objects(username=incomingData['username']).first()
        
        if todoAccountOfUser:
            todoAccountOfUser.update(push__todo=todoAdded)

        return make_response("Done", 200)

    def db_get_todo_images(incomingData):
        listOfImage = ['work', 'hard drive', 'computer', 'network', 'server', 'internet', 'system', 'radio', 'lock', 'memory', 'connection', 'document', 'folder', 'cloud', 'chart', 'camera', 'prize', 'web', 'talk', 'data', 'data transfer', 'monitor', 'write', 'secure', 'paint', 'foot', 'phone', 'gift', 'travel', 'perfume', 'visit', 'play', 'chemical', 'milk', 'setting', 'shoe', 'sport', 'outdoor', 'practice', 'groceries', 'luggage', 'flight', 'draw', 'relax', 'peace', 'car', 'card', 'notebook', 'ball', 'mobile', 'industry', 'bag', 'transport', 'doctor', 'bus', 'bill', 'goal', 'money', 'temperature', 'barcode', 'direction', 'umbrella', 'time', 'note', 'study', 'water', 'television', 'identity' , 'shopping', 'party', 'drink', 'pendrive', 'train', 'cab', 'bike', 'bath', 'files', 'sail', 'science']

        try:
            title = incomingData['title'].lower()
            listOfMatchingImages = [ele+'.png' for ele in listOfImage if (ele in title) ]
        except:
            print('No Title inserted')

        return make_response(jsonify(listOfMatchingImages), 200)


    def db_get_all_todo_for_user(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        allTheTodos = TodoDocument.objects(username=incomingData['username']).first()

        return make_response(jsonify(allTheTodos), 200)

    def db_delete_todo(incomingData):

        x = checkFields(incomingData, fields=['username'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        todoAccountOfUser = TodoDocument.objects(username=incomingData['username']).first()

        if todoAccountOfUser:
            todoAccountOfUser.update(__raw__={'$pull': {'todo': {'title': incomingData['title']}}})
        else:
            print('No account found')

        return make_response("Done", 200)
