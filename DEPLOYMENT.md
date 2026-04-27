# 江理工喵喵队上线部署指南

这份文档按 Vercel + PostgreSQL + Cloudinary 编写，尽量用非程序员也能照着做的方式说明。

## 1. 创建 GitHub 仓库

1. 打开 GitHub。
2. 新建一个仓库，例如 `jiangligong-meow-team`。
3. 把当前项目上传到这个仓库。

不要上传这些文件：

```txt
.env
.env.local
dev.db
*.db
node_modules
.next
```

`.env.example` 可以上传，因为里面只能放示例，不能放真实密码。

## 2. 创建 PostgreSQL 数据库

推荐任选一个：

- Vercel Postgres
- Neon
- Supabase PostgreSQL
- Railway PostgreSQL

创建数据库后，找到数据库连接字符串，通常长这样：

```txt
postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
```

这个地址就是 `DATABASE_URL`。它包含数据库密码，不要发给别人，也不要提交到 GitHub。

## 3. 配置 Cloudinary

Cloudinary 用来保存猫咪图片、活动图片、商品图片和捐款二维码等静态图片。

1. 注册并登录 Cloudinary。
2. 在 Dashboard 找到：
   - Cloud name
   - API Key
   - API Secret
3. 如果你想使用 upload preset，可以进入：

```txt
Settings -> Upload -> Upload presets
```

创建一个 preset。当前项目使用服务端签名上传，`CLOUDINARY_API_SECRET` 只保存在服务端环境变量中，不会暴露到前端。`NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` 可以留空；如果填写 preset 名称，上传签名会一起包含它。

管理员上传图片时，浏览器会先请求受保护的 `/api/admin/cloudinary/signature` 获取签名，再上传到 Cloudinary。只有已登录管理员可以获取签名。

## 4. 在 Vercel 导入 GitHub 项目

1. 打开 Vercel。
2. 选择 Add New Project。
3. 选择你的 GitHub 仓库。
4. Framework Preset 选择 Next.js。
5. Build Command 保持默认或填写：

```bash
npm run build
```

项目的 build 脚本是：

```bash
prisma generate && next build
```

不会在 Vercel build 期间运行 seed。

## 5. 设置 Vercel 环境变量

进入 Vercel 项目：

```txt
Settings -> Environment Variables
```

添加以下变量：

```env
DATABASE_URL="你的 PostgreSQL 连接字符串"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="请设置一个强密码"
JWT_SECRET="请设置至少32位随机字符串"
NEXT_PUBLIC_SITE_URL="https://你的域名"
CLOUDINARY_CLOUD_NAME="你的 Cloudinary Cloud name"
CLOUDINARY_API_KEY="你的 Cloudinary API Key"
CLOUDINARY_API_SECRET="你的 Cloudinary API Secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
```

注意：

- `ADMIN_PASSWORD` 不要使用弱密码。
- `JWT_SECRET` 必须是随机长字符串。
- `CLOUDINARY_API_SECRET` 不能暴露到前端，也不能提交到 GitHub。
- 如果还没有正式域名，`NEXT_PUBLIC_SITE_URL` 可以先填 Vercel 分配的域名。

## 6. 运行数据库迁移

本项目已经包含 Prisma migration 文件。

本地开发使用：

```bash
npx prisma migrate dev
```

正式部署使用：

```bash
npx prisma migrate deploy
```

不要在生产环境使用：

```bash
npx prisma db push
```

不要在生产环境自动运行：

```bash
npx prisma db seed
```

如果你要从本地电脑连接线上数据库运行 migration：

1. 本地 `.env` 的 `DATABASE_URL` 临时改成线上 PostgreSQL 地址。
2. 运行：

```bash
npx prisma migrate deploy
```

3. 运行完成后，确认数据库表已创建。

## 7. 部署

环境变量设置完成后，回到 Vercel 项目页面点击 Deploy。部署成功后，你会得到一个 Vercel 地址，例如：

```txt
https://your-project.vercel.app
```

访问：

```txt
用户端：https://your-project.vercel.app
管理员端：https://your-project.vercel.app/admin/login
```

## 8. 绑定自定义域名

进入 Vercel 项目：

```txt
Settings -> Domains
```

添加你的域名，例如：

```txt
meow.example.com
```

根据 Vercel 提示去域名服务商设置 DNS。常见方式：

- 子域名使用 CNAME。
- 根域名按 Vercel 提示设置 A 记录或 nameserver。

域名生效后，把 Vercel 环境变量改成：

```env
NEXT_PUBLIC_SITE_URL="https://你的正式域名"
```

然后重新部署一次。

## 9. 测试管理员后台

部署完成后访问：

```txt
https://你的域名/admin/login
```

使用环境变量里的：

```txt
ADMIN_USERNAME
ADMIN_PASSWORD
```

登录后测试：

- 新增猫咪
- 上传猫咪图片
- 编辑猫咪
- 删除猫咪
- 新增活动日记
- 上传活动封面和正文图片
- 填写视频链接
- 删除评论

## 10. 图片和视频处理

图片：

- 推荐用 Cloudinary 上传。
- 上传成功后，系统只保存 Cloudinary 返回的 `secure_url`。
- 仍然可以手动输入图片 URL，一行一个。
- 不要依赖本地 `/uploads`，Vercel 的本地文件系统不适合长期保存用户上传图片。

视频：

- 活动日记可以填写视频链接。
- mp4 直链会用 `<video controls>` 播放。
- Bilibili 和 YouTube 链接会用 iframe 展示。
- 无法识别的视频链接会显示为普通外部链接。

## 11. 正式上线前验收清单

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
