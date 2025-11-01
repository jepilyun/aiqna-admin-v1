import { APIUrlOptionalParams } from "../api-common";

/**
 * API Routes: YouTube Video 경로 생성
 * @param type 경로 타입
 * @returns 경로
 */
export const apiUrlProcessingStatusYouTubeVideo = (
  type: "list" | "detail" | "delete" | "update",
  optionalParams?: APIUrlOptionalParams,
) => {
  let path = "";

  switch (type) {
    case "list":
      path = `/api/admin/processing-status/youtube-video/list/${optionalParams?.start ? optionalParams?.start : 0}`;
      break;
    case "detail":
      path = `/api/admin/processing-status/youtube-video/detail/${optionalParams?.videoId}`;
      break;
    case "delete":
      path = `/api/admin/processing-status/youtube-video/delete/${optionalParams?.videoId}`;
      break;
    case "update":
      path = `/api/admin/processing-status/youtube-video/update/${optionalParams?.videoId}`;
      break;
    default:
      console.error(`Invalid route: ${type}`);
      break;
  }

  return `${process.env.NEXT_PUBLIC_DEV_API_URL}${path}`;
};
