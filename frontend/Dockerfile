FROM node
WORKDIR /fronend
COPY . .
RUN npm i 
RUN npm run export
# CMD ["ls","&&","npm","start"]
EXPOSE 80