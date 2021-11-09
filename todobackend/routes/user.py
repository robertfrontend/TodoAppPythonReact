from fastapi import APIRouter
from fastapi import HTTPException
from uuid import uuid4 as uuid

from config.db import conn

from schemas.user import userEntity, usersEntity
from models.user import User

user = APIRouter()


@user.get('/users')
def find_all_user():
    return 'get users'
    # return usersEntity(conn.local.user.find())


@user.post('/users')
def create_user(user: User):
    new_user = dict(user)

    return 'create user'


# @user.put('/user')
# def get_users():
#     return {"hello": "users"}


# @user.delete('/user')
# def get_users():
#     return {"hello": "users"}
