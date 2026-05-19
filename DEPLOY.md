# 部署说明 — 将本地项目发布到公网

下面包含三种常用方式：Vercel（推荐，零运维）、Netlify、以及 Docker 自托管。

1) Vercel（最快）
- 把项目推到 GitHub（或 GitLab/Bitbucket）。
- 在 Vercel 控制台新建项目，连接你的仓库。
- 构建命令：`npm run build`，发布目录：`dist`。
- 项目创建后，Vercel 会给出一个公网 URL（支持自定义域名与 HTTPS）。

2) Netlify
- 把项目推到 GitHub。
- 在 Netlify 新建站点，选择仓库并设置构建命令 `npm run build`，发布目录 `dist`。
- 添加 `netlify.toml`（已包含于仓库）以确保 SPA 路由重写。

3) Docker（自托管）
- 在服务器上确保安装了 Docker。
- 在仓库根目录构建镜像并运行：

```bash
docker build -t pharma-ai-mvp:latest .
docker run -d -p 80:80 pharma-ai-mvp:latest
```

访问服务器公网 IP 即可（请确保放通 80/443 端口并使用反向代理或负载均衡器以支持 HTTPS）。

实用提示
- 使用自定义域名时，请在域名服务商处添加 DNS 并在 Vercel/Netlify 控制台绑定域名，开启 HTTPS（自动托管证书）。
- 若需要 CI/CD：可添加 GitHub Actions 在 push 时自动构建并部署到自托管服务器或触发 Vercel 部署。 

快速开始（示例命令）

```bash
# 1. 提交代码
git init
git add .
git commit -m "initial deploy"
git remote add origin <your-repo-url>
git push -u origin main

# 2. 在本地构建以确认输出
npm ci
npm run build

# 3. 本地用 Docker 运行检查
docker build -t pharma-ai-mvp:latest .
docker run --rm -p 8080:80 pharma-ai-mvp:latest
# 然后打开 http://localhost:8080
```
