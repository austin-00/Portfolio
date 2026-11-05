import os
from pathlib import Path
import dj_database_url # <-- Add this import
from dotenv import load_dotenv

# Load .env file for local development only
# (Railway will use system environment variables directly)
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = os.path.join(BASE_DIR.parent, '.env')
if os.path.exists(env_path):
    load_dotenv(env_path)

# --- SECURITY ---
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-fallback-key-for-build')
DEBUG = os.getenv('DJANGO_DEBUG', 'False') == 'True'

# Allow Railway's dynamic hostname or your custom domain
# The '*' is for the initial deploy. Tighten this once you have your domain.
ALLOWED_HOSTS = ['*']

# --- APPS ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'portfolio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# --- DATABASE ---
# Uses DATABASE_URL on Railway, falls back to SQLite locally
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# --- PASSWORD VALIDATION ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# --- INTERNATIONALIZATION ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- STATIC FILES ---
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_DIRS = [
    os.path.join(BASE_DIR.parent, 'css'),
    os.path.join(BASE_DIR.parent, 'js'),
]

# --- EMAIL ---
MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.console.EmailBackend',
    },
}

# --- CORS & CSRF ---
# Allow your frontend origins (Localhost + Railway domain)
CORS_ALLOW_ALL_ORIGINS = True # Change this to CORS_ALLOWED_ORIGINS later

# Trust requests coming from your frontend
# Add the Railway domain after you deploy (e.g., 'https://your-app.up.railway.app')
CSRF_TRUSTED_ORIGINS = [
    'http://127.0.0.1:5500', # Local Live Server
    'http://localhost:5500',
    'https://portfolio-production-a709.up.railway.app', # Railway domain
    'https://*.vercel.app',     # If you host frontend on Vercel
    'https://*.netlify.app',    # If you host frontend on Netlify
]

# --- PRODUCTION SECURITY (Only run these if DEBUG is False) ---
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True