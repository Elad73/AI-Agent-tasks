from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path, WindowsPath
import os

api_router = APIRouter()

# Add CORS middleware to the router
origins = [
    "http://localhost:3000",     # Next.js default port
    "http://localhost:8000",     # FastAPI default port
    "*"                          # Allow all origins (you might want to restrict this in production)
]

# Add these CORS settings to your main FastAPI app file (main.py)
from fastapi import FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchRequest(BaseModel):
    pattern: str

search_status = {
    "is_searching": False,
    "progress": 0,
    "current_location": "",
    "files_found": []
}

async def search_directory(base_path: str, pattern: str) -> list:
    try:
        base_path = Path(base_path)
        if not base_path.exists():
            return []

        pattern = pattern.lower()
        found_files = []
        
        # Use os.walk instead of rglob for better error handling
        for root, _, files in os.walk(str(base_path), followlinks=False):
            try:
                for file in files:
                    if pattern in file.lower():
                        full_path = os.path.join(root, file)
                        found_files.append(full_path)
            except PermissionError:
                continue  # Skip directories we can't access
            except Exception as e:
                print(f"Error processing directory {root}: {str(e)}")
                continue
                
        return found_files
    except Exception as e:
        print(f"Error searching {base_path}: {str(e)}")
        return []

@api_router.post("/search")
async def search_files(request: SearchRequest):
    global search_status
    search_status["is_searching"] = True
    search_status["progress"] = 0
    search_status["files_found"] = []
    
    try:
        # Priority locations with proper Windows path handling
        home = str(Path.home())
        priority_locations = [
            os.path.join(home, "Downloads"),
            os.path.join(home, "Documents"),
            os.path.join(home, "Desktop"),
            os.path.join(home, "Pictures")
        ]
        
        # Search priority locations first
        for idx, location in enumerate(priority_locations):
            if not search_status["is_searching"]:
                break
            
            search_status["current_location"] = location
            search_status["progress"] = (idx + 1) / len(priority_locations) * 50
            
            print(f"Searching {location} for {request.pattern}")
            found = await search_directory(location, request.pattern)
            if found:
                search_status["files_found"].extend(found)
                search_status["progress"] = 100
                break
        
        # If nothing found in priority locations, search system drives
        if not search_status["files_found"]:
            drives = [f"{d}:" for d in "CDEFGHIJKLMNOPQRSTUVWXYZ" 
                     if os.path.exists(f"{d}:")]
            
            for idx, drive in enumerate(drives):
                if not search_status["is_searching"]:
                    break
                
                search_status["current_location"] = drive
                search_status["progress"] = 50 + ((idx + 1) / len(drives) * 50)
                
                print(f"Searching {drive} for {request.pattern}")
                found = await search_directory(drive, request.pattern)
                search_status["files_found"].extend(found)
        
        return {
            "status": "success",
            "files": search_status["files_found"],
            "count": len(search_status["files_found"])
        }
    
    except Exception as e:
        print(f"Search error: {str(e)}")
        return {"status": "error", "message": str(e)}
    
    finally:
        search_status["is_searching"] = False
        search_status["progress"] = 100

@api_router.get("/search/status")
async def get_search_status():
    return search_status

@api_router.post("/search/stop")
async def stop_search():
    global search_status
    search_status["is_searching"] = False
    return {"status": "success"}
