"use client";

import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { FormTextarea } from "@/components/form/form-textarea";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getOnlyModifiedData } from "@/utils/get-modified-data";
import { F_BLOG_POST, TSqlBlogPostDetail, TSqlBlogPostDetailUpdate } from "aiqna_common_v1";
import { reqBlogPostGetDetail, reqBlogPostUpdate } from "@/requests/req-admin/req-blog-post";

/**
 * Blog Post 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function BlogPostDetailEdit({ params }: { params: Promise<{ uuid36: string }> }) {
  const { uuid36 } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TSqlBlogPostDetail | null>(null);
  const [updatedData, setUpdatedData] = useState<TSqlBlogPostDetailUpdate>({} as TSqlBlogPostDetailUpdate);

  const fetchData = async () => {
    const apiResponse = await reqBlogPostGetDetail(uuid36);

    if (apiResponse.success && apiResponse.dbResponse) {
      const currentData = apiResponse.dbResponse.data[0] || null;

      setCurrentData(currentData);
      setUpdatedData(currentData || {});
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setCurrentData(null);
      setUpdatedData({} as TSqlBlogPostDetailUpdate);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uuid36]);

  const handleFieldsChange = <K extends keyof TSqlBlogPostDetailUpdate>(key: K, value: TSqlBlogPostDetailUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TSqlBlogPostDetailUpdate>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      const result = await reqBlogPostUpdate(uuid36, modifiedData as TSqlBlogPostDetailUpdate);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/blog-posts/detail/${uuid36}`);
      } else if (result.success && result.dbResponse?.data.length && result.dbResponse.data.length === 0) {
        toast.error("Response Success but Blog Post data does not updated. Please check the data.");
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      toast.info("No changes to save");
    }
  };

  return (
    <div>
      <PageTitle title="Edit Blog Post" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_BLOG_POST.uuid_36} value={currentData?.uuid_36 || ""} disabled />
        <FormInput info={F_BLOG_POST.blog_post_url} value={currentData?.blog_post_url} disabled/>
        <FormInput info={F_BLOG_POST.title} value={updatedData?.title || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.title.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea info={F_BLOG_POST.content} value={updatedData?.content || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.content.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.tags}
          value={
            Array.isArray(updatedData?.tags)
              ? updatedData.tags.join(", ")
              : updatedData?.tags || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.tags.id as keyof TSqlBlogPostDetailUpdate, value)}
        />

        <FormInput info={F_BLOG_POST.og_title} value={updatedData?.og_title || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.og_title.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormInput info={F_BLOG_POST.og_description} value={updatedData?.og_description || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.og_description.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormInput info={F_BLOG_POST.og_image} value={updatedData?.og_image || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.og_image.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormInput info={F_BLOG_POST.og_url} value={updatedData?.og_url || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.og_url.id as keyof TSqlBlogPostDetailUpdate, value)}
        />

        <FormInput info={F_BLOG_POST.local_image_url} value={updatedData?.local_image_url || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.local_image_url.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormInput info={F_BLOG_POST.platform} value={updatedData?.platform || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.platform.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormInput info={F_BLOG_POST.platform_url} value={updatedData?.platform_url || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.platform_url.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormInput info={F_BLOG_POST.published_date} value={updatedData?.published_date || ""} 
          onChange={(value) => handleFieldsChange(F_BLOG_POST.published_date.id as keyof TSqlBlogPostDetailUpdate, value)}
        />

        <FormTextarea
          info={F_BLOG_POST.info_country}
          value={
            Array.isArray(updatedData?.info_country)
              ? updatedData.info_country.join(", ")
              : updatedData?.info_country || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_country.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_city}
          value={
            Array.isArray(updatedData?.info_city)
              ? updatedData.info_city.join(", ")
              : updatedData?.info_city || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_city.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_district}
          value={
            Array.isArray(updatedData?.info_district)
              ? updatedData.info_district.join(", ")
              : updatedData?.info_district || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_district.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_neighborhood}
          value={
            Array.isArray(updatedData?.info_neighborhood)
              ? updatedData.info_neighborhood.join(", ")
              : updatedData?.info_neighborhood || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_neighborhood.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_landmark}
          value={
            Array.isArray(updatedData?.info_landmark)
              ? updatedData.info_landmark.join(", ")
              : updatedData?.info_landmark || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_landmark.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_category}
          value={
            Array.isArray(updatedData?.info_category)
              ? updatedData.info_category.join(", ")
              : updatedData?.info_category || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_category.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_name}
          value={
            Array.isArray(updatedData?.info_name)
              ? updatedData.info_name.join(", ")
              : updatedData?.info_name || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_name.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_special_tag}
          value={
            Array.isArray(updatedData?.info_special_tag)
              ? updatedData.info_special_tag.join(", ")
              : updatedData?.info_special_tag || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_special_tag.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_influencer}
          value={
            Array.isArray(updatedData?.info_influencer)
              ? updatedData.info_influencer.join(", ")
              : updatedData?.info_influencer || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_influencer.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_season}
          value={
            Array.isArray(updatedData?.info_season)
              ? updatedData.info_season.join(", ")
              : updatedData?.info_season || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_season.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_time_of_day}
          value={
            Array.isArray(updatedData?.info_time_of_day)
              ? updatedData.info_time_of_day.join(", ")
              : updatedData?.info_time_of_day || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_time_of_day.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormTextarea
          info={F_BLOG_POST.info_activity_type}
          value={
            Array.isArray(updatedData?.info_activity_type)
              ? updatedData.info_activity_type.join(", ")
              : updatedData?.info_activity_type || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_activity_type.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormRadioGroup
          info={F_BLOG_POST.info_reservation_required}
          values={["true", "false"]}
          value={updatedData?.info_reservation_required ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_reservation_required.id as keyof TSqlBlogPostDetailUpdate, value === "true")}
        />
        <FormTextarea
          info={F_BLOG_POST.info_travel_tips}
          value={
            Array.isArray(updatedData?.info_travel_tips)
              ? updatedData.info_travel_tips.join(", ")
              : updatedData?.info_travel_tips || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.info_travel_tips.id as keyof TSqlBlogPostDetailUpdate, value)}
        />

        <FormInput info={F_BLOG_POST.created_at} value={currentData?.created_at || ""} disabled />
        <FormInput info={F_BLOG_POST.updated_at} value={currentData?.updated_at || ""} disabled />
        <FormInput info={F_BLOG_POST.last_processed_at} value={currentData?.last_processed_at || ""} disabled />
        
        <FormTextarea
          info={F_BLOG_POST.metadata_json}
          value={
            Array.isArray(updatedData?.metadata_json)
              ? updatedData.metadata_json.join(", ")
              : updatedData?.metadata_json || ""
          }
          onChange={(value) => handleFieldsChange(F_BLOG_POST.metadata_json.id as keyof TSqlBlogPostDetailUpdate, value)}
        />
        <FormRadioGroup
          info={F_BLOG_POST.is_active}
          values={["true", "false"]}
          value={updatedData?.is_active ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_BLOG_POST.is_active.id as keyof TSqlBlogPostDetailUpdate, value === "true")}
        />
        <FormRadioGroup
          info={F_BLOG_POST.is_deleted}
          values={["true", "false"]}
          value={updatedData?.is_deleted ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_BLOG_POST.is_deleted.id as keyof TSqlBlogPostDetailUpdate, value === "true")}
        />

        <FormInput info={F_BLOG_POST.deleted_at} value={currentData?.deleted_at || ""} disabled />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/blog-posts/detail/${uuid36}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
