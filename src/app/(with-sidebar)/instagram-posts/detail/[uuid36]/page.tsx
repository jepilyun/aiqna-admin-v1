"use client";

import { use, useEffect, useState } from "react";
import { F_INSTAGRAM_POST, TSqlInstagramPostDetail } from "aiqna_common_v1";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { useRouter } from "next/navigation";
import { FormTextarea } from "@/components/form/form-textarea";
import { reqInstagramPostDelete, reqInstagramPostGetDetail } from "@/requests/req-admin/req-instagram-post";

/**
 * Instagram Post 상세 페이지
 * @param params YouTube Video ID
 * @returns Instagram Post 상세 페이지
 */
export default function InstagramPostDetail({ params }: { params: Promise<{ uuid36: string }> }) {
  const { uuid36 } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TSqlInstagramPostDetail | null>(null);

  const fetchData = async () => {
    const apiResponse = await reqInstagramPostGetDetail(uuid36);

    if (apiResponse.success) {
      setData(apiResponse.dbResponse?.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setData(null);
    }
  };

  const handleDelete = async () => {
    if (!data) {
      toast.error("삭제할 Instagram Post 데이터가 없습니다.");
      return;
    }

    const confirmed = confirm(`정말 ${data.uuid_36}을 삭제하시겠습니까?`);

    if (!confirmed) return;

    const res = await reqInstagramPostDelete(data.uuid_36);

    if (res.success && res.dbResponse?.data.length === 1) {
      toast.success(res.msg || "삭제 완료되었습니다.");
      router.push("/instagram-posts");
    } else if (res.success && res.dbResponse?.data.length === 0) {
      toast.success("삭제가 진행되었으나 Instagram Post 데이터가 존재하지 않아 처리된 데이터가 없습니다.");
    } else {
      toast.error(res.alarm || res.msg || "삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [uuid36]);

  return (
    <div>
      <PageTitle title="Instagram Post Detail" />
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_INSTAGRAM_POST.uuid_36} value={data?.uuid_36 || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.instagram_post_url} value={data?.instagram_post_url || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.post_type} value={data?.post_type || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.media_count} value={data?.media_count?.toString() || ""} disabled />
        <FormTextarea info={F_INSTAGRAM_POST.media_urls} value={data?.media_urls ? data.media_urls.join(", ") : ""} disabled />

        <FormInput info={F_INSTAGRAM_POST.og_title} value={data?.og_title || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.og_description} value={data?.og_description || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.og_image} value={data?.og_image || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.og_url} value={data?.og_url || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.og_ios_url} value={data?.og_ios_url || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.og_android_package} value={data?.og_android_package || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.og_android_url} value={data?.og_android_url || ""} disabled />
        

        <FormTextarea
          info={F_INSTAGRAM_POST.info_country}
          value={
            Array.isArray(data?.info_country)
              ? data.info_country.join(", ")
              : data?.info_country || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_city}
          value={
            Array.isArray(data?.info_city)
              ? data.info_city.join(", ")
              : data?.info_city || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_district}
          value={
            Array.isArray(data?.info_district)
              ? data.info_district.join(", ")
              : data?.info_district || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_neighborhood}
          value={
            Array.isArray(data?.info_neighborhood)
              ? data.info_neighborhood.join(", ")
              : data?.info_neighborhood || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_landmark}
          value={
            Array.isArray(data?.info_landmark)
              ? data.info_landmark.join(", ")
              : data?.info_landmark || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_category}
          value={
            Array.isArray(data?.info_category)
              ? data.info_category.join(", ")
              : data?.info_category || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_name}
          value={
            Array.isArray(data?.info_name)
              ? data.info_name.join(", ")
              : data?.info_name || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_special_tag}
          value={
            Array.isArray(data?.info_special_tag)
              ? data.info_special_tag.join(", ")
              : data?.info_special_tag || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_influencer}
          value={
            Array.isArray(data?.info_influencer)
              ? data.info_influencer.join(", ")
              : data?.info_influencer || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_season}
          value={
            Array.isArray(data?.info_season)
              ? data.info_season.join(", ")
              : data?.info_season || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_time_of_day}
          value={
            Array.isArray(data?.info_time_of_day)
              ? data.info_time_of_day.join(", ")
              : data?.info_time_of_day || ""
          }
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_activity_type}
          value={
            Array.isArray(data?.info_activity_type)
              ? data.info_activity_type.join(", ")
              : data?.info_activity_type || ""
          }
          disabled
        />
        <FormRadioGroup
          info={F_INSTAGRAM_POST.info_reservation_required}
          values={["true", "false"]}
          value={data?.info_reservation_required ? "true" : "false"}
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.info_travel_tips}
          value={
            Array.isArray(data?.info_travel_tips)
              ? data.info_travel_tips.join(", ")
              : data?.info_travel_tips || ""
          }
          disabled
        />

        <FormInput info={F_INSTAGRAM_POST.view_count} value={data?.view_count?.toString() || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.like_count} value={data?.like_count?.toString() || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.comment_count} value={data?.comment_count?.toString() || ""} disabled />

        <FormTextarea
          info={F_INSTAGRAM_POST.description}
          value={data?.description || ""}
          disabled
        />
        <FormTextarea
          info={F_INSTAGRAM_POST.tags}
          value={
            Array.isArray(data?.tags)
              ? data.tags.join(", ")
              : data?.tags || ""
          }
          disabled
        />

        <FormInput info={F_INSTAGRAM_POST.user_id} value={data?.user_id || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.user_name} value={data?.user_name || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.user_profile_url} value={data?.user_profile_url || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.published_date} value={data?.published_date || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.local_image_url} value={data?.local_image_url || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.location_name} value={data?.location_name || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.location_id} value={data?.location_id || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.latitude} value={data?.latitude || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.longitude} value={data?.longitude || ""} disabled />

        <FormInput info={F_INSTAGRAM_POST.created_at} value={data?.created_at || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.updated_at} value={data?.updated_at || ""} disabled />
        <FormInput info={F_INSTAGRAM_POST.last_processed_at} value={data?.last_processed_at || ""} disabled />
        
        <FormTextarea
          info={F_INSTAGRAM_POST.metadata_json}
          value={
            Array.isArray(data?.metadata_json)
              ? data.metadata_json.join(", ")
              : data?.metadata_json || ""
          }
          disabled
        />
        <FormRadioGroup
          info={F_INSTAGRAM_POST.is_active}
          values={["true", "false"]}
          value={data?.is_active ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_INSTAGRAM_POST.is_deleted}
          values={["true", "false"]}
          value={data?.is_deleted ? "true" : "false"}
          disabled
        />

        <FormInput info={F_INSTAGRAM_POST.deleted_at} value={data?.deleted_at || ""} disabled />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button className="w-24" asChild>
          <Link href={`/instagram-posts/detail/${uuid36}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" className="w-24" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
