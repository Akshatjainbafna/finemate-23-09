import os
import math
import random
import smtplib
import time
from werkzeug.utils import secure_filename
import json
from flask import Flask, make_response, request, jsonify
from flask_cors import CORS
from flask_mongoengine import MongoEngine
import boto3
from botocore.exceptions import NoCredentialsError
from botocore.client import Config as ConfigAWS
from email_validator import validate_email, EmailNotValidError
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
import logging
from PIL import Image

from metaData import SubjectsTopicsSubtopicsTags
from problems import Problems
from todos import TodoDocument
from user import UserObj 
from profile import ProfileObj
from calender import CalenderObj
from course import CourseObj
from dashevent import dasheventObj
from message import MessageObj
from board import Board
from post import PostObj, UserInteractions
from notifications import Notification
import user
import calender
import course
import dashevent
import profile
import message

mode = 'development'

app = Flask(__name__) 
allowed_extensions = ['.png', '.jpeg', '.webp', '.gif', '.jpg', '.svg' ]
CORS(app)
# set the database name and the database user's name and password or you can assign it separatley host: localhost, db:uimpactify,port: 27017 or assign app.config("MONGODB_HOST") with a DB_URI as a string instead of object

if mode=="production":
    DB_URI = "mongodb://43.204.62.82:27017/finemate"
    app.config["MONGODB_SETTINGS"] = {"host":"mongodb://43.204.62.82:27017/finemate"}
else:
    DB_URI = "mongodb://localhost:27017/uimpactify"
    app.config["MONGODB_SETTINGS"] = {"host":"mongodb://localhost:27017/uimpactify"}

db = MongoEngine()
db.init_app(app)


aws_access_key_id = 'AKIAX34YHC3NFZEBEY5Y'
aws_access_secret_key = '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'
aws_bucket_name = 'finemate.media'


session = boto3.Session(
    aws_access_key_id = aws_access_key_id,
    aws_secret_access_key = aws_access_secret_key,
)

s3 = session.resource('s3')

@app.errorhandler(413)
def too_large(e):    
    return "File is too large", 413 



@app.route('/api/add_pain_point_to_database', methods=['POST'])
def db_store_problem():
    return Problems.store_problem(request.json)

#create Post
@app.route('/api/db_create_post', methods=['POST'])
def db_create_post():
    try:
        if request.files['background']:
            image=request.files['background']
            backgroundImage = Image.open(image)
            backgroundImage.thumbnail((1920, 1080))

            filenameOfImage=secure_filename(image.filename)

            filename_without_extension = os.path.splitext(filenameOfImage)[0]
            extension = os.path.splitext(filenameOfImage)[1]

            # Check if the file is of proper extension
            if len(extension) > 0 and extension.lower() not in allowed_extensions:
                return make_response("Invalid file type", 400)

            timestamp = time.strftime('_%Y-%m-%d-%H-%M-%S')
            filenameOfImage = filename_without_extension[:10] + timestamp + extension
            complete_file_path = '../react/src/assets/postBackgroundImages/'
            folderName = 'postBackgroundImages/'
            
            backgroundImage.save(f"{complete_file_path}{filenameOfImage}")

            if mode == 'production':
                try:
                    s3.Bucket(aws_bucket_name).upload_file(complete_file_path + filenameOfImage, folderName + filenameOfImage)
                except FileNotFoundError:
                    print("Error: The file was not found")
                    return ""
                except NoCredentialsError:
                    print("Error: Credentials not available")
                    return ""
                os.remove(complete_file_path+filenameOfImage)
            return PostObj(request.form).create_a_post(filenameOfImage)
        else:
            return make_response("Insert a image", 400)
    except:
        return make_response("Internal Server Error, something went wrong", 500)

#create Post
@app.route('/api/db_delete_post', methods=['POST'])
def db_delete_post():
    backgroundImage = PostObj(request.json).delete_a_post()
    if mode=='production' and backgroundImage:
        s3.Bucket(aws_bucket_name).delete_objects(
            Delete = {
                'Objects' : [  
                    { 
                        'Key' : 'postBackgroundImages/' + backgroundImage
                    } 
                ] 
            }  
        )
    elif backgroundImage:
        os.remove("../react/src/assets/postBackgroundImages/" + backgroundImage)
    return make_response('Post Deleted!', 200)
    
# all the posts of a particular user
@app.route('/api/db_get_all_post_of_user', methods = ['POST'])
def db_get_all_post_of_user():
    return PostObj(request.json).get_all_post_of_user()

# all the public posts of a particular user
@app.route('/api/db_get_public_post_of_user', methods = ['POST'])
def db_get_public_post_of_user():
    return PostObj(request.json).get_public_post_of_user()

