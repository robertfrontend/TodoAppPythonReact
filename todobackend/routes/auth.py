from fastapi import HTTPException
from fastapi import APIRouter


from models.user import User, UserSignup
from config.auth_firebase import auth
from models.user import User
from config.db_firebase import DB_FIREBASE


auth_router = APIRouter()


@auth_router.post('/register')
def create_user(user: User):

    try:
        user_create = auth.create_user_with_email_and_password(
            user.email, user.password)
        print("Successfully create user!")

        # print(user_create, 'klk user create')
        # DB_FIREBASE.child("users").push(user.email)
        print(user, "user emailklk")
        DB_FIREBASE.child("users").child(user.name).push(user.email)

        return {
            "message": 'Usuario creado con exito',
            "data": user_create
        }
    except:
        return HTTPException(status_code=401, detail="Email already exists! / Correo invalido")


@auth_router.post('/login')
def signup(user: UserSignup):
    print(user, 'user login')

    try:
        user_login = auth.sign_in_with_email_and_password(
            user.email, user.password)
        print("Successfully login user!", user_login)

        return {
            "message": 'Todo Ok',
            "data": user_login
        }
    except:
        return HTTPException(status_code=401, detail="Este usuario no existe")
