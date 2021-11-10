from fastapi import APIRouter
from fastapi import HTTPException
from uuid import uuid4 as uuid
from models.task import TaskModel

# db firebase
from config.db_firebase import DB_FIREBASE

tasks = APIRouter()

tasks_db = []


@tasks.get('/tasks')
def get_tasks():
    results = DB_FIREBASE.child("tasks").get()

    task = []

    for result in results.each():
        # obtener la key de una tarea
        new_result = result.val()
        new_result["key"] = result.key()

        task.append(new_result)
        tasks_db.append(new_result)

    if len(task) == 0:
        return {
            "message": "No hay datos",
            "data": task
        }

    return {
        "message": 'Todo Ok',
        "data": task
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

    DB_FIREBASE.child("tasks").push(new_task)

    return {
        "message": "Todo creado con exito!",
        "data": tasks_db[-1]
    }


@tasks.delete('/tasks/{id_todo}')
def delete_todo(id_todo: str):

    try:
        seleted_task = DB_FIREBASE.child("tasks").child(id_todo).get()

        DB_FIREBASE.child("tasks").child(id_todo).remove()
        print(seleted_task.val(), 'Tarea eliminada exitosament1!!!')
    except:
        raise HTTPException(status_code=404, detail=" Tarea not found")


@tasks.put('/tasks/')
def update_posts(todo_id: str, updateTodo: TaskModel):
    try:
        # obtener el key de la task
        key_task = updateTodo.key
        seleted_task = DB_FIREBASE.child("tasks").child(key_task).get()

        print(seleted_task.val()['name'], 'tarea elegida desde la db')

        # convertir dato que viene de firebase
        task_val = seleted_task.val()

        modified_task = {}

        modified_task['name'] = task_val['name'] = updateTodo.name
        modified_task['description'] = task_val['description'] = updateTodo.description
        modified_task['status'] = task_val['status'] = updateTodo.status
        modified_task['priority'] = task_val['priority'] = updateTodo.priority

        DB_FIREBASE.child("tasks").child(key_task).update(modified_task)

        return {
            "message": "Tarea actualizada",
            "data": tasks_db
        }
    except:
        raise HTTPException(status_code=404, detail="Tarea not found")
