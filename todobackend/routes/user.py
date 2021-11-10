from fastapi import APIRouter
from fastapi import HTTPException
from uuid import uuid4 as uuid

from config.db import conn

from schemas.user import userEntity, usersEntity
from models.user import User, UserSignup

user = APIRouter()


@user.post('/users')
def create_user(user: User):
    new_user = dict(user)

    return 'create user'


@user.post('signup')
def signup(user: UserSignup):

    return 'Iniciando Sesion'

# @user.put('/user')
# def get_users():
#     return {"hello": "users"}


# @user.delete('/user')
# def get_users():
#     return {"hello": "users"}
