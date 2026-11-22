from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import (
    products_router,
    categories_router,
    carts_router,
    users_router,
    orders_router,
    auth_router,
)

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(categories_router)
app.include_router(carts_router)
app.include_router(users_router)
app.include_router(orders_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to shop",
        "docs": "/docs",
    }


@app.get("/health")
def health_check(request: Request):
    return {"status": "healthy", "root_path": request.scope.get("root_path")}
