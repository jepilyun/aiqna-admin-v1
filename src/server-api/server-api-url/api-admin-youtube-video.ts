import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: YouTube Video 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlYouTubeVideo = (
  type: "list" | "register" | "detail" | "delete" | "update",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/youtube-video/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "register":
      path = "/api/admin/youtube-video/register";
      break;
    case "detail":
      path = `/api/admin/youtube-video/detail/${optionalParams?.videoId}`;
      break;
    case "delete":
      path = `/api/admin/youtube-video/delete/${optionalParams?.videoId}`;
      break;
    case "update":
      path = `/api/admin/youtube-video/update/${optionalParams?.videoId}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
