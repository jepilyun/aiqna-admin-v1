"use client";

import { use, useEffect, useState } from "react";
import { F_PROCESSING_LOG_YOUTUBE_VIDEO, TSqlProcessingLogYoutubeVideo } from "aiqna_common_v1";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { useRouter } from "next/navigation";
import { FormTextarea } from "@/components/form/form-textarea";
import { reqProcessingStatusYouTubeVideoDelete, reqProcessingStatusYouTubeVideoGetDetail } from "@/requests/req-admin/req-processing-status-youtube-video";

/**
 * Processing Status YouTube Video 상세 페이지
 * @param params Processing Status YouTube Video ID
 * @returns Processing Status YouTube Video 상세 페이지
 */
export default function ProcessingStatusYouTubeVideoDetail({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TSqlProcessingLogYoutubeVideo | null>(null);

  const fetchData = async () => {
    const apiResponse = await reqProcessingStatusYouTubeVideoGetDetail(videoId);

    if (apiResponse.success) {
      setData(apiResponse.dbResponse?.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setData(null);
    }
  };

  const handleDelete = async () => {
    if (!data) {
      toast.error("삭제할 Processing Status YouTube Video 데이터가 없습니다.");
      return;
    }

    const confirmed = confirm(`정말 ${data.video_id}을 삭제하시겠습니까?`);

    if (!confirmed) return;

    const res = await reqProcessingStatusYouTubeVideoDelete(data.video_id);

    if (res.success && res.dbResponse?.data.length === 1) {
      toast.success(res.msg || "삭제 완료되었습니다.");
      router.push("/processing-status-youtube-videos");
    } else if (res.success && res.dbResponse?.data.length === 0) {
      toast.success("삭제가 진행되었으나 Processing Status YouTube Video 데이터가 존재하지 않아 처리된 데이터가 없습니다.");
    } else {
      toast.error(res.alarm || res.msg || "삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  return (
    <div>
      <PageTitle title="Processing Status YouTube Video Detail" />
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.video_id} value={data?.video_id || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_status} value={data?.processing_status || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.index_name} value={data?.index_name || ""} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_shorts} values={["true", "false"]} value={data?.is_shorts ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_transcript_exist} values={["true", "false", "null"]} value={data?.is_transcript_exist === null ? "null" : data?.is_transcript_exist ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_api_data_fetched} values={["true", "false", "null"]} value={data?.is_api_data_fetched === null ? "null" : data?.is_api_data_fetched ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_transcript_fetched} values={["true", "false", "null"]} value={data?.is_transcript_fetched === null ? "null" : data?.is_transcript_fetched ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_pinecone_processed} values={["true", "false", "null"]} value={data?.is_pinecone_processed === null ? "null" : data?.is_pinecone_processed ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_error_occurred} values={["true", "false", "null"]} value={data?.is_error_occurred === null ? "null" : data?.is_error_occurred ? "true" : "false"} disabled />
        <FormTextarea info={F_PROCESSING_LOG_YOUTUBE_VIDEO.error_message} value={data?.error_message || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_started} value={data?.processing_started || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_completed} value={data?.processing_completed || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.retry_count} value={data?.retry_count?.toString() || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.created_at} value={data?.created_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.updated_at} value={data?.updated_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.last_processed_at} value={data?.last_processed_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.source} value={data?.source || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.priority} value={data?.priority?.toString() || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.assigned_worker} value={data?.assigned_worker || ""} disabled />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button className="w-24" asChild>
          <Link href={`/processing-status-youtube-videos/detail/${videoId}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" className="w-24" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
