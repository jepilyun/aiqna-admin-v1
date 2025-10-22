import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: Instagram Post 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlInstagramPost = (
  type: "list" | "register" | "detail" | "delete" | "update",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/instagram-post/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "register":
      path = "/api/admin/instagram-post/register";
      break;
    case "detail":
      path = `/api/admin/instagram-post/detail/${optionalParams?.uuid36}`;
      break;
    case "delete":
      path = `/api/admin/instagram-post/delete/${optionalParams?.uuid36}`;
      break;
    case "update":
      path = `/api/admin/instagram-post/update/${optionalParams?.uuid36}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
