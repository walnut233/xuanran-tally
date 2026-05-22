<p align="center">
  <a href="https://github.com/DaMaiCoding/uni-plus">
    <img width="160" src="./src/static/local/logo.png">
  </a>
</p>

<h1 align="center">
  <b>一个 “超超超” 好用的 uniapp 开发模板</b>
</h1>

`uni-plus` 提供了 `layout布局`、`请求封装`、`请求拦截`、`权限控制`、`原子CSS`、`路由拦截`、`路由自动导入` 等基础功能，并且配备了 `代码提示`、`代码高亮`、`代码格式化`、`commit 优化` 等开发环境配置，让您的开发更加高效、便捷。

<p align="center">
  <a href="https://damaicoding.github.io/uni-plus-doc/" target="_blank">📓 文档地址</a>
  <span style="margin:0 10px;">|</span>
  <a href="https://damaicoding.github.io/uni-plus/" target="_blank">🌰 预览地址</a>
</p>

| H5  | IOS | 安卓 | 微信小程序 | 字节小程序 | 快手小程序 | 支付宝小程序 | 钉钉小程序 | 百度小程序 |
| --- | --- | ---- | ---------- | ---------- | ---------- | ------------ | ---------- | ---------- |
| ✔️  | ✔️  | ✔️   | ✔️         | ✔️         | ✔️         | ✔️           | ✔️         | ✔️         |

## ☘️ 环境配置

- Node.js 20+
- Pnpm 9+
- Vue3 3.4+
- TypeScript 4.9+

## 🦈 mock 配置

这个 `mock` 项目主要为 `demo` 分支的案例，提供 `mock` 数据

如果你不下载这个 `mock` 项目来提供数据的话，里面请求部分的案例，将无法正常显示数据

- [`mock` 项目地址（`github`）](https://github.com/DaMaiCoding/uni-plus-mock)

- [`mock` 项目地址（`gitee`）](https://gitee.com/DaMaiCoding/uni-plus-mock)

```shell
# mock 项目下载下来后，执行下面命令运行即可
pnpm i
pnpm start:dev
```

## 🎯 快速开始

```bash
pnpm create uni-plus my-project # my-project 为项目名称
pnpm i # 安装依赖
pnpm dev:h5 # 启动 h5 开发环境
```

## 📦 运行方式

- 推荐使用 `VScode` 进行开发，因为本模板已经配置好了 `VScode` 的开发环境，包括代码格式化、代码提示、代码高亮、插件等
- `Vscode` 开发的话，非 `h5` 的情况下，执行 `pnpm dev:mp-weixin` 然后打开微信开发者工具，导入 `dist/dev/mp-weixin` 文件，其他平台类似
- 如果你使用 `HBuilderX` 开发，直接打开项目，鼠标选中项目文件文件，然后点击 运行 -> 允许到小程序模拟器，然后选择对应的平台即可

## 😄 维护者

[大麦大麦（DaMaiCoding）](https://github.com/DaMaiCoding)

## 📄 许可证

完全免费开源

[MIT © 2024-present, 大麦大麦（DaMaiCoding）](./LICENSE)

## 🤔 如何贡献

非常欢迎您的加入！[提一个 Issue](https://github.com/DaMaiCoding/uni-plus/issues) 或者提交一个 `Pull Request`

**Pull Request:**

1. `Fork` 代码到自己的项目下，不要直接在仓库下建分支
2. 请选择 `dev` 分支，进行 `PR`
3. 提交 `PR` 前请 `rebase`，确保 `commit` 记录的整洁
4. 注意 `commit` 信息规范，要以 `emoji type: 描述信息` 的形式填写，注意 `type` 得是下面规范之中的一个
5. 示例 `commit` 信息：`🐞 fix: 修复 无感刷新 重试失败问题`
6. 可以使用项目中的 `pnpm cz` 进行 `commit` 提交，这样就会默认为 `type` 前面添加 `emoji`
7. 等待作者 `review` 通过后，即可合并

## ⌛ Git 贡献提交规范

参考 [历史提交记录](https://github.com/DaMaiCoding/uni-plus/commits/dev)

- `✨ feat` 新增功能
- `🐞 fix` 修复 bug
- `📃 docs` 文档变更
- `🌈 style` 代码格式（仅仅修改了空格、缩进、逗号等等，不改变代码逻辑）
- `🦄 refactor` 代码重构，没有加新功能或修复 bug
- `🎈 perf` 代码优化，比如提升性能、体验
- `🔧 build` 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)
- `🐳 chore` 对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)
- `⏳️ workflow` 工作流程改进

## ⭐ Star

非常感谢留下星星的 `小哥哥 、小姐姐`，感谢您的支持 ❤

[![Stargazers repo roster for @DaMaiCoding/uni-plus](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=DaMaiCoding&repo=uni-plus)](https://github.com/DaMaiCoding/uni-plus/stargazers)
