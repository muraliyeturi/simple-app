FROM node:8
WORKDIR /app
COPY /prod-start.sh /app
COPY /build/. /app
CMD sh ./prod-start.sh
EXPOSE 3000