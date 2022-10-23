import mongoengine as me

from flask import  make_response

class Problems(me.Document):
    problem = me.StringField()

    def store_problem(incomingData):
        problemStored = Problems(problem=incomingData['painPoint']).save()
        return make_response('Done', 200)