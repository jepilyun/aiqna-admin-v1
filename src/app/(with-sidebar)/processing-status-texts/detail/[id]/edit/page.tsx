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
import { F_PROCESSING_LOG_TEXT, TSqlProcessingLogText, TSqlProcessingLogTextUpdate } from "aiqna_common_v1";
import { PageTitle } from "@/components/common/page-title";
import { reqProcessingStatusTextGetDetail, reqProcessingStatusTextUpdate } from "@/requests/req-admin/req-processing-status-text";


/**
 * Processing Status Text 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function ProcessingStatusTextDetailEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TSqlProcessingLogText | null>(null);
  const [updatedData, setUpdatedData] = useState<TSqlProcessingLogTextUpdate>({} as TSqlProcessingLogTextUpdate);

  const fetchData = async () => {
    const apiResponse = await reqProcessingStatusTextGetDetail(id);

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

  const handleFieldsChange = <K extends keyof TSqlProcessingLogTextUpdate>(key: K, value: TSqlProcessingLogTextUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TSqlProcessingLogTextUpdate>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      // countryCode 가 변경되었을 수 있으므로 기존 countryCode 를 전달
      const result = await reqProcessingStatusTextUpdate(id, modifiedData);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/processing-status-texts/detail/${id}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      toast.info("No changes to save");
    }
  };

  return (
    <div>
      <PageTitle title="Processing Status Text Detail Edit" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_PROCESSING_LOG_TEXT.id} value={currentData?.id?.toString() || ""} disabled />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.hash_key}
          value={currentData?.hash_key || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.hash_key.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.processing_status}
          value={updatedData?.processing_status || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.processing_status.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.index_name}
          value={updatedData?.index_name || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.index_name.id as keyof TSqlProcessingLogTextUpdate, value)}
        />     
        <FormRadioGroup
          info={F_PROCESSING_LOG_TEXT.is_pinecone_processed}
          values={["true", "false", "null"]}
          value={updatedData?.is_pinecone_processed === null ? "null" : updatedData?.is_pinecone_processed ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.is_pinecone_processed.id as keyof TSqlProcessingLogTextUpdate, value === "null" ? null : value === "true")}
        />         
        <FormRadioGroup
          info={F_PROCESSING_LOG_TEXT.is_error_occurred}
          values={["true", "false", "null"]}
          value={updatedData?.is_error_occurred === null ? "null" : updatedData?.is_error_occurred ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.is_error_occurred.id as keyof TSqlProcessingLogTextUpdate, value === "null" ? null : value === "true")}
        />  
        <FormTextarea
          info={F_PROCESSING_LOG_TEXT.error_message}
          value={updatedData?.error_message || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.error_message.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.processing_started}
          value={updatedData?.processing_started || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.processing_started.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.processing_completed}
          value={updatedData?.processing_completed || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.processing_completed.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInputNumber
          info={F_PROCESSING_LOG_TEXT.retry_count}
          value={updatedData?.retry_count?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.retry_count.id as keyof TSqlProcessingLogTextUpdate, parseInt(value))}
        />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.created_at}
          value={updatedData?.created_at || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.created_at.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInput
          info={F_PROCESSING_LOG_TEXT.updated_at}
          value={updatedData?.updated_at || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.updated_at.id as keyof TSqlProcessingLogTextUpdate, value)}
        />        
        <FormInput info={F_PROCESSING_LOG_TEXT.last_processed_at} value={updatedData?.last_processed_at || ""} disabled />
        <FormInput info={F_PROCESSING_LOG_TEXT.source} value={updatedData?.source || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.source.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <FormInputNumber 
          info={F_PROCESSING_LOG_TEXT.priority}
          value={updatedData?.priority?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.priority.id as keyof TSqlProcessingLogTextUpdate, parseInt(value))}
        />
        <FormInput 
          info={F_PROCESSING_LOG_TEXT.assigned_worker} 
          value={updatedData?.assigned_worker || ""}
          onChange={(value) => handleFieldsChange(F_PROCESSING_LOG_TEXT.assigned_worker.id as keyof TSqlProcessingLogTextUpdate, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/processing-status-texts/detail/${id}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
