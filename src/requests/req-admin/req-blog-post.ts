import { apiUrlBlogPost } from "@/server-api/server-api-url/api-admin-blog-post";
import { ResponseAiqnaAPI, ResponseDBSelect, TSqlBlogPostDetail, TSqlBlogPostDetailInsert, TSqlBlogPostDetailUpdate, TSqlBlogPostList } from "aiqna_common_v1";

/**
 * Blog Post Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostList[]>>
 */
export async function reqBlogPostGetList(start: number): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostList[]>>> {
  const res = await fetch(apiUrlBlogPost("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}


/**
 * Blog Post Register
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetailInsert>>
 */
export async function reqBlogPostRegister(data: TSqlBlogPostDetailInsert): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>> {
  const res = await fetch(apiUrlBlogPost("register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      blogPostUrl: data.blog_post_url,
      title: data.title,
      content: data.content,
      tags: data.tags,
      platform: data.platform,
      platformUrl: data.platform_url,
      publishedDate: data.published_date,
    }),
    credentials: "include",
  });
  return res.json();
}


/**
 * Blog Post Get Detail
 * @param uuid36
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>
 */
export async function reqBlogPostGetDetail(uuid36: string): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>> {
  const res = await fetch(apiUrlBlogPost("detail", { uuid36 }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}



/**
 * Blog Post Delete
 * @param uuid36
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>
 */
export async function reqBlogPostDelete(uuid36: string): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>> {
  const res = await fetch(apiUrlBlogPost("delete", { uuid36 }), {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}


/**
 * Blog Post Update
 * @param uuid36
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>
 */
export async function reqBlogPostUpdate(uuid36: string, data: TSqlBlogPostDetailUpdate): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlBlogPostDetail[]>>> {
  const res = await fetch(apiUrlBlogPost("update", { uuid36 }), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
    credentials: "include",
  });
  return res.json();
}
