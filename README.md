<div align=center><img src="./packages/core/src/assets/images/logo.png" width="20%"></div>

<div align=center>
<img src="https://img.shields.io/badge/author-xj-green" alt="npm version" />
<img src="https://img.shields.io/node/v/pnpm" alt="npm downloads" />
<img src="https://img.shields.io/npm/types/qiankun" alt="build status" />
</div>
![GitHub Repo stars](https://img.shields.io/github/stars/wildTechnician/micro-system)
# <div align=center>**MicroPackages**</div>

[wujie](https://wujie-micro.github.io/)微服务（Micro） [vite](https://cn.vitejs.dev/)脚手架（APP）[pnpm](https://www.pnpm.cn/)包管理器（MonoRepo）

## &#x23F3;使用

> **项目安装前请检查 `pnpm` 是否安装,已安装可跳过`2`步骤**

1. 克隆项目

```shell
git clone https://github.com/wildTechnician/micro-system.git
```

2. 安装`pnpm`

```shell
npm install -g pnpm
```

3. 安装依赖

```shell
cd micro-system && pnpm install
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

## &#x1F55B; Build

## &#x1F31A;Nginx

## &#x1F45C;Docker

## &#x1F308;FAQ