# add next post
@app.route('/api/db_add_next_post', methods = ['POST'])
def db_add_next_post():
    formData = request.form
    try:
        if request.files['background'] and not formData['previousBackground']:
            image = request.files['background']
            backgroundImage = Image.open(image)
            backgroundImage.thumbnail((1920, 1080))

            filenameOfImage=secure_filename(image.filename)

            filename_without_extension = os.path.splitext(filenameOfImage)[0]
            extension = os.path.splitext(filenameOfImage)[1]

            # Check if the file is of proper extension
            if len(extension) > 0 and extension.lower() not in allowed_extensions:
                return make_response("Invalid file type", 400)

            timestamp = time.strftime('_%Y-%m-%d-%H-%M-%S')
            filenameOfImage = filename_without_extension[:10] + timestamp + extension
            complete_file_path = '../react/src/assets/postBackgroundImages/'
            folderName = 'postBackgroundImages/'
            
            backgroundImage.save(f"{complete_file_path}{filenameOfImage}")

            if mode == 'production':
                try:
                    s3.Bucket(aws_bucket_name).upload_file(complete_file_path + filenameOfImage, folderName + filenameOfImage)
                except FileNotFoundError:
                    print("Error: The file was not found")
                    return ""
                except NoCredentialsError:
                    print("Error: Credentials not available")
                    return ""
                os.remove(complete_file_path+filenameOfImage)
            return PostObj(request.form).add_next_post(filenameOfImage)
        else:
            nameOfImage = formData['previousBackground']
            return PostObj(request.form).add_next_post(nameOfImage)
    except:
        return make_response("Internal Server Error, something went wrong", 500)

# all the posts of a particular subjext, topic, subtopic
@app.route('/api/db_search_posts_of_topic', methods = ['POST'])
def db_search_posts_of_topic():
    return PostObj(request.json).search_posts_of_topic()

# all the posts of a particular subjext, topic, subtopic
@app.route('/api/add_not_interested_topic', methods = ['POST'])
def db_add_not_interested_topic():
    return ProfileObj(request.json).add_not_interested_topic()

# all the posts of a particular subjext, topic, subtopic
@app.route('/api/show_often', methods = ['POST'])
def db_show_often():
    return UserInteractions.show_often(request.json)

# saved posts of a particular user
@app.route('/api/db_get_saved_post_of_user', methods = ['POST'])
def db_get_saved_post_of_user():
    return UserInteractions.get_saved_post_of_user(request.json)

# get particular post of user
@app.route('/api/db_get_particular_post', methods=['GET'])
def db_get_particular_post():
    return UserInteractions.get_particular_post(request.args.to_dict())

#setup educations and qualifications from questionaire
@app.route('/api/add_education_from_questionaire', methods=['POST'])
def db_add_education_from_questionaire():
    print(request.json)
    return ProfileObj(request.json).db_add_education_from_questionaire()

#takes the post of the subjects which student has added from database to the newsfeed.component.js
@app.route('/api/display_posts', methods=['POST'])
def db_display_posts_on_newsfeed():
    print(request.json)
    return UserInteractions.designing_newsfeed(request.json)

#create Stream-Subject-Topic
@app.route('/api/db_create_stream_subject_topic', methods=['POST'])
def db_create_stream_subject_topic():
    print(request.json)
    return SubjectsTopicsSubtopicsTags.create_stream_subject_topic(request.json)

#get all the subjects of a stream
@app.route('/api/db_get_all_subjects_of_stream', methods=['POST'])
def db_get_all_subjects_of_stream():
    print(request.json)
    return SubjectsTopicsSubtopicsTags.get_all_subjects_of_stream(request.json)

#get all the subjects of a stream
@app.route('/api/db_search_a_subject', methods=['POST'])
def db_search_a_subject():
    print(request.json)
    return SubjectsTopicsSubtopicsTags.search_a_subject(request.json)

#get all the subjects of a stream
@app.route('/api/db_search_a_topic', methods=['POST'])
def db_search_a_topic():
    print(request.json)
    return SubjectsTopicsSubtopicsTags.search_a_topic(request.json)

#designing newsfeed when load more btn is pressed, sending posts which aren't already on the newsfeed
@app.route('/api/load_more_posts', methods=[ 'POST'])
def db_load_more_posts():
    print(request.json)
    return UserInteractions.designing_newsfeed_for_load_more_btn(request.json)

@app.route('/api/add_todo', methods=['POST'])
def db_add_todo():
    return TodoDocument.db_add_todo(request.json)

@app.route('/api/get_todo_images', methods=['POST'])
def db_get_todo_images():
    return TodoDocument.db_get_todo_images(request.json)

@app.route('/api/get_all_todo_for_user', methods=['POST'])
def db_get_all_todo_for_user():
    return TodoDocument.db_get_all_todo_for_user(request.json)

@app.route('/api/delete_todo', methods=['POST'])
def db_delete_todo():
    return TodoDocument.db_delete_todo(request.json)

#to store all the user interactions
@app.route('/api/user_interactions', methods=['GET', 'POST'])
def db_store_interactions():
    print(request.json)
    return UserInteractions.store_interactions(request.json)

