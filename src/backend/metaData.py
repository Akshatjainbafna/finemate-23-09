import mongoengine as me
from flask import Flask, make_response, request, jsonify
from Exceptions.MissingRequiredField import checkFields


class SubjectsTopicsSubtopicsTags(me.Document):
    stream=me.StringField(required=True)
    subject=me.StringField()
    topic=me.StringField()
    subtopic=me.StringField()
    meta={'indexes':
    [{'fields': ['$stream','$subject', '$topic'], 
    'default_language': 'english',
    'weights': {'stream': 2, 'subject': 4} 
    }   
    ]
    }

    def create_stream_subject_topic(incomingData):

        x = checkFields(incomingData, fields=['stream', 'subject', 'topic'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        if (SubjectsTopicsSubtopicsTags.objects(stream=incomingData['stream'], subject=incomingData['subject'], topic=incomingData['topic']).count() > 0):
            return make_response("Already Added!", 400)
        else:
            SubjectsTopicsSubtopicsTags(stream=incomingData['stream'], subject=incomingData['subject'], topic=incomingData['topic']).save()
            return make_response("Done.", 200)


    def get_all_subjects_of_stream(incomingData):

        x = checkFields(incomingData, fields=['stream'])
        if (x):
            return make_response("Missing required field: " + x, 400)
        
        allTheSubjects = []

        for i in SubjectsTopicsSubtopicsTags.objects(stream=incomingData['stream']):
            if i.subject not in allTheSubjects:
                allTheSubjects.append(i.subject)

        return make_response(jsonify(allTheSubjects), 200)


    def search_a_subject(incomingData):

        x = checkFields(incomingData, fields=['subject'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        allTheSubjects = []

        for i in SubjectsTopicsSubtopicsTags.objects.search_text(incomingData['subject']):
            if i.subject not in allTheSubjects:
                allTheSubjects.append(i.subject)
        
        return make_response(jsonify(allTheSubjects), 200)


    def search_a_topic(incomingData):

        x = checkFields(incomingData, fields=['topic'])
        if (x):
            return make_response("Missing required field: " + x, 400)

        allTheTopics = []

        for i in SubjectsTopicsSubtopicsTags.objects.search_text(incomingData['topic']):
            if i.topic not in allTheTopics:
                allTheTopics.append(i.topic)
        
        return make_response(jsonify(allTheTopics), 200)     