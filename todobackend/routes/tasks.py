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

    # guardar la tarea en la base de datos completa
    DB_FIREBASE.child("tasks").push(new_task)

    # guardando la tarea en el usuario que la creo
    DB_FIREBASE.child("users").child(
        todo.localId).child('tasks').push(new_task)

    return {
        "message": "Todo creado con exito!",
        "data": tasks_db[-1]
    }


@tasks.put('/tasks_delete/')
def delete_todo(todo_id: str, updateTodo: TaskModel):
    print(todo_id)
    print(updateTodo)
    try:

        # buscar tarea en la db
        seleted_task = search_task_id(updateTodo.localId, todo_id)

        # eliminar la tarea en la db del usuario
        DB_FIREBASE.child(
            "users").child(updateTodo.localId).child('tasks').child(todo_id).remove()

        return {
            "message": "Tarea eliminada exitosament!!!",
            "data": seleted_task.val()
        }
    except:
        raise HTTPException(status_code=404, detail=" Tarea not found")


@tasks.put('/tasks/')
def update_posts(todo_id: str, updateTodo: TaskModel):

    try:
        # buscar tarea en la base de datos, especificamente en la del usuario

        seleted_task = search_task_id(updateTodo.localId, todo_id)

        # convertir dato que viene de firebase
        task_val = seleted_task.val()

        modified_task = {}

        modified_task['name'] = task_val['name'] = updateTodo.name
        modified_task['description'] = task_val['description'] = updateTodo.description
        modified_task['status'] = task_val['status'] = updateTodo.status
        modified_task['priority'] = task_val['priority'] = updateTodo.priority

        # modificando
        DB_FIREBASE.child(
            "users").child(updateTodo.localId).child('tasks').child(todo_id).update(modified_task)

        return {
            "message": "Tarea actualizada",
            "data": tasks_db
        }
    except:
        raise HTTPException(status_code=404, detail="Tarea not found")


@tasks.get('/tasks/')
def get_tasks_user(user_id: str):
    results = DB_FIREBASE.child("users").child(user_id).child('tasks').get()

    tasks = []

    for result in results.each():
        new_result = result.val()
        new_result["key"] = result.key()

        tasks.append(new_result)

    return {
        "message": "Tareas del usuario",
        "data": tasks
    }


# funcion reutilizable para buscar tarea de un usuario en especifico
def search_task_id(localId, task_id):
    data = DB_FIREBASE.child("users").child(
        localId).child('tasks').child(task_id).get()
    return data
