-- CreateEnum
CREATE TYPE "CatStatus" AS ENUM ('available', 'adopted', 'deceased');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'unknown');

-- CreateEnum
CREATE TYPE "DiaryType" AS ENUM ('sterilization', 'medical', 'feeding', 'offline_event', 'adoption', 'daily', 'other');

-- CreateTable
CREATE TABLE "Cat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CatStatus" NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" TEXT,
    "color" TEXT,
    "location" TEXT,
    "description" TEXT NOT NULL,
    "personality" TEXT,
    "healthStatus" TEXT,
    "sterilized" BOOLEAN NOT NULL DEFAULT false,
    "dewormed" BOOLEAN NOT NULL DEFAULT false,
    "friendly" BOOLEAN,
    "adoptionRequirements" TEXT,
    "rescueRecord" TEXT,
    "medicalRecord" TEXT,
    "images" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "DiaryType" NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "videoUrl" TEXT,
    "images" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiaryPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "diaryPostId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_diaryPostId_fkey" FOREIGN KEY ("diaryPostId") REFERENCES "DiaryPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
