import { apiUrlBlogPost } from "@/server-api/server-api-url/api-admin-blog-post";
import { apiUrlText } from "@/server-api/server-api-url/api-admin-text";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TSqlBlogPostDetail,
  TSqlBlogPostDetailInsert,
  TSqlBlogPostDetailUpdate,
  TSqlBlogPostList,
  TSqlTextDetail,
  TSqlTextDetailInsert,
  TSqlTextDetailUpdate,
  TSqlTextList,
} from "aiqna_common_v1";

/**
 * Text Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlTextList[]>>
 */
export async function reqTextGetList(
  start: number,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlTextList[]>>> {
  const res = await fetch(apiUrlText("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Text Register
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetailInsert>>
 */
export async function reqTextRegister(
  data: TSqlTextDetailInsert,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>> {
  const res = await fetch(apiUrlText("register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hashKey: data.hash_key,
      title: data.title,
      content: data.content,
    }),
    credentials: "include",
  });
  return res.json();
}

/**
 * Text Get Detail
 * @param hashKey
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>
 */
export async function reqTextGetDetail(
  hashKey: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>> {
  const res = await fetch(apiUrlText("detail", { hashKey }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Text Delete
 * @param hashKey
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>
 */
export async function reqTextDelete(
  hashKey: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>> {
  const res = await fetch(apiUrlText("delete", { hashKey }), {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}

/**
 * Text Update
 * @param uuid36
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>
 */
export async function reqTextUpdate(
  hashKey: string,
  data: TSqlTextDetailUpdate,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlTextDetail[]>>> {
  const res = await fetch(apiUrlText("update", { hashKey }), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}
