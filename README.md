# AI File Search Agent

An intelligent file search system that uses AI to optimize file discovery across your system. The agent learns from search patterns, suggests optimal locations, and provides smart summaries of results.

## Features

- 🔍 Intelligent file search across system
- 🧠 AI-powered search optimization
- 📊 Real-time progress tracking
- 📁 Priority folder searching
- 🎯 Pattern learning and suggestions
- 🚫 Graceful error handling
- ⏹️ Search cancellation support

## Prerequisites

- Python 3.8+
- Node.js 14+
- Docker (optional)
- Git

## Project Structure
ai-agent-tasks/
├── backend/
│ ├── app/
│ │ ├── api/
│ │ │ └── api_v1/
│ │ │ └── api.py
│ │ └── main.py
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/
│ ├── src/
│ │ └── app/
│ │ └── agents/
│ │ └── search/
│ │ └── page.tsx
│ ├── package.json
│ └── Dockerfile
└── docker-compose.yml

## Installation

### Method 1: Local Development

#### Backend Setup

1. Create and activate virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the Next.js development server:
```bash
npm run dev
```

### Method 2: Docker Deployment

1. Build and run using Docker Compose:
```bash
docker-compose up --build
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a search term in the input field
3. Click "Search" or press Enter
4. View real-time search progress and results
5. Use the "Stop" button to cancel an ongoing search

## API Endpoints

### Search Endpoints

- `POST /api/v1/search`
  - Start a new file search
  - Body: `{"pattern": "search_term"}`

- `GET /api/v1/search/status`
  - Get current search status
  - Returns progress and found files

- `POST /api/v1/search/stop`
  - Stop ongoing search

## Environment Variables

### Backend (.env)
```env
CORS_ORIGINS=http://localhost:3000
DEBUG=True
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Docker Configuration

### Build Images
```bash
# Build backend
docker build -t file-search-backend ./backend

# Build frontend
docker build -t file-search-frontend ./frontend
```

### Run Containers
```bash
# Using docker-compose
docker-compose up

# Or individually
docker run -p 8000:8000 file-search-backend
docker run -p 3000:3000 file-search-frontend
```

## Development

### Backend Development

1. Install additional dependencies:
```bash
pip install -r requirements-dev.txt
```

2. Run tests:
```bash
pytest
```

### Frontend Development

1. Install development dependencies:
```bash
npm install --save-dev
```

2. Run tests:
```bash
npm test
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS settings match your development environment
   - Check if backend URL is correctly set in frontend

2. **Search Not Working**
   - Verify backend server is running
   - Check console for error messages
   - Ensure proper file permissions

3. **Docker Issues**
   - Ensure ports 3000 and 8000 are available
   - Check Docker logs for errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FastAPI for the backend framework
- Next.js for the frontend framework
- React for the UI library
```

This README provides:
1. Clear installation instructions for both local and Docker deployment
2. Project structure overview
3. Detailed setup steps
4. API documentation
5. Environment configuration
6. Troubleshooting guide
7. Development instructions
8. Contributing guidelines

Would you like me to add any specific sections or provide more details for any part?