#to update user interaction with the post on mcqResponse
@app.route('/api/mcq_response', methods=['POST'])
def db_mcq_response():
    print(request.json)
    return UserInteractions.mcq_response(request.json)

#search a user
@app.route('/api/db_search_user', methods=['POST'])
def db_search_user():
    print(request.json)
    return UserObj(request.json).search_user()

#search a user
@app.route('/api/db_search_user_profile', methods=['POST'])
def db_search_user_profile():
    print(request.json)
    return ProfileObj(request.json).search_user_profile()

# creates a new user and posts it to the database when provided with a json text formatted as {user_type: user_type, username: username, password: password, email: email}
@app.route('/api/db_create_user', methods=['POST'])
def db_create_user():
    userData = request.json
    userOTP = userData['OTP'] if userData['OTP'] else False
    sender = 'hello@finemate.co'
    emailid = userData['email'].lower()
    username = userData['username']

    if not(userOTP):
        try:
            validation = validate_email(userData['email'])
            print(validation)
        except EmailNotValidError as e:
            return make_response("Invalid Email Address.", 400)
        else:
            usernameEmailCheck = UserObj(request.json).db_check_username_email_present()
            if usernameEmailCheck == 'true':
                digits = "0123456789"
                OTP = ""

                for i in range (6):
                    OTP += digits[math.floor(random.random()*10)]
    
                otpMessage = OTP + " is your Finemate Verification Code."
                s = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', 587)
                s.starttls()

                message = """From: Finemate Admin<{0}>
To: <{1}>
MIME-Version: 1.0
Content-type: text/html
Subject: Verification Email

<h4>{2}</h4>
<p>Please ignore the email if you have not initiated an account creation.</p>""".format(sender, emailid, otpMessage)

                try:
                    s.login("AKIAX34YHC3NDECFB34U", "BNBe+R8b5qffGlFtF3D/R3/QXf2I60xdArM/MrHkD5sn")
                    s.sendmail(sender, emailid, message)
                    return make_response(OTP, 200)
                except:
                    return make_response("Server Side Error", 500)
            else:
                return make_response("Username or Email already in use.", 400)
    else:
        machineOTP = str(userData['machineOTP'])
        if userOTP and userOTP == machineOTP:
            UserObj(request.json).db_create_user()
            ProfileObj(request.json).db_create_profile()
            TodoDocument.db_create_todo_profile(request.json)

            s = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', 587)
            s.starttls()

            multipart = MIMEMultipart()
            multipart['Subject'] = 'Welcome to Finemate'
            multipart['From'] = formataddr(('Finemate', sender))
            multipart['To'] = formataddr(( username, emailid))

            bodytemp = r'newRegistrationEmail.html'
            with open(bodytemp, "r", encoding='utf-8') as emailTemplate:
                file = emailTemplate.read()

            multipart.attach(MIMEText(file, 'html'))
            try:
                s.login("AKIAX34YHC3NDECFB34U", "BNBe+R8b5qffGlFtF3D/R3/QXf2I60xdArM/MrHkD5sn")
                s.sendmail(sender, emailid, multipart.as_string())
                return make_response('Done', 200)
            except:
                return make_response('Done', 200)
        else:
            return make_response('Entered OTP is incorrect.', 400)

