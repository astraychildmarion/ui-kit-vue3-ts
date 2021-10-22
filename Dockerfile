# build stage
FROM node:lts-alpine as build-stage

# ENV http_proxy http://172.17.9.1:3128
# ENV https_proxy http://172.17.9.1:3128

RUN mkdir /app
WORKDIR /app
COPY package.json .npmrc .yarnrc yarn.lock ./
RUN yarn install
COPY . .
RUN yarn deploy:package
RUN yarn deploy:storybook

# ENV http_proxy=
# ENV https_proxy=

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/storybookDist /usr/share/nginx/html

# ENV http_proxy=
# ENV https_proxy=

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
