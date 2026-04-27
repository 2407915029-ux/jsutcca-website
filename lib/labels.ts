import type { CatStatus, DiaryType, Gender } from "@prisma/client";

export const catStatusLabels: Record<CatStatus, string> = {
  available: "待领养",
  adopted: "已领养",
  deceased: "已去世"
};

export const genderLabels: Record<Gender, string> = {
  male: "男孩",
  female: "女孩",
  unknown: "未知"
};

export const diaryTypeLabels: Record<DiaryType, string> = {
  sterilization: "绝育",
  medical: "就医",
  feeding: "喂养",
  offline_event: "线下活动",
  adoption: "领养",
  daily: "日常",
  other: "其他"
};

export const catStatuses = Object.entries(catStatusLabels).map(([value, label]) => ({
  value,
  label
}));

export const diaryTypes = Object.entries(diaryTypeLabels).map(([value, label]) => ({
  value,
  label
}));
