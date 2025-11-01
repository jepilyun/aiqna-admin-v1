import { apiUrlYouTubeVideo } from "@/server-api/server-api-url/api-admin-youtube-video";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TSqlYoutubeVideoDetail,
  TSqlYoutubeVideoDetailInsert,
  TSqlYoutubeVideoDetailUpdate,
  TSqlYoutubeVideoList,
} from "aiqna_common_v1";

/**
 * YouTube Video Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoList[]>>
 */
export async function reqYouTubeVideoGetList(
  start: number,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoList[]>>> {
  const res = await fetch(apiUrlYouTubeVideo("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * YouTube Video Register
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetailInsert>>
 */
export async function reqYouTubeVideoRegister(
  data: TSqlYoutubeVideoDetailInsert,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>> {
  const res = await fetch(apiUrlYouTubeVideo("register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      videoId: data.video_id,
      isShorts: data.is_shorts,
    }),
    credentials: "include",
  });
  return res.json();
}

/**
 * YouTube Video Get Detail
 * @param videoId
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>
 */
export async function reqYouTubeVideoGetDetail(
  videoId: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>> {
  const res = await fetch(apiUrlYouTubeVideo("detail", { videoId }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * YouTube Video Delete
 * @param videoId
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>
 */
export async function reqYouTubeVideoDelete(
  videoId: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>> {
  const res = await fetch(apiUrlYouTubeVideo("delete", { videoId }), {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}

/**
 * YouTube Video Update
 * @param videoId
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>
 */
export async function reqYouTubeVideoUpdate(
  videoId: string,
  data: TSqlYoutubeVideoDetailUpdate,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlYoutubeVideoDetail[]>>> {
  const res = await fetch(apiUrlYouTubeVideo("update", { videoId }), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}
