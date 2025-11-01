import { apiUrlProcessingStatusBlogPost } from "@/server-api/server-api-url/api-admin-processing-status-blog-post";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TSqlProcessingLogBlogPost,
  TSqlProcessingLogBlogPostUpdate,
} from "aiqna_common_v1";

/**
 * Processing Status Blog Post Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>
 */
export async function reqProcessingStatusBlogPostGetList(
  start: number,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>> {
  const res = await fetch(apiUrlProcessingStatusBlogPost("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Processing Status Blog Post Get Detail
 * @param id
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>
 */
export async function reqProcessingStatusBlogPostGetDetail(
  id: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>> {
  const res = await fetch(
    apiUrlProcessingStatusBlogPost("detail", { id }),
    {
      method: "GET",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status Blog Post Delete
 * @param id
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>
 */
export async function reqProcessingStatusBlogPostDelete(
  id: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>> {
  const res = await fetch(
    apiUrlProcessingStatusBlogPost("delete", { id }),
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  return res.json();
}

/**
 * Processing Status Blog Post Update
 * @param id
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>
 */
export async function reqProcessingStatusBlogPostUpdate(
  id: string,
  data: TSqlProcessingLogBlogPostUpdate,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogBlogPost[]>>> {
  const res = await fetch(
    apiUrlProcessingStatusBlogPost("update", { id }),
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  return res.json();
}