# sign in with google using google identity services and posts it to the database when provided with a name, first_name, last_name, user_type, email and picture
@app.route('/api/db_sign_in_with_third_parties', methods=['POST'])
def db_sign_in_with_third_parties():
    userData = request.form
    sender = 'hello@finemate.co'

    print(userData)
    usernameEmailCheck = UserObj(userData).db_check_email_present()

    if usernameEmailCheck == 'true':
        return ProfileObj(userData).db_get_profile_using_email()
    else:
        print('here2')
        userCreatedObj = UserObj(userData).db_create_user_using_google()
        
        ProfileObj(userCreatedObj).db_create_profile()
        
        TodoDocument.db_create_todo_profile(userCreatedObj)

        try:
            if request.files['profilePicture']:
                profileImage = request.files['profilePicture']
                profileImageThumbnail = Image.open(profileImage)
                profileImageThumbnail.thumbnail((250, 250))
                cleanfilenameOfImage = secure_filename(profileImage.filename)
                filename_without_extension = os.path.splitext(cleanfilenameOfImage)[0]
                extension = os.path.splitext(cleanfilenameOfImage)[1]

                # Check if the file is of proper extension
                if len(extension) > 0 and extension.lower() not in allowed_extensions:
                    return make_response("Invalid file type", 400)
                
                timestamp = time.strftime('_%Y-%m-%d-%H-%M-%S')
                cleanfilenameOfImage = filename_without_extension[:10] + timestamp + extension
                complete_file_path = '../react/src/assets/profilePictures/'
                folderName = 'profilePictures/'
                profileImageThumbnail.save(f"{complete_file_path}{cleanfilenameOfImage}")
                old_profile_picture = ProfileObj(userCreatedObj).delete_old_profile_picture()

                if mode == 'production':
                    
                    try:
                        s3.Bucket(aws_bucket_name).upload_file(complete_file_path + cleanfilenameOfImage, folderName + cleanfilenameOfImage)
                        s3.Bucket(aws_bucket_name).delete_objects(
                            Delete = {
                                'Objects' : [
                                   { 'Key' : folderName + old_profile_picture}
                                ]
                            }
                        )
                    except FileNotFoundError:
                        print("Error: The file was not found")
                        return ""
                    except NoCredentialsError:
                        print("Error: Credentials not available")
                        return ""
                    os.remove(complete_file_path + cleanfilenameOfImage)

                else: 
                    os.remove(complete_file_path + old_profile_picture)

                ProfileObj(userCreatedObj).set_profile_picture(cleanfilenameOfImage)

                return ProfileObj(userCreatedObj).db_get_profile_using_email()

        except:
            return make_response("Internal Server Error, something went wrong", 500)
        

        s = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', 587)
        s.starttls()

        multipart = MIMEMultipart()
        multipart['Subject'] = 'Welcome to Finemate'
        multipart['From'] = formataddr(('Finemate', sender))
        multipart['To'] = formataddr(( userCreatedObj['username'], userCreatedObj['email']))

        bodytemp = r'newRegistrationEmail.html'
        with open(bodytemp, "r", encoding='utf-8') as emailTemplate:
            file = emailTemplate.read()

        multipart.attach(MIMEText(file, 'html'))
        
        try:
            s.login("AKIAX34YHC3NDECFB34U", "BNBe+R8b5qffGlFtF3D/R3/QXf2I60xdArM/MrHkD5sn")
            s.sendmail(sender, userCreatedObj['email'], multipart.as_string())
            
            return make_response('Done', 200)
        except:
            return make_response('Done', 200)
        
# connect a user with other user
@app.route('/api/db_add_connection', methods=['POST'])
def db_add_connection():
    result = ProfileObj(request.json).add_connection()
    if result == 'Done':
        notificationData = request.json
        notificationData['activity_type'] = 'connected with you'
        Notification.create_notification(notificationData)
        return make_response('Done', 200)
    else:
        return make_response('User Not Found', 404)
        
# disconnect a user with other user
@app.route('/api/db_remove_connection', methods=['POST'])
def db_remove_connection():
    notificationData = request.json
    notificationData['activity_type'] = 'connected with you'
    Notification.delete_notification(notificationData)
    return ProfileObj(request.json).remove_connection()

# add a user friend with other user
@app.route('/api/db_add_friend', methods=['POST'])
def db_add_friend():
    result = ProfileObj(request.json).add_friend()
    if result == 'Done':
        notificationData = request.json
        notificationData['activity_type'] = 'connected with you'
        Notification.delete_notification(notificationData)

        notificationDataForAddFriend = request.json
        notificationDataForAddFriend['activity_type'] = 'added you friend'
        Notification.create_notification(notificationDataForAddFriend)
        return make_response('Done', 200)
    else:
        make_response('User Not Found', 404)

# disconnect a user with other user
@app.route('/api/db_remove_friend', methods=['POST'])
def db_remove_friend():
    notificationData = request.json
    notificationData['activity_type'] = 'added you friend'
    Notification.delete_notification(notificationData)
    return ProfileObj(request.json).remove_friend()


# disconnect a user with other user
@app.route('/api/db_get_pending', methods=['POST'])
def db_get_pending():
    return ProfileObj(request.json).get_pending()


# returns the user requested from the database when provided with a json text formatted as {email: email}
@app.route('/api/db_get_user', methods=['POST'])
def db_get_user():
    return UserObj(request.json).db_get_user()

# returns the user email requested from the database when provided with a json text formatted as {username: username}
@app.route('/api/db_get_user_email', methods=['POST'])
def db_get_user_email():
    return UserObj(request.json).db_get_user_email()

# updates the user's name when provided with a json text formatted as {email: email, username: username} 
@app.route('/api/db_update_user_name', methods=['PUT'])
def db_update_user_name():
    return UserObj(request.json).db_update_user_name()

# updates the user's password when provided with a json text formatted as {email: email, password: password} 
@app.route('/api/db_update_user_password', methods=['POST'])
def db_update_user_password():
    userData = request.json
    userOTP = userData['OTP'] if userData['OTP'] else False
    if not(userOTP):
        usernameEmailCheck = UserObj(request.json).db_check_username_email_present()
        if usernameEmailCheck != 'true':
            digits = "0123456789"
            OTP = ""

            for i in range (6):
                OTP += digits[math.floor(random.random()*10)]
    
            otpMessage = OTP + " is your Finemate Verification Code."
            s = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', 587)
            s.starttls()

            sender = "hello@finemate.co"
            emailid = userData['email'].lower()
            message = """From: Finemate Admin<{0}>
To: <{1}>
MIME-Version: 1.0
Content-type: text/html
Subject: Verification Email

<h4>{2}</h4>""".format(sender, emailid, otpMessage)

            try:
                s.login("AKIAX34YHC3NDECFB34U", "BNBe+R8b5qffGlFtF3D/R3/QXf2I60xdArM/MrHkD5sn")
                s.sendmail(sender, emailid, message)
                return make_response(OTP, 200)
            except:
                return make_response("Server Side Error", 500)
        else:
            return make_response("Email not registered", 400)
    else:
        return UserObj(request.json).db_update_user_password()

