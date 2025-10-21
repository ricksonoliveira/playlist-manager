# Developer Quick Reference Guide

## Common Django Commands

### Database Management
```bash
# Create migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Show migration status
python manage.py showmigrations

# Revert to previous migration
python manage.py migrate app_name 0001
```

### Development
```bash
# Run development server
python manage.py runserver

# Run on different port
python manage.py runserver 8001

# Create superuser (admin)
python manage.py createsuperuser

# Shell for testing
python manage.py shell
```

### Testing
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test apps.core

# Run with verbose output
python manage.py test -v 2
```

### Utilities
```bash
# Collect static files
python manage.py collectstatic

# Clear cache
python manage.py clear_cache

# Check for issues
python manage.py check

# Show installed apps
python manage.py showmigrations
```

---

## Project Layout

### Adding a New API Endpoint

1. **Create the view** in `apps/api/views.py`:
```python
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

class MyViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MySerializer
    
    @action(detail=False, methods=['get'])
    def custom_action(self, request):
        return Response({'message': 'Hello'})
```

2. **Create serializer** in `apps/api/serializers.py`:
```python
from rest_framework import serializers
from apps.core.models import MyModel

class MySerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = '__all__'
```

3. **Register in router** in `apps/api/urls.py`:
```python
router.register(r'mymodel', MyViewSet, basename='mymodel')
```

---

### Adding a New Model

1. **Define in** `apps/core/models.py`:
```python
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
```

2. **Register in admin** `apps/core/admin.py`:
```python
from django.contrib import admin
from .models import MyModel

@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
```

3. **Create migration**:
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## File Structure Reference

```
apps/
├── core/
│   ├── models.py          # Database models
│   ├── admin.py           # Admin configuration
│   ├── apps.py            # App config
│   └── __init__.py
├── api/
│   ├── views.py           # API views/viewsets
│   ├── serializers.py     # DRF serializers
│   ├── urls.py            # API routing
│   ├── apps.py
│   └── __init__.py
└── auth_app/
    ├── views.py           # Auth views
    ├── urls.py            # Auth routing
    ├── apps.py
    └── __init__.py

config/
├── settings.py            # Django settings
├── urls.py                # Main URL routing
├── wsgi.py                # Production WSGI
├── asgi.py                # WebSocket support
└── __init__.py
```

---

## Common Patterns

### Filtering by Current User
```python
def get_queryset(self):
    return MyModel.objects.filter(user=self.request.user)
```

### Custom Permissions
```python
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
```

### Pagination
```python
# Already configured in settings.py
# Automatically paginated with ?page=1&page_size=20
```

### Error Handling
```python
from rest_framework.response import Response
from rest_framework import status

return Response(
    {'error': 'Not found'},
    status=status.HTTP_404_NOT_FOUND
)
```

---

## Environment Variables

### Development
```env
DEBUG=True
SECRET_KEY=dev-key-not-secure
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Production
```env
DEBUG=False
SECRET_KEY=<generate-new-secure-key>
ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

---

## Testing

### Create a Test File
```python
# apps/core/tests.py
from django.test import TestCase
from apps.core.models import MyModel

class MyModelTestCase(TestCase):
    def setUp(self):
        MyModel.objects.create(name="Test")
    
    def test_model_creation(self):
        obj = MyModel.objects.get(name="Test")
        self.assertEqual(obj.name, "Test")
```

### Run Tests
```bash
python manage.py test apps.core
```

---

## Debugging

### Django Shell
```bash
python manage.py shell

# Inside shell:
from apps.core.models import MyModel
obj = MyModel.objects.first()
print(obj)
```

### Print Queries
```python
from django.db import connection
from django.test.utils import CaptureQueriesContext

with CaptureQueriesContext(connection) as context:
    # Your code here
    pass

print(context.captured_queries)
```

### Logging
```python
import logging
logger = logging.getLogger(__name__)

logger.info("Info message")
logger.error("Error message")
```

---

## Deployment Checklist

- [ ] Set `DEBUG=False`
- [ ] Generate new `SECRET_KEY`
- [ ] Set `ALLOWED_HOSTS` to your domain
- [ ] Configure database (PostgreSQL recommended)
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Run `collectstatic`
- [ ] Set up environment variables
- [ ] Run migrations on production
- [ ] Set up logging
- [ ] Configure backups
- [ ] Set up monitoring

---

## Useful Resources

- Django Docs: https://docs.djangoproject.com/
- DRF Docs: https://www.django-rest-framework.org/
- Django Best Practices: https://docs.djangoproject.com/en/stable/intro/
- Spotipy Docs: https://spotipy.readthedocs.io/
- OpenAI Docs: https://platform.openai.com/docs/

---

## Quick Troubleshooting

### Port Already in Use
```bash
python manage.py runserver 8001
```

### Database Locked
```bash
rm db.sqlite3
python manage.py migrate
```

### Import Errors
```bash
# Make sure you're in the right directory
cd /path/to/playlist-manager
source venv/bin/activate
```

### Missing Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push to remote
git push origin feature/my-feature

# Create pull request on GitHub
```

---

## Performance Tips

1. Use `select_related()` for ForeignKey
2. Use `prefetch_related()` for reverse relations
3. Add database indexes for frequently queried fields
4. Cache expensive queries
5. Use pagination for large datasets
6. Monitor database queries in development

---

## Security Best Practices

1. Never commit `.env` file
2. Use environment variables for secrets
3. Enable HTTPS in production
4. Set `SECURE_SSL_REDIRECT=True`
5. Use strong `SECRET_KEY`
6. Validate all user input
7. Use Django's built-in security features
8. Keep dependencies updated

---

**Happy coding! 🚀**

