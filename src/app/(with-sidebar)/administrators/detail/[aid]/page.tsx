"use client";

import { use, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormInput } from "@/components/form/form-input";
import { FormInputLink } from "@/components/form/form-input-link";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { reqAdminDeleteDetail, reqAdminGetDetail } from "@/requests/req-admin/req-admin";
import { toast } from "sonner";
import { F_ADMIN, TAdmin } from "aiqna_common_v1";

/**
 * 관리자 상세 페이지
 * @param params 관리자 코드
 * @returns 관리자 상세 페이지
 */
export default function AdministratorDetail({ params }: { params: Promise<{ aid: string }> }) {
  const { aid } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TAdmin | null>(null);

  const handleDelete = async () => {
    if (!data) {
      toast.error("삭제할 관리자 데이터가 없습니다.");
      return;
    }

    const confirmed = confirm(`정말 ${data.name}을 삭제하시겠습니까?`);

    if (!confirmed) return;

    const apiResponse = await reqAdminDeleteDetail(aid);

    if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 1) {
      toast.success("삭제 완료되었습니다.");
      router.push("/administrators");
    } else if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 0) {
      toast.error("Response Success but Administrator data does not deleted. Please check the data.");
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await reqAdminGetDetail(aid);

      if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 1) {
        setData(apiResponse.dbResponse.data[0]);
      } else if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 0) {
        toast.error("Response Success but Administrator data does not exist. Please check the data.");
      } else {
        toast.error(apiResponse.alarm || apiResponse.msg || "Error");
        setData(null);
      }
    };

    fetchData();
  }, [aid]);

  return (
    <div>
      <PageTitle title="Administrator Detail" />
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_ADMIN.email} value={data?.email || ""} disabled />
        <FormInput info={F_ADMIN.name} value={data?.name || ""} disabled />
        <FormInput info={F_ADMIN.level} value={data?.level || ""} disabled />
        <FormRadioGroup
          info={F_ADMIN.is_active}
          values={["true", "false"]}
          value={data?.is_active ? "true" : "false"}
          disabled
        />
        <FormInput info={F_ADMIN.refresh_token} value={data?.refresh_token || ""} disabled />
        <FormInput
          info={F_ADMIN.refresh_token_issued_at}
          value={data?.refresh_token_issued_at?.toLocaleString() || ""}
          disabled
        />
        <FormInput info={F_ADMIN.created_at} value={data?.created_at?.toLocaleString() || ""} disabled />
        <FormInput info={F_ADMIN.created_by} value={data?.created_by || ""} disabled />
        <FormInput info={F_ADMIN.last_accessed_at} value={data?.last_accessed_at?.toLocaleString() || ""} disabled />
        <FormInputLink info={F_ADMIN.deactivated_at} value={data?.deactivated_at?.toLocaleString() || ""} disabled />
        <FormInput info={F_ADMIN.deactivated_by} value={data?.deactivated_by || ""} disabled />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button className="w-24" asChild>
          <Link href={`/administrators/detail/${aid}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" className="w-24" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
