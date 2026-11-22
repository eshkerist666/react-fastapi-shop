from datetime import datetime
from pydantic import BaseModel, Field


class Address(BaseModel):
    country: str = Field(..., max_length=100)
    city: str = Field(..., max_length=100)
    street: str = Field(..., max_length=255)
    house: str = Field(..., max_length=20)
    apartment: str | None = Field(None, max_length=20)
    postal_code: str = Field(..., max_length=20)


class OrderCreate(Address):
    pass


class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: int
    image_url: str
    name: str
    item_id: int


class OrderResponse(BaseModel):
    id: int
    user_id: int
    status: str
    total_price: int
    created_at: datetime
    updated_at: datetime

    country: str
    city: str
    street: str
    house: str
    apartment: str | None
    postal_code: str

    items: list[OrderItemResponse]


class OrdersListResponse(BaseModel):
    orders: list[OrderResponse]
    total: int
