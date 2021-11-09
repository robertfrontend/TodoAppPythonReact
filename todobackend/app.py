from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from pyrebase import pyrebase


# ROUTES
from routes.tasks import tasks
from routes.user import user

# db firebase
# from config.db_firebase import db_firebase

app = FastAPI()

app.include_router(tasks)
app.include_router(user)


# firebaseConfig = {
#     "apiKey": "AIzaSyCkhigSc7cVuIIO7AoJsdNYNDXOuhYMVU0",
#     "authDomain": "todoappfastapi.firebaseapp.com",
#     "projectId": "todoappfastapi",
#     "storageBucket": "todoappfastapi.appspot.com",
#     "messagingSenderId": "872598748288",
#     "appId": "1:872598748288:web:1454391d320f64e7f13a65",
#     "measurementId": "G-9PGBP7ML7C",
#     "databaseURL": "https://todoappfastapi-default-rtdb.firebaseio.com/"
# }

# firebase = pyrebase.initialize_app(firebaseConfig)

# db = firebase.database()

# # push data


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://todoapprobertfrontend.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
