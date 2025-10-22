import { apiUrlInstagramPost } from "@/server-api/server-api-url/api-admin-instagram-post";
import { ResponseAiqnaAPI, ResponseDBSelect, TSqlInstagramPostDetail, TSqlInstagramPostDetailInsert, TSqlInstagramPostDetailUpdate, TSqlInstagramPostList } from "aiqna_common_v1";

/**
 * Instagram Post Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostList[]>>
 */
export async function reqInstagramPostGetList(start: number): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostList[]>>> {
  const res = await fetch(apiUrlInstagramPost("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}


/**
 * Instagram Post Register
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetailInsert>>
 */
export async function reqInstagramPostRegister(data: TSqlInstagramPostDetailInsert): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>> {
  const res = await fetch(apiUrlInstagramPost("register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instagramPostUrl: data.instagram_post_url,
      description: data.description,
      tags: data.tags,
      userId: data.user_id,
      userProfileUrl: data.user_profile_url,
      publishedDate: data.published_date,
    }),
    credentials: "include",
  });
  return res.json();
}


/**
 * YouTube Video Get Detail
 * @param uuid36
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>
 */
export async function reqInstagramPostGetDetail(uuid36: string): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>> {
  const res = await fetch(apiUrlInstagramPost("detail", { uuid36 }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}



/**
 * Instagram Post Delete
 * @param uuid36
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>
 */
export async function reqInstagramPostDelete(uuid36: string): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>> {
  const res = await fetch(apiUrlInstagramPost("delete", { uuid36 }), {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}


/**
 * Instagram Post Update
 * @param uuid36
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>
 */
export async function reqInstagramPostUpdate(uuid36: string, data: TSqlInstagramPostDetailUpdate): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlInstagramPostDetail[]>>> {
  const res = await fetch(apiUrlInstagramPost("update", { uuid36 }), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
    credentials: "include",
  });
  return res.json();
}
