"use client";

import { use, useEffect, useState } from "react";
import { F_TEXT, TSqlTextDetail } from "aiqna_common_v1";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { useRouter } from "next/navigation";
import { FormTextarea } from "@/components/form/form-textarea";
import { reqTextDelete, reqTextGetDetail } from "@/requests/req-admin/req-text";

/**
 * Text 상세 페이지
 * @param params Text Hash Key
 * @returns Text 상세 페이지
 */
export default function TextDetail({ params }: { params: Promise<{ hashKey: string }> }) {
  const { hashKey } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TSqlTextDetail | null>(null);

  const fetchData = async () => {
    const apiResponse = await reqTextGetDetail(hashKey);

    if (apiResponse.success) {
      setData(apiResponse.dbResponse?.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setData(null);
    }
  };

  const handleDelete = async () => {
    if (!data) {
      toast.error("삭제할 Text 데이터가 없습니다.");
      return;
    }

    const confirmed = confirm(`정말 ${data.hash_key}을 삭제하시겠습니까?`);

    if (!confirmed) return;

    const res = await reqTextDelete(data.hash_key);

    if (res.success && res.dbResponse?.data.length === 1) {
      toast.success(res.msg || "삭제 완료되었습니다.");
      router.push("/texts");
    } else if (res.success && res.dbResponse?.data.length === 0) {
      toast.success("삭제가 진행되었으나 Text 데이터가 존재하지 않아 처리된 데이터가 없습니다.");
    } else {
      toast.error(res.alarm || res.msg || "삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [hashKey]);

  return (
    <div>
      <PageTitle title="Text Detail" />
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_TEXT.hash_key} value={data?.hash_key || ""} disabled />
        <FormInput info={F_TEXT.title} value={data?.title || ""} disabled  />
        <FormTextarea info={F_TEXT.content} value={data?.content || ""} disabled />

        <FormTextarea
          info={F_TEXT.info_country}
          value={
            Array.isArray(data?.info_country)
              ? data.info_country.join(", ")
              : data?.info_country || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_city}
          value={
            Array.isArray(data?.info_city)
              ? data.info_city.join(", ")
              : data?.info_city || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_district}
          value={
            Array.isArray(data?.info_district)
              ? data.info_district.join(", ")
              : data?.info_district || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_neighborhood}
          value={
            Array.isArray(data?.info_neighborhood)
              ? data.info_neighborhood.join(", ")
              : data?.info_neighborhood || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_landmark}
          value={
            Array.isArray(data?.info_landmark)
              ? data.info_landmark.join(", ")
              : data?.info_landmark || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_category}
          value={
            Array.isArray(data?.info_category)
              ? data.info_category.join(", ")
              : data?.info_category || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_name}
          value={
            Array.isArray(data?.info_name)
              ? data.info_name.join(", ")
              : data?.info_name || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_special_tag}
          value={
            Array.isArray(data?.info_special_tag)
              ? data.info_special_tag.join(", ")
              : data?.info_special_tag || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_influencer}
          value={
            Array.isArray(data?.info_influencer)
              ? data.info_influencer.join(", ")
              : data?.info_influencer || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_season}
          value={
            Array.isArray(data?.info_season)
              ? data.info_season.join(", ")
              : data?.info_season || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_time_of_day}
          value={
            Array.isArray(data?.info_time_of_day)
              ? data.info_time_of_day.join(", ")
              : data?.info_time_of_day || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_activity_type}
          value={
            Array.isArray(data?.info_activity_type)
              ? data.info_activity_type.join(", ")
              : data?.info_activity_type || ""
          }
          disabled
        />
        <FormTextarea
          info={F_TEXT.info_travel_tips}
          value={
            Array.isArray(data?.info_travel_tips)
              ? data.info_travel_tips.join(", ")
              : data?.info_travel_tips || ""
          }
          disabled
        />

        <FormInput info={F_TEXT.created_at} value={data?.created_at || ""} disabled />
        <FormInput info={F_TEXT.updated_at} value={data?.updated_at || ""} disabled />
        <FormInput info={F_TEXT.last_processed_at} value={data?.last_processed_at || ""} disabled />
        
        <FormTextarea
          info={F_TEXT.metadata_json}
          value={
            Array.isArray(data?.metadata_json)
              ? data.metadata_json.join(", ")
              : data?.metadata_json || ""
          }
          disabled
        />
        <FormRadioGroup
          info={F_TEXT.is_active}
          values={["true", "false"]}
          value={data?.is_active ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_TEXT.is_deleted}
          values={["true", "false"]}
          value={data?.is_deleted ? "true" : "false"}
          disabled
        />

        <FormInput info={F_TEXT.deleted_at} value={data?.deleted_at || ""} disabled />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button className="w-24" asChild>
          <Link href={`/texts/detail/${hashKey}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" className="w-24" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
