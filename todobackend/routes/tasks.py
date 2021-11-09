from fastapi import APIRouter
from fastapi import HTTPException
from uuid import uuid4 as uuid
from models.task import TaskModel

# db firebase
from config.db_firebase import db_firebase

tasks = APIRouter()

tasks_db = []


@tasks.get('/tasks')
def get_tasks():

    results = db_firebase.child("tasks").get()
    print(results, 'data firebase')

    for result in results.each():
        tasks_db.append(result.val())
        print(result.val())

    if len(tasks_db) == 0:
        return {
            "message": "No hay datos",
            "data": tasks_db
        }

    return {
        "message": 'Todo Ok',
        "data": tasks_db
    }


@tasks.post('/tasks')
def save_todo(todo: TaskModel):
    todo.id = str(uuid())
    tasks_db.append(todo.dict())

    if todo.name == '' or todo.description == '' or todo.status == '':
        return HTTPException(status_code=401, detail="Algunos campos estan vacios")

    # crear tarea en firebase
    new_task = todo.dict()
    new_task.pop('created_at')

    db_firebase.child("tasks").push(new_task)

    return {
        "message": "Todo creado con exito!",
        "data": tasks_db[-1]
    }


@tasks.delete('/tasks/{id_todo}')
def delete_todo(id_todo: str):
    for index, todo in enumerate(tasks_db):
        if todo["id"] == id_todo:
            tasks_db.pop(index)
            return {
                "message": "Tarea eliminado con exito",
                "data": tasks_db
            }
    raise HTTPException(status_code=404, detail=" Tarea not found")


@tasks.put('/tasks/')
def update_posts(todo_id: str, updateTodo: TaskModel):
    print(updateTodo, 'update todo')
    for index, todo in enumerate(tasks_db):
        if todo["id"] == todo_id:
            tasks_db[index]['name'] = updateTodo.name
            tasks_db[index]['description'] = updateTodo.description
            tasks_db[index]['status'] = updateTodo.status
            tasks_db[index]['priority'] = updateTodo.priority
            return {
                "message": "Tarea actualizada",
                "data": tasks_db
            }
    raise HTTPException(status_code=404, detail="Tarea not found")
