import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: Text 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlText = (
  type: "list" | "register" | "detail" | "delete" | "update",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/text/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "register":
      path = "/api/admin/text/register";
      break;
    case "detail":
      path = `/api/admin/text/detail/${optionalParams?.hashKey}`;
      break;
    case "delete":
      path = `/api/admin/text/delete/${optionalParams?.hashKey}`;
      break;
    case "update":
      path = `/api/admin/text/update/${optionalParams?.hashKey}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
