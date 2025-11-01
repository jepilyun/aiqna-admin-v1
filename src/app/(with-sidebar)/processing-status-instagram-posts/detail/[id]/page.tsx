"use client";

import { use, useEffect, useState } from "react";
import { F_PROCESSING_LOG_INSTAGRAM_POST, TSqlProcessingLogInstagramPost } from "aiqna_common_v1";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { useRouter } from "next/navigation";
import { FormTextarea } from "@/components/form/form-textarea";
import { reqProcessingStatusInstagramPostDelete, reqProcessingStatusInstagramPostGetDetail } from "@/requests/req-admin/req-processing-status-instagram-post";

/**
 * Processing Status Instagram Post 상세 페이지
 * @param params Processing Status Instagram Post ID
 * @returns Processing Status Instagram Post 상세 페이지
 */
export default function ProcessingStatusInstagramPostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TSqlProcessingLogInstagramPost | null>(null);

  const fetchData = async () => {
    const apiResponse = await reqProcessingStatusInstagramPostGetDetail(id);

    if (apiResponse.success) {
      setData(apiResponse.dbResponse?.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setData(null);
    }
  };

  const handleDelete = async () => {
    if (!data) {
      toast.error("삭제할 Processing Status Instagram Post 데이터가 없습니다.");
      return;
    }

    const confirmed = confirm(`정말 ${data.id}을 삭제하시겠습니까?`);

    if (!confirmed) return;

    const res = await reqProcessingStatusInstagramPostDelete(id);

    if (res.success && res.dbResponse?.data.length === 1) {
      toast.success(res.msg || "삭제 완료되었습니다.");
      router.push("/processing-status-instagram-posts");
    } else if (res.success && res.dbResponse?.data.length === 0) {
      toast.success("삭제가 진행되었으나 Processing Status Instagram Post 데이터가 존재하지 않아 처리된 데이터가 없습니다.");
    } else {
      toast.error(res.alarm || res.msg || "삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <PageTitle title="Processing Status Instagram Post Detail" />
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.id} value={data?.id?.toString() || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.instagram_post_url} value={data?.instagram_post_url || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.processing_status} value={data?.processing_status || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.index_name} value={data?.index_name || ""} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_INSTAGRAM_POST.is_data_fetched} values={["true", "false", "null"]} value={data?.is_data_fetched === null ? "null" : data?.is_data_fetched ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_INSTAGRAM_POST.is_pinecone_processed} values={["true", "false", "null"]} value={data?.is_pinecone_processed === null ? "null" : data?.is_pinecone_processed ? "true" : "false"} disabled />
        <FormRadioGroup info={F_PROCESSING_LOG_INSTAGRAM_POST.is_error_occurred} values={["true", "false", "null"]} value={data?.is_error_occurred === null ? "null" : data?.is_error_occurred ? "true" : "false"} disabled />
        <FormTextarea info={F_PROCESSING_LOG_INSTAGRAM_POST.error_message} value={data?.error_message || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.processing_started} value={data?.processing_started || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.processing_completed} value={data?.processing_completed || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.retry_count} value={data?.retry_count?.toString() || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.created_at} value={data?.created_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.updated_at} value={data?.updated_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.last_processed_at} value={data?.last_processed_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.source} value={data?.source || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.priority} value={data?.priority?.toString() || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_INSTAGRAM_POST.assigned_worker} value={data?.assigned_worker || ""} disabled />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button className="w-24" asChild>
          <Link href={`/processing-status-instagram-posts/detail/${id}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" className="w-24" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
