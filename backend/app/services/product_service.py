from ..repositories.product_repository import ProductRepository
from ..schemas.product_schema import (
    ProductsListResponse,
    ProductResponse,
    ProductCreate,
)
from fastapi import HTTPException, status


class ProductService:
    def __init__(self, db):
        self.repository = ProductRepository(db)

    async def get_all_products(
        self,
        category_id: int | None,
        search: str | None,
        limit: int,
        offset: int,
    ) -> ProductsListResponse:
        search = search.strip() if search and search.strip() else None

        products = await self.repository.get_all(
            category_id=category_id,
            search=search,
            limit=limit,
            offset=offset,
        )

        if category_id:
            total_count = await self.repository.get_total_count_by_category(category_id)
        else:
            total_count = await self.repository.get_total_count()

        products_response = [
            ProductResponse.model_validate(dict(product)) for product in products
        ]
        return ProductsListResponse(products=products_response, total=total_count)

    async def get_product_by_id(self, product_id: int) -> ProductResponse:
        product = await self.repository.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product not found",
            )

        return ProductResponse.model_validate(dict(product))

    async def create_product(self, product_data: ProductCreate) -> ProductResponse:
        product = await self.repository.create(product_data)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create product",
            )

        return ProductResponse.model_validate(dict(product))

    async def delete_product(self, product_id: int) -> ProductResponse:
        product = await self.repository.delete(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete product",
            )

        return ProductResponse.model_validate(dict(product))
