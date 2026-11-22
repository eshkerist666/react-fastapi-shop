from pydantic import BaseModel, Field
from datetime import datetime


class CategoryBase(BaseModel):
    category_name: str = Field(
        ..., min_length=1, max_length=255, description="Category name"
    )


class CategoryResponse(CategoryBase):
    category_id: int = Field(..., description="Unique category id")
    created_at: datetime


class CategoryCreate(CategoryBase):
    pass


class CategoryListResponse(BaseModel):
    categories: list[CategoryResponse]
    total: int = Field(..., description="Total number of categories")
