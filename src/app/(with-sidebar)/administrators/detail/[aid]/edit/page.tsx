"use client";

import { use, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormInput } from "@/components/form/form-input";
import { FormInputLink } from "@/components/form/form-input-link";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { reqAdminGetDetail, reqAdminUpdateDetail } from "@/requests/req-admin/req-admin";
import { toast } from "sonner";
import { F_ADMIN, TAdmin, TAdminUpdate } from "aiqna_common_v1";

import { getOnlyModifiedData } from "@/utils/get-modified-data";

/**
 * 관리자 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function AdministratorDetailEdit({ params }: { params: Promise<{ aid: string }> }) {
  const { aid } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TAdmin | null>(null);
  const [updatedData, setUpdatedData] = useState<TAdminUpdate>({} as TAdminUpdate);

  const fetchData = async () => {
    const apiResponse = await reqAdminGetDetail(aid);

    if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 1) {
      setCurrentData(apiResponse.dbResponse.data[0]);
      setUpdatedData(apiResponse.dbResponse.data[0]);
    } else if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 0) {
      toast.error("Response Success but Administrator data does not exist.");
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setCurrentData(null);
      setUpdatedData({} as TAdminUpdate);
    }
  };

  useEffect(() => {
    fetchData();
  }, [aid]);

  const handleFieldsChange = <K extends keyof TAdminUpdate>(key: K, value: TAdminUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TAdmin>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      const apiResponse = await reqAdminUpdateDetail(aid, modifiedData as TAdminUpdate);

      if (apiResponse.success) {
        toast.success(apiResponse.msg || "Success");
        router.push(`/administrators/detail/${aid}`);
      } else if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 0) {
        toast.error("Response Success but Administrator data does not updated. Please check the data.");
      } else {
        toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      }
    } else {
      toast.info("No changes");
    }
  };

  return (
    <div>
      <PageTitle title="Administrator Detail Edit" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_ADMIN.aid} value={updatedData?.aid || ""} disabled />
        <FormInput info={F_ADMIN.email} value={updatedData?.email || ""} disabled />
        <FormInput
          info={F_ADMIN.name}
          value={updatedData?.name || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.name.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.level}
          value={updatedData?.level || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.level.id as keyof TAdmin, value)}
        />
        <FormRadioGroup
          info={F_ADMIN.is_active}
          values={["true", "false"]}
          value={updatedData?.is_active ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_ADMIN.is_active.id as keyof TAdmin, value === "true")}
        />
        <FormInput
          info={F_ADMIN.refresh_token}
          value={updatedData?.refresh_token || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.refresh_token.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.refresh_token_issued_at}
          value={updatedData?.refresh_token_issued_at?.toLocaleString() || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.refresh_token_issued_at.id as keyof TAdmin, value)}
        />
        <FormInputLink info={F_ADMIN.created_at} value={updatedData?.created_at?.toLocaleString() || ""} disabled />
        <FormInputLink
          info={F_ADMIN.created_by}
          value={updatedData?.created_by || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.created_by.id as keyof TAdmin, value)}
        />
        <FormInputLink info={F_ADMIN.last_accessed_at} value={updatedData?.last_accessed_at?.toLocaleString() || ""} disabled />
        <FormInputLink info={F_ADMIN.deactivated_at} value={updatedData?.deactivated_at?.toLocaleString() || ""} disabled />
        <FormInputLink
          info={F_ADMIN.deactivated_by}
          value={updatedData?.deactivated_by || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.deactivated_by.id as keyof TAdmin, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/administrators/detail/${aid}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
