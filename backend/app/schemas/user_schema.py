from pydantic import BaseModel, Field, EmailStr
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr = Field(..., description="User email")
    first_name: str = Field(..., min_length=1, max_length=30, description="First name")
    last_name: str = Field(..., min_length=1, max_length=30, description="Last name")


class UserResponse(UserBase):
    id: int = Field(..., description="Unique user id")
    password_hash: str
    role: str
    created_at: datetime
    updated_at: datetime


class UserCreate(UserBase):
    password: str = Field(..., min_length=5, max_length=30, description="User password")


class UsersListResponse(BaseModel):
    users: list[UserResponse]
    total: int = Field(..., description="Total number of users")


class UserLoginSchema(BaseModel):
    email: str
    password: str


class UserAuthSchema(BaseModel):
    id: int | None = None
    email: str
    first_name: str
    last_name: str
