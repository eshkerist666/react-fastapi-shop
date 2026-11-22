from ..repositories.category_repository import CategoryRepository
from ..schemas.category_schema import (
    CategoryCreate,
    CategoryResponse,
    CategoryListResponse,
)
from fastapi import HTTPException, status


class CategoryService:
    def __init__(self, db):
        self.repository = CategoryRepository(db)

    async def get_all_categories(self) -> CategoryListResponse:
        categories = await self.repository.get_all()

        if not categories:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Categoies not found",
            )

        categories_response = [
            CategoryResponse.model_validate(dict(category)) for category in categories
        ]
        return CategoryListResponse(
            categories=categories_response, total=len(categories_response)
        )

    async def get_category_by_id(self, category_id: int) -> CategoryResponse:
        category = await self.repository.get_by_id(category_id)

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category not found",
            )

        return CategoryResponse.model_validate(dict(category))

    async def create_category(self, category_data: CategoryCreate) -> CategoryResponse:
        category = await self.repository.create(category_data)

        if not category:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create category",
            )

        return CategoryResponse.model_validate(dict(category))

    async def delete_category(self, category_id: int) -> CategoryResponse:
        category = await self.repository.delete(category_id)

        if not category:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete category",
            )

        return CategoryResponse.model_validate(dict(category))
