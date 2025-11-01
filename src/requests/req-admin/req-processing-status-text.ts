import { apiUrlProcessingStatusText } from "@/server-api/server-api-url/api-admin-processing-status-text";
import {
  ResponseAiqnaAPI,
  ResponseDBSelect,
  TSqlProcessingLogText,
  TSqlProcessingLogTextUpdate,
} from "aiqna_common_v1";

/**
 * Processing Status Text Get List
 * @param start
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>
 */
export async function reqProcessingStatusTextGetList(
  start: number,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>> {
  const res = await fetch(apiUrlProcessingStatusText("list", { start }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Processing Status Text Get Detail
 * @param id
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>
 */
export async function reqProcessingStatusTextGetDetail(
  id: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>> {
  const res = await fetch(apiUrlProcessingStatusText("detail", { id }), {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

/**
 * Processing Status Text Delete
 * @param id
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>
 */
export async function reqProcessingStatusTextDelete(
  id: string,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>> {
  const res = await fetch(apiUrlProcessingStatusText("delete", { id }), {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}

/**
 * Processing Status Text Update
 * @param id
 * @param data
 * @returns ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>
 */
export async function reqProcessingStatusTextUpdate(
  id: string,
  data: TSqlProcessingLogTextUpdate,
): Promise<ResponseAiqnaAPI<ResponseDBSelect<TSqlProcessingLogText[]>>> {
  const res = await fetch(apiUrlProcessingStatusText("update", { id }), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}
