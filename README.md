# ServerPapers-Web

## 描述

ServerPapers是一个简单的主机数据监听面板。本项目为SeverPapers的Web端，用于在前端展示相应数据。

## 注意

此项目与旧版本（即JS版本的客户端、服务端）不兼容，请搭配正确的版本使用。

本项目仅前端页面，需要单独Web服务器进行部署（如Nginx）。

## 使用

![login](https://img.picui.cn/free/2024/10/12/670a9794bf912.png)

在登陆界面输入服务端URL、用户名、Token即可。对于Token，应当选择与服务器一致的Hash算法。
数据加密依赖于HTTPS协议，如果使用HTTP协议则会以明文发送（Token是经过Hash运算过的，但这并不能保证数据的机密性）。

登陆界面的`Auth`在HTTP模式下无效，但是在HTTPS模式下会拒绝未经认证的服务器。
如果使用HTTPS和自签名证书，而且浏览器未安装证书的话，关闭`Auth`即可解决连接报错问题，但是这一行为可能导致你收到中间人攻击。

## 运行项目

首先安装相应依赖，本项目使用yarn包管理器

```sh
npm install -g yarn
yarn install
```

### 开发环境

开发环境使用vite自带命令进行运行即可：

```sh
yarn run dev
```

### 部署

执行命令来打包

```sh
yarn run build
```

执行完毕后，生成的文件在`./dist`下，将该目录下的文件部署到HTTP服务器即可。

## 客户端&服务端

服务端地址：[Github-ServerPapers](https://github.com/cairbin/ServerPapers)
客户端地址：[Github-ServerPapers-Client](https://github.com/cairbin/ServerPapers-Client)

## 其它

如果你想要开发其他应用来接收数据，只需要使用SocketIO客户端框架，向服务端发送`hello`事件，然后监听`clientInfo`事件获取携带的数据即可，至于消息格式，请参考服务端的说明。