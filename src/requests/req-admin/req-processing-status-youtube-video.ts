import { apiUrlProcessingStatusYouTubeVideo } from "@/server-api/server-api-url/api-admin-processing-status-youtube-video";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TSqlProcessingLogYoutubeVideo,
  TSqlProcessingLogYoutubeVideoUpdate,
} from "aiqna_common_v1";

/**
 * Processing Status YouTube Video Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
 */
export async function reqProcessingStatusYouTubeVideoGetList(
  start: number,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusYouTubeVideo("list", { start }),
    {
      method: "GET",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status YouTube Video Get Detail
 * @param videoId
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
 */
export async function reqProcessingStatusYouTubeVideoGetDetail(
  videoId: string,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusYouTubeVideo("detail", { videoId }),
    {
      method: "GET",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status YouTube Video Delete
 * @param videoId
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
 */
export async function reqProcessingStatusYouTubeVideoDelete(
  videoId: string,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusYouTubeVideo("delete", { videoId }),
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status YouTube Video Update
 * @param videoId
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
 */
export async function reqProcessingStatusYouTubeVideoUpdate(
  videoId: string,
  data: TSqlProcessingLogYoutubeVideoUpdate,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusYouTubeVideo("update", { videoId }),
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  return res.json();
}
