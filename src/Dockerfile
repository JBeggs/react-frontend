FROM node:22-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install --force

COPY . /app/frontend/

CMD ["npm", "start"]