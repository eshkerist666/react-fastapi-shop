from pydantic import BaseModel, Field
from datetime import datetime


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0, le=999)


class CartItemResponse(BaseModel):
    id: int
    product_id: int
    cart_quantity: int
    name: str
    description: str | None
    price: int
    category_id: int
    created_at: datetime
    image_url: str


class CartResponse(BaseModel):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    items: list[CartItemResponse]
    total_price: int


class CartUpdateQuantity(BaseModel):
    quantity: int = Field(gt=0, le=999)
