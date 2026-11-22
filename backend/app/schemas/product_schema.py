from pydantic import BaseModel, Field
from datetime import datetime


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Product name")
    description: str | None = Field(
        None, description="Product description", max_length=1000
    )
    price: int = Field(..., ge=0, description="Product price in cents")
    quantity: int = Field(..., ge=0, description="Product quantity")
    category_id: int = Field(..., description="Product category_id")
    image_url: str | None = Field(None, description="Product image url")


class ProductResponse(ProductBase):
    id: int = Field(..., description="Unique product id")
    created_at: datetime


class ProductCreate(ProductBase):
    pass


class ProductsListResponse(BaseModel):
    products: list[ProductResponse]
    total: int = Field(..., description="Total number of products")
