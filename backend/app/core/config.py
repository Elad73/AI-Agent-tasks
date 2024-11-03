from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Agent System"
    MONGODB_URL: str
    DATABASE_NAME: str
    jwt_secret: str
    
    
    class Config:
        env_file = "config/.env"

settings = Settings()
