import { apiUrlAdminAdmin } from "@/server-api/server-api-url/api-admin-admin";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TAdmin,
  TAdminInsert,
  TAdminUpdate,
} from "aiqna_common_v1";

/**
 * Admin Get List
 * @param start
 * @returns ResponseTrandAPI<TAdmin[]>
 */
export async function reqAdminGetList(
  start: number,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>> {
  const res = await fetch(apiUrlAdminAdmin("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Admin Search
 * @param keyword
 * @param start
 * @returns ResponseAiqnaAPI<TAdmin[]>
 */
export async function reqAdminSearchByKeyword(
  keyword: string,
  start: number,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>> {
  const res = await fetch(apiUrlAdminAdmin("search", { keyword, start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Admin Create
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>
 */
export async function reqAdminCreate(
  data: TAdminInsert,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>> {
  const res = await fetch(apiUrlAdminAdmin("create"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return await res.json();
}

/**
 * Admin Detail Get
 * @param aid
 * @returns ResponseAiqnaAPI<TAdmin[]>
 */
export async function reqAdminGetDetail(
  aid: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>> {
  const res = await fetch(apiUrlAdminAdmin("detailGet", { aid }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Admin Detail Update
 * @param aid
 * @returns ResponseAiqnaAPI<TAdmin[]>
 */
export async function reqAdminUpdateDetail(
  aid: string,
  data: TAdminUpdate,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>> {
  const res = await fetch(apiUrlAdminAdmin("detailUpdate", { aid }), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

/**
 * Admin Detail Delete
 * @param aid
 * @returns ResponseAiqnaAPI<TAdmin[]>
 */
export async function reqAdminDeleteDetail(
  aid: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TAdmin[]>>> {
  const res = await fetch(apiUrlAdminAdmin("detailDelete", { aid }), {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}
