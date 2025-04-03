# Sử dụng Python 3.11
FROM python:3.11

# Đặt thư mục làm việc
WORKDIR /app

# Cài đặt các thư viện hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Sao chép file requirements.txt và cài đặt thư viện
COPY ../django_project/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn Django
COPY ../django_project /app

# Expose cổng 8000
EXPOSE 8000

COPY ../docker/gunicorn /docker/gunicorn

# Chạy lệnh khởi động Gunicorn
CMD ["python", "manage", "/docker/gunicorn/gunicorn.conf.py", "django_project.wsgi:application"]
