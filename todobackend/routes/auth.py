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
        created = auth.create_user_with_email_and_password(
            user.email,
            user.password
        )

        return {
            "message": "usuario creado con exito!!",
            "data": created,
            "status_code": 200
        }

    except:
        return HTTPException(status_code=401, detail="Email already exists! / Correo invalido")


@auth_router.post('/login')
def signup(user: UserSignup):

    try:
        user_login = auth.sign_in_with_email_and_password(
            user.email,
            user.password
        )

        return {
            "message": 'Todo Ok',
            "data": user_login,
            "status_code": 200
        }
    except:
        return HTTPException(status_code=401, detail="Este usuario no existe")
