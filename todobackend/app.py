from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Text
from datetime import datetime
from uuid import uuid4 as uuid

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

todos = []


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Todo(BaseModel):
    id: Optional[str]
    name: str
    description: Text
    status: str
    priority: str
    created_at: datetime = datetime.now()
    delete: bool = False


@app.get('/todos')
def get_todos():

    if len(todos) == 0:
        return {
            "message": "No hay datos",
            "data": todos
        }

    return {
        "message": 'Todo Ok',
        "data": todos
    }


@app.post('/todos')
def save_todo(todo: Todo):
    todo.id = str(uuid())
    todos.append(todo.dict())

    if todo.name == '' or todo.description == '' or todo.status == '':
        return HTTPException(status_code=401, detail="Algunos campos estan vacios")

    return {
        "message": "Todo creado con exito!",
        "data": todos[-1]
    }


@app.delete('/todos/{id_todo}')
def delete_todo(id_todo: str):
    for index, todo in enumerate(todos):
        if todo["id"] == id_todo:
            todos.pop(index)
            return {
                "message": "Tarea eliminado con exito",
                "data": todos
            }
    raise HTTPException(status_code=404, detail=" Tarea not found")


@app.put('/todos/')
def update_posts(todo_id: str, updateTodo: Todo):
    print(updateTodo, 'update todo')
    for index, todo in enumerate(todos):
        if todo["id"] == todo_id:
            todos[index]['name'] = updateTodo.name
            todos[index]['description'] = updateTodo.description
            todos[index]['status'] = updateTodo.status
            todos[index]['priority'] = updateTodo.priority
            return {
                "message": "Tarea actualizada",
                "data": todos
            }
    raise HTTPException(status_code=404, detail="Tarea not found")
