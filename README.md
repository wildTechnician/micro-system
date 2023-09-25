<div align=center><img src="./packages/core/src/assets/images/logo.png" width="20%"></div>

<div align=center>
<img src="https://img.shields.io/badge/author-xj-green" alt="npm version" />
<a href="https://gitee.com/Monkey_man/webpack-init"><img src="https://gitee.com/Monkey_man/webpack-init/badge/star.svg?theme=dark" alt="coverage" /></a>
<img src="https://img.shields.io/node/v/pnpm" alt="npm downloads" />
<img src="https://img.shields.io/npm/types/qiankun" alt="build status" />
<img src="https://img.shields.io/gitlab/coverage/xiaoju/davido-firedetection/develop" alt="dumi" />

</div>

# <div align=center>**MicroPackages**</div>

[wujie](https://wujie-micro.github.io/)微服务（Micro） [vite](https://cn.vitejs.dev/)脚手架（APP）[pnpm](https://www.pnpm.cn/)包管理器（MonoRepo）

完美融合成一套多项目解决方案。复杂项目中数据共享困难、项目维护难度大、代码重复率高....就是这么简单解决。

## &#x23F3;Install

> **项目安装前请检查 `pnpm` 是否安装,已安装可跳过`2`步骤**

1. 克隆项目

```shell
git clone -b develop http://192.168.0.201:10000/xiaoju/davido-firedetection.git
```

2. 安装`pnpm`

```shell
npm install -g pnpm
```

3. 安装依赖

```shell
cd davido-firedetection && pnpm install
```

## &#x1F680;Usage

| 项目名                   | 默认端口 | 说明       | 启动     |
| ------------------------ | -------- | ---------- | -------- |
| &#x2705; app-core        | 7766     | 项目入口   | 必须启动 |
| &#x25FB; app-system      | 7790     | 系统管理   | 按需启动 |
| &#x25FB; app-visualizer  | 7788     | 可视化展板 | 按需启动 |
| &#x25FB; app-form-create | 8080     | 低代码平台 | 按需启动 |
| &#x274E; utils-common    | -        | 公共库     | 无需启动 |
| &#x274E; utils-cesium    | -        | 地图       | 无需启动 |
| &#x274E; utils-icon      | -        | 图标库     | 无需启动 |
| &#x274E; utils-form      | -        | formily    | 无需启动 |
| &#x25FB; utils-mock      | 7700     | mock       | 按需启动 |

### 新增子系统

1. 在`packages`文件夹内新建文件夹`xxx`
2. 复制根目录`_example`文件夹内所有文件至`packages->xxx`文件夹内
3. 修改`package.json`项目名称:

```json
{
  "name": "xxx",

  // ...

  "dependencies": {
    // 引入公共依赖库
    "@monorepo/common": "workspace:^"
  }
}
```

1. 修改端口

```javascript
// build/webpack.dev.js

// ...
devServer: {
  host: "0.0.0.0",
  port: "xxxx",
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/dev": {
      target: process.env.APP_REPO_BASE_URL,
      pathRewrite: {
        "^/dev": ""
      },
    }
  },
// ...
```

> 此端口只针对开发环境，生产环境可根据 nginx、apache 等服务器重新设置端口

5. 重新初始化项目、启动项目

```shell
# root directory
pnpm install
```

6. 在`系统管理->路由管理`中添加系统并且配置路由

### 项目依赖安装

- 包内依赖:

  ```shell
  pnpm add [-D] vue-router --filter @monorepo/xxx
  ```

- 全局依赖：

  ```shell
  pnpm add [-D] vue-router -w
  ```

## &#x1F4AA; Config

### 环境配置

在每个子项目根目录中存在`.env.`文件，此文件为环境配置文件,默认添加 4 种环境，也可自由添加环境，方法如下

1. 在项目根目录创建`.env.环境`文件
2. 重新启动项目
3. 项目中通过`process.env`获取。具体参考[vue-cli](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

> **env 文件内变量名必须以`APP_REPO_`开头: `APP_REPO_BASE_URL='url'`;**

> **<font color="red">开发环境下请求通过`@monorepo/core`应用内环境配置文件的域名发送，除开发环境下其他环境打包后通过各自项目内环境配置文件的域名发送。</font>**

## &#x1F55B; Build

```shell
# root directory
# NODE_ENV=development|production|feature|acceptance|....

NODE_ENV=production pnpm build
```

## &#x1F31A;Nginx

## &#x1F45C;Docker

## &#x1F357;Git

- [20220228](./_doc/Git.md)

## &#x1F308;FAQ

- [Mac Chrome 打开 HTTPS 证书错误问题]('http://t.zoukankan.com/snandy-p-3262661.html')【证书在`_nginx`目录下】
- [window 系统下打包命令报错](https://blog.csdn.net/Qing_X_C/article/details/115914259)
