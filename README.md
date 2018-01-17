# Qiniu-upload

[![Greenkeeper badge](https://badges.greenkeeper.io/lleohao/qiniu-upload.svg)](https://greenkeeper.io/)

> 基于Electron和七牛的图片上传工具
>
> GIF预览效果不好, 可以查看[视频预览](http://ofwqfk202.bkt.clouddn.com/qiniu-upload.webm)

![预览](http://ofwqfk202.bkt.clouddn.com/qiniu-upload.gif)

[下载地址](https://github.com/lleohao/qiniu-upload/releases/download/v1.0.1/Upload-1.0.1.dmg)  [国内下载地址](http://ofwqfk202.bkt.clouddn.com/Upload-1.0.1-mac.zip)



### 软件界面

1. 未进行任何设置时会自动跳转至设置界面

   ![设置界面](http://ofwqfk202.bkt.clouddn.com/qiniu-upload-setting.png)

   > AccessKey/SecretKey 在七牛个人中心/密钥管理
   >
   > 空间名称/空间域名 在对应的存储空间列表中, 域名设置时需要带上对应的协议(http:// 或 https://)
   >
   > **设置完成后将鼠标放置在软件顶部会出现返回图标, 点击后返回上传界面**

2. 上传界面

   ![上传界面](http://ofwqfk202.bkt.clouddn.com/qiniu-upload-main.png)

   > 可以拖拽文件上传或者点击 `browse` 进行文件选择

3. 上传结果页面

   ![结果页面](http://ofwqfk202.bkt.clouddn.com/qiniu-upload-result.png)

   > 上传过程中会有进度显示, 完成后进度条消失
   >
   > **点击文件名可以获取文件的外链地址**



### 如何参与开发

1. bug可以在Issues中提出
2. 功能需求也可以在Issues中提出
3. 自行开发流程
   1. fork 本项目, clone至本地
   2. 运行`yarn instll`安装依赖
   3. 运行`npm run watch:main`编译主进程相关代码
   4. 运行`npm run watch:renderer`编译渲染进程代码
   5. 运行`npm start`启动软件
   6. 开发完成后发送pr给我, **不要在master分支提交pr**



### 其他

觉得好用的话可否请开发者加个🍗或者来杯☕️

![money](http://ofwqfk202.bkt.clouddn.com/money.png)

