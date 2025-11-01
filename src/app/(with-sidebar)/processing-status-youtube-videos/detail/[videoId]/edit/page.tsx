"use client";

import { FormInput } from "@/components/form/form-input";
import { FormInputNumber } from "@/components/form/form-input-number";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { getOnlyModifiedData } from "@/utils/get-modified-data";
import { FormTextarea } from "@/components/form/form-textarea";
import { F_PROCESSING_LOG_YOUTUBE_VIDEO, TSqlProcessingLogYoutubeVideo, TSqlProcessingLogYoutubeVideoUpdate } from "aiqna_common_v1";
import { reqProcessingStatusYouTubeVideoGetDetail, reqProcessingStatusYouTubeVideoUpdate } from "@/requests/req-admin/req-processing-status-youtube-video";
import { PageTitle } from "@/components/common/page-title";


/**
 * Processing Status YouTube Video 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function ProcessingStatusYouTubeVideoDetailEdit({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TSqlProcessingLogYoutubeVideo | null>(null);
  const [updatedData, setUpdatedData] = useState<TSqlProcessingLogYoutubeVideoUpdate>({} as TSqlProcessingLogYoutubeVideoUpdate);

  const fetchData = async () => {
    const apiResponse = await reqProcessingStatusYouTubeVideoGetDetail(videoId);

    if (apiResponse.success && apiResponse.dbResponse) {
      setCurrentData(apiResponse.dbResponse.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setCurrentData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  useEffect(() => {
    if (currentData) {
      setUpdatedData(currentData);
    }
  }, [currentData]);

  const handleFieldsChange = <K extends keyof TSqlProcessingLogYoutubeVideoUpdate>(key: K, value: TSqlProcessingLogYoutubeVideoUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TSqlProcessingLogYoutubeVideoUpdate>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      // countryCode 가 변경되었을 수 있으므로 기존 countryCode 를 전달
      const result = await reqProcessingStatusYouTubeVideoUpdate(videoId, modifiedData);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/processing-status-youtube-videos/detail/${videoId}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      toast.info("No changes to save");
    }
  };

  return (
    <div>
      <PageTitle title="Processing Status YouTube Video Detail Edit" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.video_id} value={videoId} disabled />
        <FormInput
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_status}
          value={updatedData?.processing_status || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_status.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.index_name}
          value={updatedData?.index_name || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.index_name.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormRadioGroup
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_shorts}
          values={["true", "false"]}
          value={updatedData?.is_shorts ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.is_shorts.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value === "true")}
        />
        <FormRadioGroup
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_transcript_exist}
          values={["true", "false", "null"]}
          value={updatedData?.is_transcript_exist === null ? "null" : updatedData?.is_transcript_exist ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.is_transcript_exist.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value === "null" ? null : value === "true")}
        />
        <FormRadioGroup
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_api_data_fetched}
          values={["true", "false", "null"]}
          value={updatedData?.is_api_data_fetched === null ? "null" : updatedData?.is_api_data_fetched ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.is_api_data_fetched.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value === "null" ? null : value === "true")}
        />        
        <FormRadioGroup
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_transcript_fetched}
          values={["true", "false", "null"]}
          value={updatedData?.is_transcript_fetched === null ? "null" : updatedData?.is_transcript_fetched ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.is_transcript_fetched.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value === "null" ? null : value === "true")}
        />          
        <FormRadioGroup
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_pinecone_processed}
          values={["true", "false", "null"]}
          value={updatedData?.is_pinecone_processed === null ? "null" : updatedData?.is_pinecone_processed ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.is_pinecone_processed.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value === "null" ? null : value === "true")}
        />         
        <FormRadioGroup
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.is_error_occurred}
          values={["true", "false", "null"]}
          value={updatedData?.is_error_occurred === null ? "null" : updatedData?.is_error_occurred ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.is_error_occurred.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value === "null" ? null : value === "true")}
        />  
        <FormTextarea
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.error_message}
          value={updatedData?.error_message || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.error_message.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_started}
          value={updatedData?.processing_started || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_started.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_completed}
          value={updatedData?.processing_completed || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.processing_completed.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormInputNumber
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.retry_count}
          value={updatedData?.retry_count?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.retry_count.id as keyof TSqlProcessingLogYoutubeVideoUpdate, parseInt(value))}
        />
        <FormInput
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.created_at}
          value={updatedData?.created_at || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.created_at.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.updated_at}
          value={updatedData?.updated_at || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.updated_at.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />        
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.last_processed_at} value={updatedData?.last_processed_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_YOUTUBE_VIDEO.source} value={updatedData?.source || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.source.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <FormInputNumber 
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.priority}
          value={updatedData?.priority?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.priority.id as keyof TSqlProcessingLogYoutubeVideoUpdate, parseInt(value))}
        />
        <FormInput 
          info={F_PROCESSING_LOG_YOUTUBE_VIDEO.assigned_worker} 
          value={updatedData?.assigned_worker || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_YOUTUBE_VIDEO.assigned_worker.id as keyof TSqlProcessingLogYoutubeVideoUpdate, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/processing-status-youtube-videos/detail/${videoId}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
