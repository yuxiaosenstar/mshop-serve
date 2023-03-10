FROM node:16
# Create app directory
WORKDIR /data/app
# 拷贝应用程序
COPY . .
VOLUME /data/app/public/upload/
RUN npm config set registry https://registry.npmmirror.com && npm install
# 暴露端口
EXPOSE 3000
# 运行命令
CMD [ "npm", "start" ]
