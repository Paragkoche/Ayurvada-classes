FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json  ./

COPY . .

RUN npm install


RUN npm run db:generate
RUN npm run build

EXPOSE 8085

CMD npm run db:push && npm start