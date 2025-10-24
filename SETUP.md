# Installation & Getting Started

## Prerequisites

- Python 3.8+
- Node.js 16+ (for React frontend)
- pip (Python package manager)
- npm (Node package manager)

---

## Backend Setup (Django)

### Step 1: Create Virtual Environment

```bash
cd playlist-manager
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Step 2: Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings (optional for development)
```

### Step 4: Database Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser
```

### Step 5: Run Django Server

```bash
python manage.py runserver
```

Django will be available at `http://localhost:8000`

---

## Frontend Setup (React + TypeScript)

### Step 1: Create React App

```bash
# From the project root directory
npx create-react-app frontend --template typescript
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install axios react-router-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Create Environment File

Create `frontend/.env`:

```
REACT_APP_API_URL=http://localhost:8000/api
```

### Step 5: Run React Development Server

```bash
npm start
```

React will be available at `http://localhost:3000`

---

## Running Both Servers

### Terminal 1 - Django Backend

```bash
cd playlist-manager
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

### Terminal 2 - React Frontend

```bash
cd playlist-manager/frontend
npm start
```

Now you have:
- Backend API: http://localhost:8000
- Frontend App: http://localhost:3000
- Admin Panel: http://localhost:8000/admin

---

## Testing Django Authentication

### 1. Create a Test User

```bash
# In Django shell
python manage.py shell

# Then run:
from django.contrib.auth.models import User
User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
exit()
```

### 2. Test Login via API

```bash
# Using curl
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

Or use the admin panel at `http://localhost:8000/admin` with your superuser credentials.

---

## Troubleshooting

### Port Already in Use

```bash
# Django on different port
python manage.py runserver 8001

# React on different port
PORT=3001 npm start
```

### CORS Errors

Make sure `CORS_ALLOWED_ORIGINS` in Django settings includes `http://localhost:3000`

### Dependencies Not Installing

```bash
# Clear pip cache
pip install --no-cache-dir -r requirements.txt

# For npm
npm cache clean --force
npm install
```

---

## Next Steps

1. Build React login page
2. Integrate Django authentication
3. Create playlist management UI
4. Add Spotify OAuth integration