# updates the user's email when provided with a json text formatted as {old_email: old_email, new_email: new_email} 
@app.route('/api/db_update_user_email', methods=['PUT'])
def db_update_user_email():
    return UserObj(request.json).db_update_user_email()

# deletes the user when provided with a json text formatted as {email: email} 
@app.route('/api/db_delete_user', methods=['DELETE'])
def db_delete_single_user():
    return UserObj(request.json).db_delete_single_user()

# deletes all the users in the database 
@app.route('/api/db_delete_all_users', methods=['DELETE'])
def db_delete_all_users():
    return UserObj(request.json).db_delete_all_users()

# when provided with a json text formatted as {username: username / email, password: password} returns {true} if such user exists and {false} o/w
@app.route('/api/db_login', methods=['POST'])
def db_login():
    return UserObj(request.json).db_login()
 
# records the data and time of the last logout when provided with a json text formatted as {email: email}
@app.route('/api/db_logout', methods=['POST'])
def db_logout():
    return UserObj(request.json).db_logout()

# returns list of consultants with optional parameters formatted as {email: email, username: username, name: name}
@app.route('/api/db_get_consultants', methods=['POST'])
def db_get_consultants():
    return UserObj(request.json).db_get_consultants()

# returns user_type when provided with username formatted as {username: username}
@app.route('/api/db_get_user_type', methods=['POST'])
def db_get_user_type():
    return UserObj(request.json).db_get_user_type()

# returns last_logout when provided with username formatted as {username: username}
@app.route('/api/db_last_login', methods=['POST'])
def db_last_login():
    return UserObj(request.json).db_last_login()
    
# creates a new profile and posts it to the database when provided with a json text formatted as {username: username}
@app.route('/api/db_create_profile', methods=['POST'])
def db_create_profile():
    return ProfileObj(request.json).db_create_profile()

# returns the profile requested from the database when provided with a json text formatted as {username: username}
@app.route('/api/db_get_profile', methods=['GET'])
def db_get_profile():
    return ProfileObj(request.args.to_dict()).db_get_profile()

# returns the profile requested from the database when provided with a json text formatted as {username: username}
@app.route('/api/db_get_profile_picture', methods=['POST'])
def db_get_profile_picture():
    return ProfileObj(request.json).db_get_profile_picture()

# updates the user's phone number when provided with a json text formatted as {phone_number: phone_number, username: username} 
@app.route('/api/db_update_profile_phone_number', methods=['POST'])
def db_update_profile_phone_number():
    return ProfileObj(request.json).db_update_profile_phone_number()

# updates the user's first name when provided with a json text formatted as {first_name: first_name, username: username} 
@app.route('/api/db_update_profile_first_name', methods=['POST'])
def db_update_profile_first_name():
    return ProfileObj(request.json).db_update_profile_first_name()

# updates the user's last name when provided with a json text formatted as {last_name: last_name, username: username} 
@app.route('/api/db_update_profile_last_name', methods=['POST'])
def db_update_profile_last_name():
    return ProfileObj(request.json).db_update_profile_last_name()

# updates the user's profile description when provided with a json text formatted as {description: description, username: username} 
@app.route('/api/db_update_profile_description', methods=['POST'])
def db_update_profile_description():
    return ProfileObj(request.json).db_update_profile_description()

