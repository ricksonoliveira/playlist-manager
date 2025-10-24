"""
Authentication views for Spotify OAuth and user management.
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from apps.core.models import UserProfile
from apps.api.serializers import UserSerializer, UserProfileSerializer


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register a new user."""
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not all([username, email, password]):
        return Response(
            {'error': 'Missing required fields: username, email, password'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    
    # Create user profile
    UserProfile.objects.get_or_create(user=user)
    
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Login user with email and password."""
    email = request.data.get('email')
    password = request.data.get('password')

    if not all([email, password]):
        return Response(
            {'error': 'Missing required fields: email, password'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Find user by email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Authenticate with username (Django's authenticate uses username)
    user = authenticate(request, username=user.username, password=password)

    if user is None:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)

    profile, created = UserProfile.objects.get_or_create(user=user)
    profile_serializer = UserProfileSerializer(profile)

    return Response({
        'user': UserSerializer(user).data,
        'profile': profile_serializer.data,
        'message': 'Login successful'
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user."""
    logout(request)
    return Response({'message': 'Logout successful'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Get current authenticated user."""
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    
    return Response({
        'user': UserSerializer(request.user).data,
        'profile': UserProfileSerializer(profile).data
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def spotify_callback(request):
    """Handle Spotify OAuth callback."""
    # This will be implemented when we integrate with Spotify OAuth
    return Response({'message': 'Spotify OAuth callback - coming soon'})

