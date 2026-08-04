FROM node:24-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

RUN printf '%s\n' \
  'server {' \
  '  listen 80;' \
  '  server_name _;' \
  '' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '' \
  '  location = /service-worker.js {' \
  '    add_header Cache-Control "no-cache, no-store, must-revalidate" always;' \
  '    add_header Pragma "no-cache" always;' \
  '    add_header Expires "0" always;' \
  '  }' \
  '' \
  '  location = /index.html {' \
  '    add_header Cache-Control "no-cache" always;' \
  '  }' \
  '' \
  '  location /assets/ {' \
  '    add_header Cache-Control "public, max-age=31536000, immutable" always;' \
  '    try_files $uri =404;' \
  '  }' \
  '' \
  '  location / {' \
  '    try_files $uri $uri/ /index.html;' \
  '  }' \
  '' \
  '  location = /health {' \
  '    access_log off;' \
  '    add_header Content-Type text/plain;' \
  '    return 200 "ok";' \
  '  }' \
  '}' \
  > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
