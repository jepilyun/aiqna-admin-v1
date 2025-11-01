import { apiUrlProcessingStatusInstagramPost } from "@/server-api/server-api-url/api-admin-processing-status-instagram-post";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TSqlProcessingLogInstagramPost,
  TSqlProcessingLogInstagramPostUpdate,
} from "aiqna_common_v1";

/**
 * Processing Status Instagram Post Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
 */
export async function reqProcessingStatusInstagramPostGetList(
  start: number,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusInstagramPost("list", { start }),
    {
      method: "GET",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status Instagram Post Get Detail
 * @param id
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogYoutubeVideo[]>>
 */
export async function reqProcessingStatusInstagramPostGetDetail(
  id: string,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusInstagramPost("detail", { id }),
    {
      method: "GET",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status Instagram Post Delete
 * @param id
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
 */
export async function reqProcessingStatusInstagramPostDelete(
  id: string,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusInstagramPost("delete", { id }),
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status Instagram Post Update
 * @param id
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
 */
export async function reqProcessingStatusInstagramPostUpdate(
  id: string,
  data: TSqlProcessingLogInstagramPostUpdate,
): Promise<
  ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogInstagramPost[]>>
> {
  const res = await fetch(
    apiUrlProcessingStatusInstagramPost("update", { id }),
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  return res.json();
}
