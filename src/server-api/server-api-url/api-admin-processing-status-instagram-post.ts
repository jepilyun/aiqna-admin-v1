import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: Instagram 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlProcessingStatusInstagramPost = (
  type: "list" | "detail" | "delete" | "update",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/processing-status/instagram/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "detail":
      path = `/api/admin/processing-status/instagram/detail/${optionalParams?.id}`;
      break;
    case "delete":
      path = `/api/admin/processing-status/instagram/delete/${optionalParams?.id}`;
      break;
    case "update":
      path = `/api/admin/processing-status/instagram/update/${optionalParams?.id}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
