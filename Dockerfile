FROM node:10.13-alpine
ENV NODE_ENV production
ENV registry https://registry.npm.taobao.org
ENV SASS_BINARY_SITE https://npm.taobao.org/mirrors/node-sass/
# MAINTAINER GuoYan 410115424@qq.com
# WORKDIR /usr/src/app

RUN npm run install --production --silent
RUN npm run build
COPY ["package.json", "dist","static","./"]
EXPOSE 9000
CMD npm run server
