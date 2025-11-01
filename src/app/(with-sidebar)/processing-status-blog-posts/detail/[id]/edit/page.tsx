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
import { F_PROCESSING_LOG_BLOG_POST, TSqlProcessingLogBlogPost, TSqlProcessingLogBlogPostUpdate } from "aiqna_common_v1";
import { PageTitle } from "@/components/common/page-title";
import { reqProcessingStatusBlogPostGetDetail, reqProcessingStatusBlogPostUpdate } from "@/requests/req-admin/req-processing-status-blog-post";


/**
 * Processing Status Blog Post 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function ProcessingStatusBlogPostDetailEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TSqlProcessingLogBlogPost | null>(null);
  const [updatedData, setUpdatedData] = useState<TSqlProcessingLogBlogPostUpdate>({} as TSqlProcessingLogBlogPostUpdate);

  const fetchData = async () => {
    const apiResponse = await reqProcessingStatusBlogPostGetDetail(id);

    if (apiResponse.success && apiResponse.dbResponse) {
      setCurrentData(apiResponse.dbResponse.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setCurrentData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (currentData) {
      setUpdatedData(currentData);
    }
  }, [currentData]);

  const handleFieldsChange = <K extends keyof TSqlProcessingLogBlogPostUpdate>(key: K, value: TSqlProcessingLogBlogPostUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TSqlProcessingLogBlogPostUpdate>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      // countryCode 가 변경되었을 수 있으므로 기존 countryCode 를 전달
      const result = await reqProcessingStatusBlogPostUpdate(id, modifiedData);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/processing-status-blog-posts/detail/${id}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      toast.info("No changes to save");
    }
  };

  return (
    <div>
      <PageTitle title="Processing Status Blog Post Detail Edit" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_PROCESSING_LOG_BLOG_POST.id} value={id} disabled />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.blog_post_url}
          value={currentData?.blog_post_url || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.blog_post_url.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.processing_status}
          value={updatedData?.processing_status || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.processing_status.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.index_name}
          value={updatedData?.index_name || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.index_name.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormRadioGroup
          info={F_PROCESSING_LOG_BLOG_POST.is_data_fetched}
          values={["true", "false", "null"]}
          value={updatedData?.is_data_fetched === null ? "null" : updatedData?.is_data_fetched ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.is_data_fetched.id as keyof TSqlProcessingLogBlogPostUpdate, value === "null" ? null : value === "true")}
        />        
        <FormRadioGroup
          info={F_PROCESSING_LOG_BLOG_POST.is_pinecone_processed}
          values={["true", "false", "null"]}
          value={updatedData?.is_pinecone_processed === null ? "null" : updatedData?.is_pinecone_processed ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.is_pinecone_processed.id as keyof TSqlProcessingLogBlogPostUpdate, value === "null" ? null : value === "true")}
        />         
        <FormRadioGroup
          info={F_PROCESSING_LOG_BLOG_POST.is_error_occurred}
          values={["true", "false", "null"]}
          value={updatedData?.is_error_occurred === null ? "null" : updatedData?.is_error_occurred ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.is_error_occurred.id as keyof TSqlProcessingLogBlogPostUpdate, value === "null" ? null : value === "true")}
        />  
        <FormTextarea
          info={F_PROCESSING_LOG_BLOG_POST.error_message}
          value={updatedData?.error_message || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.error_message.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.processing_started}
          value={updatedData?.processing_started || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.processing_started.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.processing_completed}
          value={updatedData?.processing_completed || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.processing_completed.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInputNumber
          info={F_PROCESSING_LOG_BLOG_POST.retry_count}
          value={updatedData?.retry_count?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.retry_count.id as keyof TSqlProcessingLogBlogPostUpdate, parseInt(value))}
        />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.created_at}
          value={updatedData?.created_at || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.created_at.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_BLOG_POST.updated_at}
          value={updatedData?.updated_at || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.updated_at.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />        
        <FormInput info={F_PROCESSING_LOG_BLOG_POST.last_processed_at} value={updatedData?.last_processed_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_BLOG_POST.source} value={updatedData?.source || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.source.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <FormInputNumber 
          info={F_PROCESSING_LOG_BLOG_POST.priority}
          value={updatedData?.priority?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.priority.id as keyof TSqlProcessingLogBlogPostUpdate, parseInt(value))}
        />
        <FormInput 
          info={F_PROCESSING_LOG_BLOG_POST.assigned_worker} 
          value={updatedData?.assigned_worker || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_BLOG_POST.assigned_worker.id as keyof TSqlProcessingLogBlogPostUpdate, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/processing-status-blog-posts/detail/${id}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
