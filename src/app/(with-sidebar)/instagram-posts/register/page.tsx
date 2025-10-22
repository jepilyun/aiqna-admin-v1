"use client";

import { FormInput } from "@/components/form/form-input";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { F_INSTAGRAM_POST, TSqlInstagramPostDetailInsert } from "aiqna_common_v1";
import { reqInstagramPostRegister } from "@/requests/req-admin/req-instagram-post";
import { FormTextarea } from "@/components/form/form-textarea";

/**
 * Instagram Post 등록 페이지
 * @returns Instagram Post 등록 페이지
 */
export default function InstagramPostRegister() {
  const router = useRouter();
  const [data, setData] = useState<TSqlInstagramPostDetailInsert>({} as TSqlInstagramPostDetailInsert);

  const handleFieldsChange = <K extends keyof TSqlInstagramPostDetailInsert>(key: K, value: TSqlInstagramPostDetailInsert[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.instagram_post_url) {
      const result = await reqInstagramPostRegister(data);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/instagram-posts/detail/${result.dbResponse?.data?.[0].uuid_36}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      if (!data.instagram_post_url) {
        toast.error("Instagram Post URL is required");
      }
    }
  };

  return (
    <div>
      <PageTitle title="Instagram Post Register" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput
          info={F_INSTAGRAM_POST.instagram_post_url}
          value={data?.instagram_post_url || ""}
          onChange={(value) => handleFieldsChange(F_INSTAGRAM_POST.instagram_post_url.id as keyof TSqlInstagramPostDetailInsert, value)}
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.description}
          value={data?.description || ""}
          onChange={(value) => handleFieldsChange(F_INSTAGRAM_POST.description.id as keyof TSqlInstagramPostDetailInsert, value)}
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.tags}
          value={data?.tags ? data.tags.join(", ") : ""}
          onChange={(value) => handleFieldsChange(F_INSTAGRAM_POST.tags.id as keyof TSqlInstagramPostDetailInsert, value)}
        />
        <FormInput
          info={F_INSTAGRAM_POST.user_id}
          value={data?.user_id || ""}
          onChange={(value) => handleFieldsChange(F_INSTAGRAM_POST.user_id.id as keyof TSqlInstagramPostDetailInsert, value)}
        />
        <FormInput
          info={F_INSTAGRAM_POST.user_profile_url}
          value={data?.user_profile_url || ""}
          onChange={(value) => handleFieldsChange(F_INSTAGRAM_POST.user_profile_url.id as keyof TSqlInstagramPostDetailInsert, value)}
        />
        <FormInput
          info={F_INSTAGRAM_POST.published_date}
          value={data?.published_date?.toString() || ""}
          onChange={(value) => handleFieldsChange(F_INSTAGRAM_POST.published_date.id as keyof TSqlInstagramPostDetailInsert, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/instagram-posts`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
