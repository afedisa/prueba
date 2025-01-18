# base stage to have npm installed
FROM node:20.11.0-alpine AS base
RUN npm install -g npm@6.14.11
# development stage
FROM base AS development 
# ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
COPY .env ./ 
RUN npm install
COPY . .
RUN npm run build ${APP} 

# production stage
FROM base AS production 
# ARG APP 
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
COPY .env ./ 
RUN npm install --prod
COPY --from=development /usr/src/app/dist ./dist 
 
# Add an env to save ARG
# ENV APP_MAIN_FILE=dist/${APP}/main 
ENV APP_MAIN_FILE=dist/main 
CMD node ${APP_MAIN_FILE}