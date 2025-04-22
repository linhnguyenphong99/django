from django.db import models

class User(models.Model):
    # Identity
    email    = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    name     = models.CharField(max_length=255)
    password = models.CharField(max_length=128)

class ProfileInfo(models.Model):
    # Profile Info
    avatar      = models.URLField(blank=True, null=True)
    cover_photo = models.URLField(blank=True, null=True)
    bio         = models.TextField(blank=True)
    gender      = models.CharField(max_length=20, blank=True, choices=[
        ('male', 'Male'), ('female', 'Female'),
        ('other', 'Other'), ('prefer_not_to_say', 'Prefer not to say')
    ])
    date_of_birth = models.DateField(blank=True, null=True)

class ContactInfo(models.Model):
    # Contact & Location
    phone_number  = models.CharField(max_length=20, blank=True)
    country       = models.CharField(max_length=2, blank=True)
    state         = models.CharField(max_length=100, blank=True)
    city          = models.CharField(max_length=100, blank=True)
    zip_code      = models.CharField(max_length=20, blank=True)
    address_line1 = models.CharField(max_length=255, blank=True)
    address_line2 = models.CharField(max_length=255, blank=True)
    timezone      = models.CharField(max_length=100, blank=True)

class SocialInfo(models.Model):
    # Social
    website_url  = models.URLField(blank=True)
    social_links = models.JSONField(blank=True, null=True)  # ex: { "facebook": "...", ... }
    interests    = models.TextField(blank=True)
    language     = models.CharField(max_length=10, default='en')
    theme        = models.CharField(max_length=10, choices=[('light', 'Light'), ('dark', 'Dark')], default='light')

class SystemInfo(models.Model):
    # System Fields
    is_active         = models.BooleanField(default=True)
    is_staff          = models.BooleanField(default=False)
    last_login        = models.DateTimeField(blank=True, null=True)
    email_verified_at = models.DateTimeField(blank=True, null=True)
    login_count       = models.IntegerField(default=0)
    role              = models.CharField(max_length=50, default='user')