# updating profile picture when provided with a form data MIMETYPE form-data where image is in the file form and username as request.form formatted as {description: description, username: username} 
@app.route('/api/db_update_profile_picture', methods=['POST'])
def db_update_profile_picture():
    try:
        if request.files['profilePicture']:
            profileImage = request.files['profilePicture']
            profileImageThumbnail = Image.open(profileImage)
            profileImageThumbnail.thumbnail((250, 250))
            
            cleanfilenameOfImage=secure_filename(profileImage.filename)

            filename_without_extension = os.path.splitext(cleanfilenameOfImage)[0]
            extension = os.path.splitext(cleanfilenameOfImage)[1]

            # Check if the file is of proper extension
            if len(extension) > 0 and extension.lower() not in allowed_extensions:
                return make_response("Invalid file type", 400)
            

            timestamp = time.strftime('_%Y-%m-%d-%H-%M-%S')
            cleanfilenameOfImage = filename_without_extension[:10] + timestamp + extension
            complete_file_path = '../react/src/assets/profilePictures/'
            folderName = 'profilePictures/'

            profileImageThumbnail.save(f"{complete_file_path}{cleanfilenameOfImage}")

            old_profile_picture = ProfileObj(request.form).delete_old_profile_picture()

            if mode == 'production':
                try:
                    s3.Bucket(aws_bucket_name).upload_file(complete_file_path + cleanfilenameOfImage, folderName + cleanfilenameOfImage)
                    s3.Bucket(aws_bucket_name).delete_objects(
                        Delete = {
                            'Objects' : [
                               { 'Key' : folderName + old_profile_picture}
                            ]
                        }
                    )
                except FileNotFoundError:
                    print("Error: The file was not found")
                    return ""
                except NoCredentialsError:
                    print("Error: Credentials not available")
                    return ""
                os.remove(complete_file_path + cleanfilenameOfImage)
            else: 
                os.remove(complete_file_path + old_profile_picture)

            return ProfileObj(request.form).set_profile_picture(cleanfilenameOfImage)
        else:
            return make_response("Insert a image", 400)
    except:
        return make_response("Internal Server Error, something went wrong", 500)


@app.route('/api/db_authorization_check', methods=['DELETE'])
def db_authorization_check():
    return make_response('true', 200)


# adds to the user's languages when provided with a json text formatted as {language: language, username: username} 
@app.route('/api/db_add_profile_language', methods=['PUT'])
def db_add_profile_language():
    return ProfileObj(request.json).db_add_profile_language()

# deletes from the user's languages when provided with a json text formatted as {language: language, username: username} 
@app.route('/api/db_delete_profile_language', methods=['POST'])
def db_delete_profile_language():
    return ProfileObj(request.json).db_delete_profile_language()

# adds to the user's completed courses when provided with a json text formatted as {completed_course: completed_course, username: username} 
@app.route('/api/db_add_profile_completed_course', methods=['PUT'])
def db_add_profile_completed_course():
    return ProfileObj(request.json).db_add_profile_completed_course()

# deletes from the user's completed courses when provided with a json text formatted as {completed_course: completed_course, username: username} 
@app.route('/api/db_delete_profile_completed_course', methods=['POST'])
def db_delete_profile_completed_course():
    return ProfileObj(request.json).db_delete_profile_completed_course()

# adds to the user's skills when provided with a json text formatted as {skill: skill, username: username} 
@app.route('/api/db_add_profile_skill', methods=['PUT'])
def db_add_profile_skill():
    return ProfileObj(request.json).db_add_profile_skill()

# deletes from the user's skills when provided with a json text formatted as {skill: skill, username: username} 
@app.route('/api/db_delete_profile_skill', methods=['POST'])
def db_delete_profile_skill():
    return ProfileObj(request.json).db_delete_profile_skill()

# adds to the user's educations when provided with a json text formatted as {education: education, username: username} 
@app.route('/api/db_add_profile_education', methods=['PUT'])
def db_add_profile_education():
    return ProfileObj(request.json).db_add_profile_education()

# deletes from the user's educations when provided with a json text formatted as {education: education, username: username} 
@app.route('/api/db_delete_profile_education', methods=['POST'])
def db_delete_profile_education():
    return ProfileObj(request.json).db_delete_profile_education()

# adds to the user's educations when provided with a json text formatted as {education: education, username: username} 
@app.route('/api/db_add_profile_interest', methods=['PUT'])
def db_add_profile_interest():
    return ProfileObj(request.json).db_add_profile_interest()

# deletes from the user's educations when provided with a json text formatted as {education: education, username: username} 
@app.route('/api/db_delete_profile_interest', methods=['POST'])
def db_delete_profile_interest():
    return ProfileObj(request.json).db_delete_profile_interest()

# adds to the user's educations when provided with a json text formatted as {education: education, username: username} 
@app.route('/api/db_add_profile_hate', methods=['PUT'])
def db_add_profile_hate():
    return ProfileObj(request.json).db_add_profile_hate()

# deletes from the user's educations when provided with a json text formatted as {education: education, username: username} 
@app.route('/api/db_delete_profile_hate', methods=['POST'])
def db_delete_profile_hate():
    return ProfileObj(request.json).db_delete_profile_hate()

# Allows Creation Of events for a user
@app.route('/api/db_create_event', methods=['POST'])
def db_create_event():
    return CalenderObj(request.json).db_create_event()

# Gets an event for the user
@app.route('/api/db_get_schedule', methods=['PUT'])
def db_get_event():
    print(request.json)
    return CalenderObj(request.json).db_get_event()

#updates events for a user
@app.route('/api/db_update_event', methods=['PUT'])
def db_update_event():
    return CalenderObj(request.json).db_update_event()

#updates events for a user
@app.route('/api/db_delete_event', methods=['DELETE'])
def db_delete_event():
    return CalenderObj(request.json).db_delete_event()

