import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createCloudinarySignature, getCloudinaryConfig } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await requireAdmin();

  const body = await request.json().catch(() => ({}));
  const requestedFolder = typeof body.folder === "string" ? body.folder : "meow-team";
  const folder = requestedFolder.replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 80) || "meow-team";
  const timestamp = Math.floor(Date.now() / 1000);

  try {
    const config = getCloudinaryConfig();
    const signParams: Record<string, string | number> = { timestamp, folder };
    if (config.uploadPreset) {
      signParams.upload_preset = config.uploadPreset;
    }
    const signature = createCloudinarySignature(signParams, config.apiSecret);

    return NextResponse.json({
      cloudName: config.cloudName,
      apiKey: config.apiKey,
      uploadPreset: config.uploadPreset,
      timestamp,
      folder,
      signature
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cloudinary 配置读取失败";
    return NextResponse.json({ message }, { status: 500 });
  }
}
