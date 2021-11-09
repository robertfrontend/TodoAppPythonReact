from fastapi import APIRouter


from config.auth_firebase import auth
from models.user import User

auth = APIRouter()


@auth.post('/user')
def create_user(user: User):

    return 'create user'


def signup():
    email = "enanow41romero@gmail.com"
    password = "robert2020"

    try:
        user = auth.create_user_with_email_and_password(email, password)
        print('Successfully created acount!')
    except:
        print('Email already exists!')


def login():
    email = "enanow41romero@gmail.com"
    password = "robert2020"

    user = auth.sign_in_with_email_and_password(email, password)

    print("Successfully login user!")


# signup()
