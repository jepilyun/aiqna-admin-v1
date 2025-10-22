"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { reqAdminCreate } from "@/requests/req-admin/req-admin";
import { toast } from "sonner";
import { F_ADMIN, TAdmin, TAdminInsert } from "aiqna_common_v1";

/**
 * 관리자 생성 페이지
 * @returns 관리자 생성 페이지
 */
export default function AdministratorCreate() {
  const router = useRouter();
  const [data, setData] = useState<TAdminInsert>({ is_active: true } as TAdminInsert);

  const handleFieldsChange = <K extends keyof TAdminInsert>(key: K, value: TAdminInsert[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.email && data.pw) {
      const apiResponse = await reqAdminCreate(data);

      if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 1) {
        toast.success(apiResponse.msg || "Success");
        router.push(`/administrators/detail/${data.aid}`);
      } else if (apiResponse.success && apiResponse.dbResponse?.data.length && apiResponse.dbResponse.data.length === 0) {
        toast.error("Response Success but City does not created. Please check the data.");
      } else {
        toast.error(apiResponse.error || apiResponse.alarm || apiResponse.msg || "Error");
      }
    } else {
      if (!data.email) {
        toast.error("Email is required");
      } else if (!data.pw) {
        toast.error("Password is required");
      } else {
        toast.error("Please fill in all the required fields");
      }
    }
  };

  return (
    <div>
      <PageTitle title="Administrator Create" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput
          info={F_ADMIN.email}
          value={data?.email || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.email.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.pw}
          value={data?.pw || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.pw.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.name}
          value={data?.name || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.name.id as keyof TAdmin, value)}
        />
        <FormRadioGroup
          info={F_ADMIN.is_active}
          values={["true", "false"]}
          value={data?.is_active ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_ADMIN.is_active.id as keyof TAdmin, value === "true")}
        />
        <FormInput
          info={F_ADMIN.level}
          value={data?.level || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.level.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.refresh_token}
          value={data?.refresh_token || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.refresh_token.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.refresh_token_issued_at}
          value={data?.refresh_token_issued_at?.toLocaleString() || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.refresh_token_issued_at.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.created_by}
          value={data?.created_by || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.created_by.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.deactivated_at}
          value={data?.deactivated_at?.toLocaleString() || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.deactivated_at.id as keyof TAdmin, value)}
        />
        <FormInput
          info={F_ADMIN.deactivated_by}
          value={data?.deactivated_by || ""}
          onChange={(value) => handleFieldsChange(F_ADMIN.deactivated_by.id as keyof TAdmin, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/administrators`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
