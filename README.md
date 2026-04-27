# 江理工喵喵队

江理工喵喵队是一个校园流浪猫公益网站，包含访客浏览端和管理员后台。访客可以浏览猫咪、活动日记、捐款方式和公益周边；管理员可以维护猫咪档案、活动日记、图片、视频和评论。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Vercel
- Cloudinary 图片存储
- JWT + httpOnly Cookie 管理员登录

## 本地开发

正式版本默认使用 PostgreSQL，不再使用 SQLite，也不依赖本地 `/uploads` 保存图片。

1. 安装依赖

```bash
npm install
```

2. 创建 `.env`

复制 `.env.example` 为 `.env`，填写自己的配置：

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="请设置一个强密码"
JWT_SECRET="请设置至少32位随机字符串"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
```

不要把 `.env` 上传到 GitHub。

3. 检查 Prisma schema

```bash
npx prisma validate
```

4. 本地开发迁移数据库

```bash
npx prisma migrate dev
```

5. 写入示例数据，仅本地或测试环境使用

```bash
npx prisma db seed
```

不要在生产环境自动运行 seed。

6. 启动开发环境

```bash
npm run dev
```

访问地址：

```txt
用户端：http://localhost:3000
管理员端：http://localhost:3000/admin/login
```

## 生产部署命令

生产环境只运行 migration，不使用 `prisma db push`，也不自动运行 seed。

```bash
npm install
npx prisma migrate deploy
npm run build
```

## 管理员安全

- 管理员账号密码来自环境变量。
- 密码不要写死在代码里。
- 正式上线前请设置强密码和足够长的 `JWT_SECRET`。
- 登录成功后使用 httpOnly Cookie 保存 JWT。
- Cookie 在生产环境会启用 `secure: true`，并设置 `sameSite: "lax"`。
- `/admin` 页面需要登录。
- `/api/admin/*` 接口需要登录。

## 图片和视频

- 猫咪图片和活动日记图片保存为 PostgreSQL `String[]`。
- 管理员后台支持 Cloudinary 上传图片，上传后只保存 Cloudinary 返回的 `secure_url`。
- 图片字段也保留手动输入 URL 的备用方式，一行一个 URL。
- 活动日记支持 `videoUrl`。
- `.mp4` 直链使用播放器展示。
- Bilibili 和 YouTube 链接会转为 iframe 展示。
- 无法识别的视频链接会显示为外部链接。

## 项目结构

```txt
app/
  api/                 API 路由
  cats/                猫咪列表和详情
  diary/               活动日记列表和详情
  donate/              捐款途径
  shop/                周边商品
  admin/               管理员后台
components/            通用组件、后台表单、Cloudinary 上传控件
lib/                   Prisma、鉴权、校验、视频解析、Cloudinary 签名
prisma/
  migrations/          Prisma migration 文件
  schema.prisma        PostgreSQL 数据模型
  seed.ts              示例数据
public/                favicon 和占位图片
DEPLOYMENT.md          Vercel 上线部署说明
```

## 不要提交到 GitHub 的文件

这些文件已经写入 `.gitignore`：

```txt
.env
.env.local
node_modules
.next
dev.db
*.db
prisma/dev.db
```

`.env.example` 可以提交，它只放示例配置，不放真实密码、数据库地址或 API Secret。

## 常用命令

```bash
npm run dev
npm run build
npm run lint
npx prisma validate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma db seed
```

## 上线前验收清单

- [ ] 首页能打开
- [ ] 猫咪列表能打开
- [ ] 猫咪详情能打开
- [ ] 捐款页面能打开
- [ ] 周边商品页面能打开
- [ ] 活动日记列表能打开
- [ ] 活动日记详情能打开
- [ ] 点赞功能正常
- [ ] 评论功能正常
- [ ] 管理员可以登录
- [ ] 管理员可以新增猫咪
- [ ] 管理员可以编辑猫咪
- [ ] 管理员可以删除猫咪
- [ ] 管理员可以新增活动日记
- [ ] 管理员可以编辑活动日记
- [ ] 管理员可以删除活动日记
- [ ] 管理员可以删除评论
- [ ] 图片可以正常显示
- [ ] 视频可以正常显示
- [ ] 手机端浏览正常
- [ ] Vercel 部署成功
- [ ] 域名绑定成功
