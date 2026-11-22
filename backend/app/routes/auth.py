from fastapi import APIRouter, Depends, Response
from ..auth import auth
from ..schemas.user_schema import UserAuthSchema
from ..config import settings

router = APIRouter(prefix="/jwt", tags=["JWT"])


@router.post("/login", response_model=UserAuthSchema)
def auth_user(
    response: Response, user: UserAuthSchema = Depends(auth.validate_auth_user)
):
    access_token = auth.create_access_token(user)
    refresh_token = auth.create_refresh_token(user)

    response.set_cookie(
        key=auth.ACCESS_COOKIE,
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=settings.access_token_expire_minutes * 60,
    )

    response.set_cookie(
        key=auth.REFRESH_COOKIE,
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=settings.refresh_token_expire_days * 60 * 60 * 24,
    )

    return user


@router.post("/refresh", response_model=UserAuthSchema)
def auth_refresh_jwt(
    response: Response,
    user: UserAuthSchema = Depends(auth.get_current_auth_user_for_refresh),
):
    access_token = auth.create_access_token(user)
    response.set_cookie(
        key=auth.ACCESS_COOKIE,
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=60 * 15,
    )

    return user


@router.post("/logout", status_code=204)
def logout(response: Response):
    response.delete_cookie(
        key=auth.ACCESS_COOKIE, path="/", samesite="none", secure=True
    )

    response.delete_cookie(
        key=auth.REFRESH_COOKIE, path="/", samesite="none", secure=True
    )


@router.get("/users/me")
def get_self_info(
    payload: dict = Depends(auth.get_current_token_payload_user),
    user: UserAuthSchema = Depends(auth.get_current_auth_user),
):
    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "logged_in_at": payload.get("iat"),
    }