# creates a new course and posts it to the database when provided with a json text formatted as {course_category: course_category, course_name: course_name, course_instructor: course_instructor, extra_info: extra_info}
@app.route('/api/db_create_course', methods=['POST'])
def db_create_course():
    print(request.json)
    return CourseObj(request.json).db_create_course()

# adds the passed in student to the given course when provided with a json text formatted as {course_name: course_name, student: student}
@app.route('/api/db_add_student_to_course', methods=['POST'])
def db_add_student_to_course():
    return CourseObj(request.json).db_add_student_to_course()

# removes the passed in student from the given course when provided with a json text formatted as {course_name: course_name, student: student}
@app.route('/api/db_remove_student_from_course', methods=['PUT'])
def db_remove_student_from_course():
    return CourseObj(request.json).db_remove_student_from_course()

# returns the course requested from the database when provided with a json text formatted as {course_name: course_name}
@app.route('/api/db_get_course', methods=['GET'])
def db_get_course():
    return CourseObj(request.json).db_get_course()

# returns all of the courses instructed by the given instructor when provided with a json text formatted as {course_name: course_name, course_instructor: course_instructor}
@app.route('/api/db_get_courses_of_instructor', methods=['GET'])
def db_get_courses_of_instructor():
    return CourseObj(request.json).db_get_courses_of_instructor()

# returns all of the courses taken by the given student when provided with a json text formatted as {course_name: course_name, student: student}
@app.route('/api/db_get_courses_of_student', methods=['POST'])
def db_get_courses_of_student():
    return CourseObj(request.json).db_get_courses_of_student()

# updates the course category when provided with a json text formatted as {course_name: course_name, course_category: course_category} 
@app.route('/api/db_update_course_category', methods=['PUT'])
def db_update_course_category():
    return CourseObj(request.json).db_update_course_category()

# updates the course name when provided with a json text formatted as {old_course_name: old_course_name, new_course_name: new_course_name} 
@app.route('/api/db_update_course_name', methods=['PUT'])
def db_update_course_name():
    return CourseObj(request.json).db_update_course_name()

# updates the course instructor when provided with a json text formatted as {course_name: course_name, course_instructor: course_instructor} 
@app.route('/api/db_update_course_instructor', methods=['PUT'])
def db_update_course_instructor():
    return CourseObj(request.json).db_update_course_instructor()

# deletes the course when provided with a json text formatted as {course_name: course_name} 
@app.route('/api/db_delete_course', methods=['DELETE'])
def db_delete_single_course():
    return CourseObj(request.json).db_delete_single_course()

@app.route('/api/get_all_courses', methods=['GET'])
def db_get_all_courses():
    return CourseObj(request.json).db_get_all_courses()

# Sends a message from a user to another
@app.route('/api/db_send_message', methods=['POST'])
def db_send_message():
    return MessageObj(request.json).db_send_message()

# Delete a message from a user to another
@app.route('/api/db_delete_message', methods=['POST'])
def db_delete_message():
    return MessageObj(request.json).db_delete_message()

# Gets all messages for two users
@app.route('/api/db_get_messages', methods=['POST'])
def db_get_messages():
    return MessageObj(request.json).db_get_messages()

# Gets all messaged users
@app.route('/api/db_get_messaged_users', methods=['POST'])
def db_get_messaged_users():
    return MessageObj(request.json).db_get_messaged_users()

# Get unseen users
@app.route('/api/db_get_unseen_messages', methods = ['POST'])
def db_get_unseen_user_number():
    return MessageObj(request.json).db_get_unseen_user_number()

# Get notifications
@app.route('/api/db_get_notifications', methods = ['POST'])
def db_get_notifications():
    return Notification.get_all_notifications(request.json)

# Get notifications
@app.route('/api/db_get_number_of_unseen_notification', methods = ['POST'])
def db_get_number_of_unseen_notification():
    return Notification.get_number_of_unseen_notification(request.json)

#Get all threads
@app.route('/api/db_get_all_threads', methods=['POST'])
def db_get_all_threads():
    return Board(request.json).db_get_all_threads()

#Get all threads of a community
@app.route('/api/db_get_all_threads_of_community', methods=['POST'])
def db_get_all_threads_of_community():
    return Board(request.json).db_get_all_threads_of_community()

#search a thread
@app.route('/api/db_search_thread', methods=['POST'])
def db_search_thread():
    return Board(request.json).search_thread(request.json)

#delete reply
@app.route('/api/db_delete_reply', methods=['POST'])
def db_delete_reply():
    notificationData = request.json
    notificationData['activity_type'] = 'replied to the discussion'
    Notification.delete_notification(notificationData)
    return Board(request.json).remove_reply(request.json)

#delete thread
@app.route('/api/db_delete_thread', methods=['POST'])
def db_delete_thread():
    notificationData = request.json
    notificationData['activity_type'] = 'replied to the discussion'
    notificationData['username'] = 'DELETE ALL THE NOTIFICATION FOR THIS THREAD'
    Notification.delete_notification(notificationData)
    return Board(request.json).delete_thread(request.json)

