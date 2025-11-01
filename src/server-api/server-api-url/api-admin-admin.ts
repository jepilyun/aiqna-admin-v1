import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: Admin Auth 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlAdminAdmin = (
  type:
    | "list"
    | "search"
    | "create"
    | "detailGet"
    | "detailUpdate"
    | "detailDelete",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/administrator/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "search":
      path = `/api/admin/administrator/search/${optionalParams?.keyword ? optionalParams?.keyword : ""}/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "create":
      path = "/api/admin/administrator/create";
      break;
    case "detailGet":
      path = `/api/admin/administrator/detail/get/${optionalParams?.aid}`;
      break;
    case "detailUpdate":
      path = `/api/admin/administrator/detail/update/${optionalParams?.aid}`;
      break;
    case "detailDelete":
      path = `/api/admin/administrator/detail/delete/${optionalParams?.aid}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};

/**
 * API Routes: Admin Auth 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlAdminAuth = (type: "login" | "logout") => {
  let path = "";

  switch (type) {
    case "login":
      path = "/api/admin/auth/login";
      break;
    case "logout":
      path = "/api/admin/auth/logout";
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
