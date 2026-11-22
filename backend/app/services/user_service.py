from ..repositories.user_repository import UserRepository
from ..schemas.user_schema import UserResponse, UserCreate, UsersListResponse
from fastapi import HTTPException, status
from ..auth import utils


class UserService:
    def __init__(self, db):
        self.repository = UserRepository(db)

    async def get_all_users(self) -> UsersListResponse:
        users = await self.repository.get_all()

        if not users:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Users not found",
            )

        users_response = [UserResponse.model_validate(dict(user)) for user in users]
        return UsersListResponse(users=users_response, total=len(users_response))

    async def get_user_by_id(self, user_id: int) -> UserResponse:
        user = await self.repository.get_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return UserResponse.model_validate(dict(user))

    async def get_user_by_email(self, user_email: str) -> UserResponse:
        user = await self.repository.get_by_email(user_email)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return UserResponse.model_validate(dict(user))

    async def create_user(self, user_data: UserCreate) -> UserResponse:
        existing_user = await self.repository.get_by_email(user_data.email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered",
            )

        user_data.password = utils.hash_password(user_data.password)
        user = await self.repository.create(user_data)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user",
            )

        return UserResponse.model_validate(dict(user))

    async def delete_user(self, user_id: int) -> UserResponse:
        user = await self.repository.delete(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return UserResponse.model_validate(dict(user))
