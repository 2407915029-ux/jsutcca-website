export type VideoEmbed =
  | { type: "video"; src: string }
  | { type: "iframe"; src: string }
  | { type: "link"; src: string };

export function getVideoEmbed(videoUrl?: string | null): VideoEmbed | null {
  if (!videoUrl) return null;

  let url: URL;
  try {
    url = new URL(videoUrl);
  } catch {
    return null;
  }

  if (url.pathname.toLowerCase().endsWith(".mp4")) {
    return { type: "video", src: videoUrl };
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? { type: "iframe", src: `https://www.youtube.com/embed/${id}` } : { type: "link", src: videoUrl };
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).at(-1);
    return id ? { type: "iframe", src: `https://www.youtube.com/embed/${id}` } : { type: "link", src: videoUrl };
  }

  if (host === "player.bilibili.com") {
    return { type: "iframe", src: videoUrl };
  }

  if (host.endsWith("bilibili.com")) {
    const bvid = url.pathname.match(/video\/(BV[a-zA-Z0-9]+)/)?.[1];
    return bvid ? { type: "iframe", src: `https://player.bilibili.com/player.html?bvid=${bvid}&page=1` } : { type: "link", src: videoUrl };
  }

  return { type: "link", src: videoUrl };
}
