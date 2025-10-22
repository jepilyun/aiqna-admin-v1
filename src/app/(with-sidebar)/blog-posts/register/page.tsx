"use client";

import { FormInput } from "@/components/form/form-input";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { F_BLOG_POST, TSqlBlogPostDetailInsert } from "aiqna_common_v1";
import { FormTextarea } from "@/components/form/form-textarea";
import { reqBlogPostRegister } from "@/requests/req-admin/req-blog-post";

/**
 * Blog Post 등록 페이지
 * @returns Blog Post 등록 페이지
 */
export default function BlogPostRegister() {
  const router = useRouter();
  const [data, setData] = useState<TSqlBlogPostDetailInsert>({} as TSqlBlogPostDetailInsert);

  const handleFieldsChange = <K extends keyof TSqlBlogPostDetailInsert>(key: K, value: TSqlBlogPostDetailInsert[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.blog_post_url) {
      const result = await reqBlogPostRegister(data);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/blog-posts/detail/${result.dbResponse?.data?.[0].uuid_36}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      if (!data.blog_post_url) {
        toast.error("Blog Post URL is required");
      }
    }
  };

  return (
    <div>
      <PageTitle title="Blog Post Register" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_BLOG_POST.blog_post_url} value={data?.blog_post_url || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.blog_post_url.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <FormInput info={F_BLOG_POST.title} value={data?.title || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.title.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <FormTextarea info={F_BLOG_POST.content} value={data?.content || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.content.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.tags}
          value={
            Array.isArray(data?.tags)
              ? data.tags.join(", ")
              : data?.tags || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.tags.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <FormInput info={F_BLOG_POST.platform} value={data?.platform || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.platform.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <FormInput info={F_BLOG_POST.platform_url} value={data?.platform_url || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.platform_url.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <FormInput info={F_BLOG_POST.published_date} value={data?.published_date || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.published_date.id as keyof TSqlBlogPostDetailInsert, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/blog-posts`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
