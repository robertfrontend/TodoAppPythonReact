from pyrebase import pyrebase


firebaseConfig = {
    "apiKey": "AIzaSyCkhigSc7cVuIIO7AoJsdNYNDXOuhYMVU0",
    "authDomain": "todoappfastapi.firebaseapp.com",
    "projectId": "todoappfastapi",
    "storageBucket": "todoappfastapi.appspot.com",
    "messagingSenderId": "872598748288",
    "appId": "1:872598748288:web:1454391d320f64e7f13a65",
    "measurementId": "G-9PGBP7ML7C",
    "databaseURL": "https://todoappfastapi-default-rtdb.firebaseio.com/"
}

firebase = pyrebase.initialize_app(firebaseConfig)

db_firebase = firebase.database()
