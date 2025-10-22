"use client";

import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getOnlyModifiedData } from "@/utils/get-modified-data";
import { F_TEXT, TSqlTextDetail, TSqlTextDetailUpdate } from "aiqna_common_v1";
import { reqTextGetDetail, reqTextUpdate } from "@/requests/req-admin/req-text";
import { FormRadioGroup } from "@/components/form/form-radio-group";

/**
 * Text 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function TextDetailEdit({ params }: { params: Promise<{ hashKey: string }> }) {
  const { hashKey } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TSqlTextDetail | null>(null);
  const [updatedData, setUpdatedData] = useState<TSqlTextDetailUpdate>({} as TSqlTextDetailUpdate);

  const fetchData = async () => {
    const apiResponse = await reqTextGetDetail(hashKey);

    if (apiResponse.success && apiResponse.dbResponse) {
      const currentData = apiResponse.dbResponse.data[0] || null;

      setCurrentData(currentData);
      setUpdatedData(currentData || {});
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setCurrentData(null);
      setUpdatedData({} as TSqlTextDetailUpdate);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hashKey]);

  const handleFieldsChange = <K extends keyof TSqlTextDetailUpdate>(key: K, value: TSqlTextDetailUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TSqlTextDetailUpdate>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      const result = await reqTextUpdate(hashKey, modifiedData as TSqlTextDetailUpdate);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/texts/detail/${hashKey}`);
      } else if (result.success && result.dbResponse?.data.length && result.dbResponse.data.length === 0) {
        toast.error("Response Success but Text data does not updated. Please check the data.");
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      toast.info("No changes to save");
    }
  };

  return (
    <div>
      <PageTitle title="Edit Text" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_TEXT.hash_key} value={currentData?.hash_key || ""} disabled />
        <FormInput info={F_TEXT.title} value={updatedData?.title || ""} 
          onChange={(value) => handleFieldsChange(F_TEXT.title.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea info={F_TEXT.content} value={updatedData?.content || ""} 
          onChange={(value) => handleFieldsChange(F_TEXT.content.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_country}
          value={
            Array.isArray(updatedData?.info_country)
              ? updatedData.info_country.join(", ")
              : updatedData?.info_country || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_country.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_city}
          value={
            Array.isArray(updatedData?.info_city)
              ? updatedData.info_city.join(", ")
              : updatedData?.info_city || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_city.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_district}
          value={
            Array.isArray(updatedData?.info_district)
              ? updatedData.info_district.join(", ")
              : updatedData?.info_district || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_district.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_neighborhood}
          value={
            Array.isArray(updatedData?.info_neighborhood)
              ? updatedData.info_neighborhood.join(", ")
              : updatedData?.info_neighborhood || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_neighborhood.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_landmark}
          value={
            Array.isArray(updatedData?.info_landmark)
              ? updatedData.info_landmark.join(", ")
              : updatedData?.info_landmark || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_landmark.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_category}
          value={
            Array.isArray(updatedData?.info_category)
              ? updatedData.info_category.join(", ")
              : updatedData?.info_category || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_category.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_name}
          value={
            Array.isArray(updatedData?.info_name)
              ? updatedData.info_name.join(", ")
              : updatedData?.info_name || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_name.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_special_tag}
          value={
            Array.isArray(updatedData?.info_special_tag)
              ? updatedData.info_special_tag.join(", ")
              : updatedData?.info_special_tag || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_special_tag.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_influencer}
          value={
            Array.isArray(updatedData?.info_influencer)
              ? updatedData.info_influencer.join(", ")
              : updatedData?.info_influencer || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_influencer.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_season}
          value={
            Array.isArray(updatedData?.info_season)
              ? updatedData.info_season.join(", ")
              : updatedData?.info_season || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_season.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_time_of_day}
          value={
            Array.isArray(updatedData?.info_time_of_day)
              ? updatedData.info_time_of_day.join(", ")
              : updatedData?.info_time_of_day || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_time_of_day.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormTextarea
          info={F_TEXT.info_activity_type}
          value={
            Array.isArray(updatedData?.info_activity_type)
              ? updatedData.info_activity_type.join(", ")
              : updatedData?.info_activity_type || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_activity_type.id as keyof TSqlTextDetailUpdate, value)}
        />
        <FormRadioGroup
          info={F_TEXT.info_reservation_required}
          values={["true", "false"]}
          value={updatedData?.info_reservation_required ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_TEXT.info_reservation_required.id as keyof TSqlTextDetailUpdate, value === "true")}
        />
        <FormTextarea
          info={F_TEXT.info_travel_tips}
          value={
            Array.isArray(updatedData?.info_travel_tips)
              ? updatedData.info_travel_tips.join(", ")
              : updatedData?.info_travel_tips || ""
          }
          onChange={(value) => handleFieldsChange(F_TEXT.info_travel_tips.id as keyof TSqlTextDetailUpdate, value)}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/texts/detail/${hashKey}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
