FROM node:18-alpine3.18 AS Builder

WORKDIR /app
COPY package.json package-lock.json ./

COPY index.html ./
COPY vite.config.js ./
COPY public/ public/
COPY src/ src/
RUN npm ci
RUN npm run build

FROM nginx:1.25.1 as PROD
COPY nginx-conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /app/dist /usr/share/nginx/html

# RUN touch /var/run/nginx.pid
# RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
# USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]