# Getting Started with Django SaaS

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env and add your credentials:
# - SPOTIFY_CLIENT_ID
# - SPOTIFY_CLIENT_SECRET
# - OPENAI_API_KEY
```

### Step 3: Initialize Database
```bash
python manage.py migrate
```

### Step 4: Create Admin User
```bash
python manage.py createsuperuser
# Follow the prompts to create your admin account
```

### Step 5: Run Development Server
```bash
python manage.py runserver
```

### Step 6: Access the Application
- **Web App**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **API**: http://localhost:8000/api/

---

## 📖 Documentation Guide

### For Setup & Installation
👉 **Read: `SETUP.md`**
- Complete installation guide
- Database configuration
- Environment setup
- Troubleshooting

### For Development
👉 **Read: `DEVELOPER_GUIDE.md`**
- Common Django commands
- How to add new features
- Testing guidelines
- Debugging tips

### For Architecture Overview
👉 **Read: `DJANGO_SETUP_SUMMARY.md`**
- Project structure
- Database models
- API endpoints
- Feature overview

### For Development Roadmap
👉 **Read: `ROADMAP.md`**
- 10-phase development plan
- Timeline estimates
- Success metrics
- Risk mitigation

### For Project Summary
👉 **Read: `IMPLEMENTATION_COMPLETE.md`**
- What was accomplished
- What's ready now
- What's next
- Quick reference

---

## 🎯 First Tasks

### 1. Verify Installation
```bash
# Check Django version
python manage.py --version

# Check installed apps
python manage.py showmigrations

# Run tests
python manage.py test
```

### 2. Explore Admin Interface
1. Go to http://localhost:8000/admin
2. Login with your superuser credentials
3. Explore the models:
   - User Profiles
   - Playlists
   - Songs
   - Voice Commands
   - AI Conversations

### 3. Test API Endpoints
Use Postman or curl to test:

```bash
# Register a new user
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Get current user
curl -X GET http://localhost:8000/api/auth/me/ \
  -H "Cookie: sessionid=YOUR_SESSION_ID"
```

### 4. Review Code Structure
```
apps/
├── core/models.py          # Database models
├── api/views.py            # API endpoints
├── api/serializers.py      # Data validation
└── auth_app/views.py       # Authentication

config/
├── settings.py             # Django settings
├── urls.py                 # URL routing
└── wsgi.py                 # Production server
```

---

## 🚀 Next Steps

### Option 1: Build Frontend (Recommended First)
```bash
# Create React app
npx create-react-app frontend
cd frontend

# Install dependencies
npm install axios react-router-dom

# Start development
npm start
```

Then connect to Django API:
```javascript
const API_URL = 'http://localhost:8000/api';

// Example: Login
const response = await axios.post(`${API_URL}/auth/login/`, {
    username: 'user',
    password: 'pass'
});
```

### Option 2: Implement Spotify OAuth
1. Get Spotify API credentials from https://developer.spotify.com
2. Update `.env` with credentials
3. Implement OAuth flow in `apps/auth_app/views.py`
4. Test OAuth callback

### Option 3: Add AI Command Parser
1. Get OpenAI API key from https://platform.openai.com
2. Create `apps/core/ai_parser.py`
3. Integrate OpenAI GPT API
4. Test natural language parsing

### Option 4: Deploy to Production
1. Set up PostgreSQL database
2. Configure production settings
3. Deploy to Heroku/AWS/DigitalOcean
4. Set up CI/CD pipeline

---

## 📚 Key Files to Review

### Essential
- `config/settings.py` - All Django configuration
- `apps/core/models.py` - Database schema
- `apps/api/views.py` - API endpoints
- `apps/api/serializers.py` - Data validation

### Important
- `requirements.txt` - Dependencies
- `.env.example` - Environment variables
- `manage.py` - Django CLI

### Reference
- `SETUP.md` - Installation guide
- `DEVELOPER_GUIDE.md` - Development tips
- `ROADMAP.md` - Development plan

---

## 🔧 Common Commands

### Django Management
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run tests
python manage.py test

# Django shell
python manage.py shell

# Collect static files
python manage.py collectstatic
```

