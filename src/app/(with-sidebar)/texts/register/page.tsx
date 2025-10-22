"use client";

import { FormInput } from "@/components/form/form-input";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { F_TEXT, TSqlTextDetailInsert } from "aiqna_common_v1";
import { FormTextarea } from "@/components/form/form-textarea";
import { reqTextRegister } from "@/requests/req-admin/req-text";

/**
 * Text 등록 페이지
 * @returns Text 등록 페이지
 */
export default function TextRegister() {
  const router = useRouter();
  const [data, setData] = useState<TSqlTextDetailInsert>({} as TSqlTextDetailInsert);

  const handleFieldsChange = <K extends keyof TSqlTextDetailInsert>(key: K, value: TSqlTextDetailInsert[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.hash_key) {
      const result = await reqTextRegister(data);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/texts/detail/${result.dbResponse?.data?.[0].hash_key}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      if (!data.hash_key) {
        toast.error("Hash Key is required");
      }
    }
  };

  return (
    <div>
      <PageTitle title="Text Register" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_TEXT.hash_key} value={data?.hash_key || ""} 
          onChange={(value) => handleFieldsChange(F_TEXT.hash_key.id as keyof TSqlTextDetailInsert, value)}
        />
        <FormInput info={F_TEXT.title} value={data?.title || ""} 
          onChange={(value) => handleFieldsChange(F_TEXT.title.id as keyof TSqlTextDetailInsert, value)}
        />
        <FormTextarea info={F_TEXT.content} value={data?.content || ""} 
          onChange={(value) => handleFieldsChange(F_TEXT.content.id as keyof TSqlTextDetailInsert, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/texts`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
