from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTES
from routes.tasks import tasks
from routes.user import user

app = FastAPI()

app.include_router(tasks)
app.include_router(user)


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
