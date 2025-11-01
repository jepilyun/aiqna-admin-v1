import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: Blog Post 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlBlogPost = (
  type: "list" | "register" | "detail" | "delete" | "update",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/blog/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "register":
      path = "/api/admin/blog/register";
      break;
    case "detail":
      path = `/api/admin/blog/detail/${optionalParams?.uuid36}`;
      break;
    case "delete":
      path = `/api/admin/blog/delete/${optionalParams?.uuid36}`;
      break;
    case "update":
      path = `/api/admin/blog/update/${optionalParams?.uuid36}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
