import { z } from "zod";

const optionalText = z.string().trim().optional().or(z.literal(""));

export const catSchema = z.object({
  name: z.string().trim().min(1, "请填写猫咪名字").max(40),
  status: z.enum(["available", "adopted", "deceased"]),
  gender: z.enum(["male", "female", "unknown"]),
  age: optionalText,
  color: optionalText,
  location: optionalText,
  description: z.string().trim().min(1, "请填写简介").max(1000),
  personality: optionalText,
  healthStatus: optionalText,
  sterilized: z.boolean().default(false),
  dewormed: z.boolean().default(false),
  friendly: z.boolean().nullable().optional(),
  adoptionRequirements: optionalText,
  rescueRecord: optionalText,
  medicalRecord: optionalText,
  images: z.array(z.string().trim().url("请输入有效图片 URL").or(z.literal("/placeholder-cat.svg")).or(z.literal(""))).default([])
});

export const diarySchema = z.object({
  title: z.string().trim().min(1, "请填写标题").max(80),
  type: z.enum(["sterilization", "medical", "feeding", "offline_event", "adoption", "daily", "other"]),
  summary: z.string().trim().min(1, "请填写摘要").max(240),
  content: z.string().trim().min(1, "请填写正文").max(10000),
  coverImage: z.string().trim().url("请输入有效封面图片 URL").optional().or(z.literal("")),
  videoUrl: z.string().trim().url("请输入有效视频链接").optional().or(z.literal("")),
  images: z.array(z.string().trim().url("请输入有效图片 URL").or(z.literal("/placeholder-diary.svg")).or(z.literal(""))).default([])
});

export const commentSchema = z.object({
  nickname: z.string().trim().max(30, "昵称最多 30 个字").optional(),
  content: z.string().trim().min(1, "评论内容不能为空").max(500, "评论最多 500 个字")
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码")
});
