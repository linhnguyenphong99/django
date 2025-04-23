from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    try:
        # Get data from request
        email    = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create(
            email    = email,
            username = username,
            password = make_password(password),
        )

        # Generate token
        token = Token.objects.create(user=user)

        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    try:
        email    = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user:
            # Generate new token
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user': {
                    'email'   : user.email,
                    'email': user.email,
                }
            })
        else:
            print(user)
            return Response({'error': email , 'pass': password}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