#Get threads by id
@app.route('/api/db_get_thread_id', methods=['POST'])
def db_get_thread_id():
    return Board(request.json).db_get_thread_id()

#Put a reply in a thread
@app.route('/api/db_put_thread_reply', methods=['PUT'])
def db_put_thread_reply():
    notificationData = request.json
    notificationData['activity_type'] = 'replied to the discussion'
    Notification.create_notification(notificationData)
    return Board(request.json).db_put_thread_reply()

#Create a thread
@app.route('/api/db_create_thread', methods=['POST'])
def db_create_thread():
    return Board(request.json).db_create_thread()

# adds a new dashevent and posts it to the database when provided with a json text formatted as {dashevent_category: dashevent_category, dashevent_name: dashevent_name, dashevent_instructor: dashevent_instructor, extra_info: extra_info}
@app.route('/api/db_add_dashevent', methods=['POST'])
def db_add_dashevent():
    print(request.json)
    return dasheventObj(request.json).db_add_dashevent()

# adds the passed in student to the given dashevent when provided with a json text formatted as {dashevent_name: dashevent_name, student: student}
@app.route('/api/db_add_student_to_dashevent', methods=['POST'])
def db_add_student_to_dashevent():
    return dasheventObj(request.json).db_add_student_to_dashevent()

# removes the passed in student from the given dashevent when provided with a json text formatted as {dashevent_name: dashevent_name, student: student}
@app.route('/api/db_remove_student_from_dashevent', methods=['PUT'])
def db_remove_student_from_dashevent():
    return dasheventObj(request.json).db_remove_student_from_dashevent()

# returns the dashevent requested from the database when provided with a json text formatted as {dashevent_name: dashevent_name}
@app.route('/api/db_retrieve_dashevent', methods=['GET'])
def db_retrieve_dashevent():
    return dasheventObj(request.json).db_retrieve_dashevent()

# returns all of the dashevents instructed by the given instructor when provided with a json text formatted as {dashevent_name: dashevent_name, dashevent_instructor: dashevent_instructor}
@app.route('/api/db_get_dashevents_of_instructor', methods=['GET'])
def db_get_dashevents_of_instructor():
    return dasheventObj(request.json).db_get_dashevents_of_instructor()

# returns all of the dashevents taken by the given student when provided with a json text formatted as {dashevent_name: dashevent_name, student: student}
@app.route('/api/db_get_dashevents_of_student', methods=['POST'])
def db_get_dashevents_of_student():
    return dasheventObj(request.json).db_get_dashevents_of_student()

# updates the dashevent category when provided with a json text formatted as {dashevent_name: dashevent_name, dashevent_category: dashevent_category} 
@app.route('/api/db_update_dashevent_category', methods=['PUT'])
def db_update_dashevent_category():
    return dasheventObj(request.json).db_update_dashevent_category()

# updates the dashevent name when provided with a json text formatted as {old_dashevent_name: old_dashevent_name, new_dashevent_name: new_dashevent_name} 
@app.route('/api/db_update_dashevent_name', methods=['PUT'])
def db_update_dashevent_name():
    return dasheventObj(request.json).db_update_dashevent_name()

# updates the dashevent instructor when provided with a json text formatted as {dashevent_name: dashevent_name, dashevent_instructor: dashevent_instructor} 
@app.route('/api/db_update_dashevent_instructor', methods=['PUT'])
def db_update_dashevent_instructor():
    return dasheventObj(request.json).db_update_dashevent_instructor()

# deletes the dashevent when provided with a json text formatted as {dashevent_name: dashevent_name} 
@app.route('/api/db_delete_dashevent', methods=['DELETE'])
def db_delete_single_dashevent():
    return dasheventObj(request.json).db_delete_single_dashevent()

@app.route('/api/get_all_dashevents', methods=['GET'])
def db_get_all_dashevents():
    return dasheventObj(request.json).db_get_all_dashevents()

# adds to the user's completed dashevents when provided with a json text formatted as {completed_dashevent: completed_dashevent, username: username} 
@app.route('/api/db_add_profile_completed_dashevent', methods=['PUT'])
def db_add_profile_completed_dashevent():
    return ProfileObj(request.json).db_add_profile_completed_dashevent()

# deletes from the user's completed dashevents when provided with a json text formatted as {completed_dashevent: completed_dashevent, username: username} 
@app.route('/api/db_delete_profile_completed_dashevent', methods=['DELETE'])
def db_delete_profile_completed_dashevent():
    return ProfileObj(request.json).db_delete_profile_completed_dashevent()

# We check if we are running directly or not
if __name__ != '__main__':
    # if we are not running directly, we set the loggers
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

# you can put in your preferred port 
if __name__ == '__main__':   
    app.run(host='127.0.0.1', port=8103)
