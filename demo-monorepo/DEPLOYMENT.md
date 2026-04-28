# Deployment Guide

## Prerequisites

- Ubuntu 20.04 LTS or later
- Docker & Docker Compose
- Node.js 18+
- PostgreSQL 12+
- NVIDIA Triton Server

## Quick Deployment with Docker Compose

### 1. Clone Repository

```bash
git clone https://github.com/aa-matrix/platform.git
cd AA-MATRIX-2026
```

### 2. Configure Environment

```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit with your production values
nano backend/.env
```

### 3. Generate SSL Certificates (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d api.aa-matrix.com

# Copy to docker volume
sudo cp /etc/letsencrypt/live/api.aa-matrix.com/fullchain.pem ./certs/
sudo cp /etc/letsencrypt/live/api.aa-matrix.com/privkey.pem ./certs/
sudo chown 1000:1000 ./certs/*
```

### 4. Start Services

```bash
# Build and start all services
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 5. Initialize Database

```bash
# Run migrations
docker-compose exec backend npm run migrate

# Create admin user (optional)
docker-compose exec backend npm run seed:admin
```

## Manual Deployment

### Backend Setup (Ubuntu)

```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Create app user
sudo useradd -m -s /bin/bash aa-matrix
sudo su - aa-matrix

# Clone repository
git clone https://github.com/aa-matrix/platform.git
cd AA-MATRIX-2026/backend

# Install dependencies
npm ci --production

# Configure environment
cp .env.example .env
nano .env
```

### Install PM2 Process Manager

```bash
sudo npm install -g pm2

# Start backend
pm2 start src/index.js --name aa-matrix-api
pm2 startup
pm2 save
```

### Nginx Reverse Proxy

```bash
sudo apt-get install nginx

# Create config
sudo nano /etc/nginx/sites-available/aa-matrix-api

# Add configuration (see below)

# Enable site
sudo ln -s /etc/nginx/sites-available/aa-matrix-api /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

**Nginx Configuration:**
```nginx
upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name api.aa-matrix.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.aa-matrix.com;

    ssl_certificate /etc/letsencrypt/live/api.aa-matrix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.aa-matrix.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 50M;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
```

### Web App Deployment

**Option 1: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd web
vercel --prod
```

**Option 2: Netlify**

```bash
cd web
npm run build
# Drag and drop dist/ folder to Netlify
```

**Option 3: Self-hosted**

```bash
# Build
cd web
npm run build

# Serve with static server
npm install -g serve
serve -s dist -l 3000
```

### Mobile App Deployment

#### iOS (App Store)

```bash
cd mobile

# Build for iOS
npm run build-ios

# Create archive
xcodebuild -workspace ios/AAMatrix.xcworkspace \
  -scheme AAMatrix \
  -configuration Release \
  -archivePath ios/build/AAMatrix.xcarchive \
  archive

# Export for App Store
xcodebuild -exportArchive \
  -archivePath ios/build/AAMatrix.xcarchive \
  -exportOptionsPlist ios/ExportOptions.plist \
  -exportPath ios/build/ipa

# Upload to App Store (using Transporter)
```

#### Android (Google Play)

```bash
cd mobile

# Generate keystore
keytool -genkey -v -keystore android/app/upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload-key

# Build release APK
cd android && ./gradlew assembleRelease

# Build App Bundle for Play Store
./gradlew bundleRelease

# Upload to Google Play Console
```

## Database Setup

### PostgreSQL Installation

```bash
# Ubuntu
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb aa_matrix
sudo -u postgres createuser -P aa_matrix_user

# Set permissions
sudo -u postgres psql
\c aa_matrix
GRANT ALL PRIVILEGES ON DATABASE aa_matrix TO aa_matrix_user;
```

### Create Tables

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inference results table
CREATE TABLE inference_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255),
    classification VARCHAR(50) NOT NULL,
    confidence DECIMAL(5, 2),
    model_version VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Create indexes for performance
CREATE INDEX idx_inference_user_date ON inference_results(user_id, created_at DESC);
CREATE INDEX idx_inference_classification ON inference_results(classification);
```

## Monitoring

### Application Monitoring

```bash
# View logs
pm2 logs aa-matrix-api

# Monitor resources
pm2 monit

# Setup log rotation
pm2 install pm2-logrotate
```

### Database Monitoring

```bash
# Connect to PostgreSQL
psql -U aa_matrix_user -d aa_matrix

# Check active queries
SELECT * FROM pg_stat_statements;

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema');
```

### System Monitoring

```bash
# Install Prometheus (optional)
sudo apt-get install prometheus

# Install Grafana (optional)
sudo apt-get install grafana-server

# View server metrics
free -h          # Memory
df -h            # Disk space
htop             # System processes
```

## Backup & Restore

### Database Backup

```bash
# Full backup
pg_dump -U aa_matrix_user aa_matrix > backup-$(date +%Y%m%d).sql

# Restore
psql -U aa_matrix_user aa_matrix < backup-20240115.sql
```

### Application Backup

```bash
# Backup uploads
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/

# Backup database and configs
tar -czf aa-matrix-backup-$(date +%Y%m%d).tar.gz \
  backend/.env \
  backend/uploads \
  postgres_data
```

### Automated Backups

```bash
# Create backup script
cat > /home/aa-matrix/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/aa-matrix"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
pg_dump -U aa_matrix_user aa_matrix | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Files backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /app/uploads

# Keep last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
EOF

chmod +x /home/aa-matrix/backup.sh

# Schedule with cron (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /home/aa-matrix/backup.sh
```

## Scaling

### Horizontal Scaling

```bash
# Scale backend services
docker-compose up -d --scale backend=3

# Configure load balancer (Nginx)
upstream backend {
    server backend:5000;
    server backend:5001;
    server backend:5002;
}
```

### Database Optimization

```sql
-- Enable connection pooling with PgBouncer
-- Edit pgbouncer.ini
[databases]
aa_matrix = host=localhost port=5432 dbname=aa_matrix

-- Restart PgBouncer
pgbouncer -d -R /etc/pgbouncer/pgbouncer.ini
```

## Security Checklist

- [ ] HTTPS enabled with SSL certificates
- [ ] Firewall configured
- [ ] SSH key-based authentication
- [ ] Regular security updates
- [ ] Database encryption
- [ ] Backup encryption
- [ ] API rate limiting
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Secrets not in version control
- [ ] Regular penetration testing
- [ ] Monitoring and alerting setup

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Check port
sudo netstat -tlnp | grep 5000

# Restart
docker-compose restart backend
```

### Database connection error
```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Check credentials
docker-compose exec postgres psql -U aa_matrix_user -d aa_matrix
```

### SSL certificate issues
```bash
# Check certificate
openssl x509 -in /etc/letsencrypt/live/api.aa-matrix.com/fullchain.pem -text -noout

# Renew certificate
sudo certbot renew --force-renewal
```

## Maintenance

### Regular Tasks

- Daily: Monitor logs and system resources
- Weekly: Review performance metrics
- Monthly: Update dependencies and security patches
- Quarterly: Load testing and capacity planning
- Annually: Security audit

## Support

For deployment help:
- Documentation: https://docs.aa-matrix.com
- Issues: https://github.com/aa-matrix/platform/issues
- Email: deployment@aa-matrix.com
