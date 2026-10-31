# Study Space

## GitHub Pages 托管

在 GitHub 仓库 Settings → Pages 中将 Source 设置为 GitHub Actions。推送到 main 后，`.github/workflows/pages.yml` 会测试并发布 `public` 目录，无需服务器或付费托管。

此仓库的预期网址为 `https://kai168168.github.io/-/`，只有 Pages 发布成功后才可访问。

轻量课程复习网站，使用原生 HTML、CSS 和 JavaScript，无运行时依赖。

## 开发

需要 Node.js（已使用 24.19.0 验证）。

```sh
cd /workspace/-
npm run dev
```

默认监听 3000 端口，可使用 `PORT=其他端口 npm run dev`。无需安装依赖或执行构建。

```sh
npm test
```

## 功能

- ENVIR 102：考试、项目。
- CHEM10：知识点梳理、实验、考试。
- EAP 101B：阅读材料、写作。
- 右侧竖向课程导航、课程搜索、21 项复习任务与进度记录。
- 笔记创建及删除，内容按纯文本安全呈现。
- 适配桌面和手机，手机右侧导航通过顶部菜单按钮展开。

清单内容是通用复习框架，尚未录入教师提供的课程材料。内容配置位于 `public/app.js` 中的 `courses` 数组。

笔记和进度保存在当前浏览器的 localStorage 中，不会同步至其他设备；清理浏览器数据会删除这些记录。不需要数据库、账户或 API 密钥。

## 云环境

使用现有检出目录，除非用户要求，不创建 Git worktree。恢复环境后需重新运行 `npm run dev`。启动后检查 `/`、`/style.css` 和 `/app.js` 均返回 HTTP 200。
