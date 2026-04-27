import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.diaryPost.deleteMany();
  await prisma.cat.deleteMany();

  await prisma.cat.createMany({
    data: [
      {
        name: "橘子",
        status: "available",
        gender: "male",
        age: "约1岁",
        color: "橘猫",
        location: "图书馆附近",
        description: "亲人活泼，喜欢蹭腿，正在寻找稳定领养家庭。",
        personality: "亲人、活泼、爱吃",
        healthStatus: "健康",
        sterilized: true,
        dewormed: true,
        friendly: true,
        adoptionRequirements: "希望领养人稳定居住，接受定期回访。",
        rescueRecord: "由志愿者在图书馆附近持续喂养并完成基础体检。",
        medicalRecord: "已完成绝育、体内外驱虫。",
        images: ["/placeholder-cat.svg"]
      },
      {
        name: "奶盖",
        status: "adopted",
        gender: "female",
        age: "约2岁",
        color: "白橘",
        location: "宿舍区",
        description: "已被好心同学领养，现在生活稳定。",
        personality: "安静、黏人",
        healthStatus: "健康",
        sterilized: true,
        dewormed: true,
        friendly: true,
        images: ["/placeholder-cat.svg"]
      },
      {
        name: "小黑",
        status: "deceased",
        gender: "unknown",
        age: "未知",
        color: "黑猫",
        location: "教学楼附近",
        description: "曾经常出现在教学楼附近，感谢它陪伴过大家。",
        personality: "谨慎、温柔",
        healthStatus: "已离世",
        sterilized: false,
        dewormed: false,
        friendly: false,
        rescueRecord: "志愿者曾长期记录它的活动区域。",
        medicalRecord: "纪念页面保留给所有认识它的人。",
        images: ["/placeholder-cat.svg"]
      }
    ]
  });

  const diary = await prisma.diaryPost.create({
    data: {
      title: "图书馆橘猫绝育记录",
      type: "sterilization",
      summary: "本次帮助图书馆附近的橘猫完成绝育，并顺利放归。",
      content: "今天我们带橘子去完成了绝育手术。术后状态稳定，观察后已安全放归熟悉区域。\n\n后续志愿者会继续观察它的进食和活动情况，也感谢大家在现场给予的帮助。",
      likes: 0,
      coverImage: "/placeholder-diary.svg",
      videoUrl: null,
      images: ["/placeholder-diary.svg"]
    }
  });

  await prisma.diaryPost.create({
    data: {
      title: "宿舍区猫咪就医记录",
      type: "medical",
      summary: "宿舍区一只猫咪出现眼部不适，我们带它前往医院检查。",
      content: "猫咪眼部有轻微感染，医生开具了药物。后续我们会持续观察恢复情况。",
      likes: 0,
      coverImage: "/placeholder-diary.svg",
      videoUrl: null,
      images: ["/placeholder-diary.svg"]
    }
  });

  await prisma.comment.create({
    data: {
      diaryPostId: diary.id,
      nickname: "匿名用户",
      content: "辛苦志愿者们啦，希望橘子恢复顺利。"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