### Git
```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
python manage.py runserver 8001
```

### Database Issues
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
```

### Import Errors
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### Missing Dependencies
```bash
pip install -r requirements.txt
```

### Permission Denied
```bash
chmod +x manage.py
```

---

## 📋 Development Checklist

### Before Starting
- [ ] Python 3.8+ installed
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] `.env` file configured
- [ ] Database migrated
- [ ] Admin user created

### During Development
- [ ] Follow Django best practices
- [ ] Write tests for new features
- [ ] Update documentation
- [ ] Commit regularly
- [ ] Review code before pushing

### Before Deployment
- [ ] All tests passing
- [ ] No debug mode in production
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Static files collected
- [ ] HTTPS configured

---

## 🎓 Learning Resources

### Django
- Official Docs: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Real Python: https://realpython.com/django/

### Spotify API
- Developer Docs: https://developer.spotify.com/documentation/web-api/
- Spotipy Library: https://spotipy.readthedocs.io/

### OpenAI
- API Docs: https://platform.openai.com/docs/
- Python Library: https://github.com/openai/openai-python

### Frontend (React)
- React Docs: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Axios: https://axios-http.com/

---

## 💡 Pro Tips

1. **Use Django Shell for Testing**
   ```bash
   python manage.py shell
   from apps.core.models import Playlist
   Playlist.objects.all()
   ```

2. **Enable Query Logging**
   ```python
   # In settings.py
   LOGGING = {
       'version': 1,
       'handlers': {
           'console': {'class': 'logging.StreamHandler'},
       },
       'loggers': {
           'django.db.backends': {
               'handlers': ['console'],
               'level': 'DEBUG',
           },
       },
   }
   ```

3. **Use Postman for API Testing**
   - Import API endpoints
   - Test with different payloads
   - Save requests for later

4. **Keep `.env` Secure**
   - Never commit `.env` file
   - Use `.env.example` as template
   - Rotate secrets regularly

5. **Use Git Branches**
   ```bash
   git checkout -b feature/my-feature
   # Make changes
   git push origin feature/my-feature
   # Create pull request
   ```

---

## 🎯 Success Criteria

You'll know everything is working when:

✅ Django server runs without errors
✅ Admin panel is accessible
✅ API endpoints respond correctly
✅ Database models are created
✅ Tests pass successfully
✅ Documentation is clear

---

## 📞 Need Help?

### Check Documentation
1. `SETUP.md` - Installation issues
2. `DEVELOPER_GUIDE.md` - Development questions
3. `ROADMAP.md` - Planning questions

### Common Issues
- Port in use → Use different port
- Database locked → Delete db.sqlite3
- Import errors → Activate virtual environment
- Missing dependencies → Run pip install

### Resources
- Django Docs: https://docs.djangoproject.com/
- Stack Overflow: https://stackoverflow.com/questions/tagged/django
- GitHub Issues: Check project issues

---

## 🚀 Ready to Build?

You have everything you need to start building! Here's the recommended order:

1. **Understand the Architecture** (30 min)
   - Read DJANGO_SETUP_SUMMARY.md
   - Review project structure

2. **Set Up Development Environment** (15 min)
   - Follow Quick Start above
   - Verify everything works

3. **Explore the Code** (1 hour)
   - Review models in apps/core/models.py
   - Check API endpoints in apps/api/views.py
   - Test admin interface

4. **Choose Your First Task** (1-2 weeks)
   - Build frontend (React/Vue)
   - Implement Spotify OAuth
   - Add AI command parser
   - Create voice API

5. **Deploy to Production** (1 week)
   - Set up database
   - Configure hosting
   - Deploy application

---

**Let's build something amazing! 🎉**

Start with the Quick Start section above, then refer to the documentation as needed.

Good luck! 🚀

