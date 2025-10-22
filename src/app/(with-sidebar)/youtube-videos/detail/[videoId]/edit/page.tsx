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
import { F_YOUTUBE_VIDEO, TSqlYoutubeVideoDetail, TSqlYoutubeVideoDetailUpdate } from "aiqna_common_v1";
import { reqYouTubeVideoGetDetail, reqYouTubeVideoUpdate } from "@/requests/req-admin/req-youtube-video";

/**
 * YouTube Video 상세 페이지 수정 페이지
 * @param params
 * @returns
 */
export default function YouTubeVideoDetailEdit({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = use(params);
  const router = useRouter();
  const [currentData, setCurrentData] = useState<TSqlYoutubeVideoDetail | null>(null);
  const [updatedData, setUpdatedData] = useState<TSqlYoutubeVideoDetailUpdate>({} as TSqlYoutubeVideoDetailUpdate);

  const fetchData = async () => {
    const apiResponse = await reqYouTubeVideoGetDetail(videoId);

    if (apiResponse.success && apiResponse.dbResponse) {
      const currentData = apiResponse.dbResponse.data[0] || null;

      setCurrentData(currentData);
      setUpdatedData(currentData || {});
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setCurrentData(null);
      setUpdatedData({} as TSqlYoutubeVideoDetailUpdate);
    }
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  const handleFieldsChange = <K extends keyof TSqlYoutubeVideoDetailUpdate>(key: K, value: TSqlYoutubeVideoDetailUpdate[K]) => {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modifiedData = getOnlyModifiedData<TSqlYoutubeVideoDetail>(currentData || {}, updatedData);

    if (Object.keys(modifiedData).length > 0) {
      const result = await reqYouTubeVideoUpdate(videoId, modifiedData as TSqlYoutubeVideoDetailUpdate);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/youtube-videos/detail/${videoId}`);
      } else if (result.success && result.dbResponse?.data.length && result.dbResponse.data.length === 0) {
        toast.error("Response Success but YouTube Video data does not updated. Please check the data.");
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      toast.info("No changes to save");
    }
  };

  return (
    <div>
      <PageTitle title="Edit YouTube Video" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_YOUTUBE_VIDEO.video_id} value={currentData?.video_id || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.etag} value={currentData?.etag || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.kind} value={currentData?.kind || ""} disabled />
        <FormInput
          info={F_YOUTUBE_VIDEO.title}
          value={updatedData?.title || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.title.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.description}
          value={updatedData?.description || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.description.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormInput info={F_YOUTUBE_VIDEO.published_date} value={currentData?.published_date?.toString() || ""} disabled />
        
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_shorts}
          values={["true", "false"]}
          value={updatedData?.is_shorts ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.is_shorts.id as keyof TSqlYoutubeVideoDetailUpdate, value === "true")}
        />
        <FormInput
          info={F_YOUTUBE_VIDEO.channel_id}
          value={updatedData?.channel_id || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.channel_id.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormInput
          info={F_YOUTUBE_VIDEO.channel_name}
          value={updatedData?.channel_name || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.channel_name.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormInput
          info={F_YOUTUBE_VIDEO.channel_url}
          value={updatedData?.channel_url || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.channel_url.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_country}
          value={
            Array.isArray(updatedData?.info_country)
              ? updatedData.info_country.join(", ")
              : updatedData?.info_country || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_country.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_city}
          value={
            Array.isArray(updatedData?.info_city)
              ? updatedData.info_city.join(", ")
              : updatedData?.info_city || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_city.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_district}
          value={
            Array.isArray(updatedData?.info_district)
              ? updatedData.info_district.join(", ")
              : updatedData?.info_district || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_district.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_neighborhood}
          value={
            Array.isArray(updatedData?.info_neighborhood)
              ? updatedData.info_neighborhood.join(", ")
              : updatedData?.info_neighborhood || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_neighborhood.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_landmark}
          value={
            Array.isArray(updatedData?.info_landmark)
              ? updatedData.info_landmark.join(", ")
              : updatedData?.info_landmark || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_landmark.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_category}
          value={
            Array.isArray(updatedData?.info_category)
              ? updatedData.info_category.join(", ")
              : updatedData?.info_category || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_category.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_name}
          value={
            Array.isArray(updatedData?.info_name)
              ? updatedData.info_name.join(", ")
              : updatedData?.info_name || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_name.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_special_tag}
          value={
            Array.isArray(updatedData?.info_special_tag)
              ? updatedData.info_special_tag.join(", ")
              : updatedData?.info_special_tag || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_special_tag.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_influencer}
          value={
            Array.isArray(updatedData?.info_influencer)
              ? updatedData.info_influencer.join(", ")
              : updatedData?.info_influencer || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_influencer.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_season}
          value={
            Array.isArray(updatedData?.info_season)
              ? updatedData.info_season.join(", ")
              : updatedData?.info_season || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_season.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_time_of_day}
          value={
            Array.isArray(updatedData?.info_time_of_day)
              ? updatedData.info_time_of_day.join(", ")
              : updatedData?.info_time_of_day || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_time_of_day.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_activity_type}
          value={
            Array.isArray(updatedData?.info_activity_type)
              ? updatedData.info_activity_type.join(", ")
              : updatedData?.info_activity_type || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_activity_type.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.info_reservation_required}
          values={["true", "false"]}
          value={updatedData?.info_reservation_required ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_reservation_required.id as keyof TSqlYoutubeVideoDetailUpdate, value === "true")}
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_travel_tips}
          value={
            Array.isArray(updatedData?.info_travel_tips)
              ? updatedData.info_travel_tips.join(", ")
              : updatedData?.info_travel_tips || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.info_travel_tips.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />

        <FormInput info={F_YOUTUBE_VIDEO.category_id} value={currentData?.category_id?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.language} value={updatedData?.language || ""} 
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.language.id as keyof TSqlYoutubeVideoDetailUpdate, value)} />
        <FormInput info={F_YOUTUBE_VIDEO.default_audio_language} value={updatedData?.default_audio_language || ""} 
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.default_audio_language.id as keyof TSqlYoutubeVideoDetailUpdate, value)} />
        <FormInput info={F_YOUTUBE_VIDEO.localized_title} value={updatedData?.localized_title || ""} 
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.localized_title.id as keyof TSqlYoutubeVideoDetailUpdate, value)} />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.localized_description}
          value={updatedData?.localized_description || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.localized_description.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />
        <FormInput info={F_YOUTUBE_VIDEO.live_broadcast_content} value={currentData?.live_broadcast_content || ""} disabled />

        <FormTextarea
          info={F_YOUTUBE_VIDEO.tags}
          value={
            Array.isArray(updatedData?.tags)
              ? updatedData.tags.join(", ")
              : updatedData?.tags || ""
          }
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.tags.id as keyof TSqlYoutubeVideoDetailUpdate, value)}
        />

        <FormInput info={F_YOUTUBE_VIDEO.view_count} value={currentData?.view_count?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.like_count} value={currentData?.like_count?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.favorite_count} value={currentData?.favorite_count?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.comment_count} value={currentData?.comment_count?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.duration_text} value={currentData?.duration_text || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.duration_seconds} value={currentData?.duration_seconds?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.dimension} value={currentData?.dimension || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.definition} value={currentData?.definition || ""} disabled />

        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.caption}
          values={["true", "false"]}
          value={currentData?.caption ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.licensed_content}
          values={["true", "false"]}
          value={currentData?.licensed_content ? "true" : "false"}
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.projection} value={currentData?.projection || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.upload_status} value={currentData?.upload_status || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.privacy_status} value={currentData?.privacy_status || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.license} value={currentData?.license || ""} disabled />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.embeddable}
          values={["true", "false"]}
          value={currentData?.embeddable ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.public_stats_viewable}
          values={["true", "false"]}
          value={currentData?.public_stats_viewable ? "true" : "false"}
          disabled
        />

        <FormTextarea
          info={F_YOUTUBE_VIDEO.topic_ids}
          value={
            Array.isArray(currentData?.topic_ids)
              ? currentData.topic_ids.join(", ")
              : currentData?.topic_ids || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.relevant_topic_ids}
          value={
            Array.isArray(currentData?.relevant_topic_ids)
              ? currentData.relevant_topic_ids.join(", ")
              : currentData?.relevant_topic_ids || ""
          }
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_default_url} value={currentData?.thumbnail_default_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_default_width} value={currentData?.thumbnail_default_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_default_height} value={currentData?.thumbnail_default_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_medium_url} value={currentData?.thumbnail_medium_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_medium_width} value={currentData?.thumbnail_medium_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_medium_height} value={currentData?.thumbnail_medium_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_high_url} value={currentData?.thumbnail_high_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_high_width} value={currentData?.thumbnail_high_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_high_height} value={currentData?.thumbnail_high_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_standard_url} value={currentData?.thumbnail_standard_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_standard_width} value={currentData?.thumbnail_standard_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_standard_height} value={currentData?.thumbnail_standard_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_maxres_url} value={currentData?.thumbnail_maxres_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_maxres_width} value={currentData?.thumbnail_maxres_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_maxres_height} value={currentData?.thumbnail_maxres_height?.toString() || ""} disabled />
        
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_url} value={updatedData?.thumbnail_url || ""} 
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.thumbnail_url.id as keyof TSqlYoutubeVideoDetailUpdate, value)} />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_width} value={updatedData?.thumbnail_width?.toString() || ""} 
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.thumbnail_width.id as keyof TSqlYoutubeVideoDetailUpdate, value)} />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_height} value={updatedData?.thumbnail_height?.toString() || ""} 
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.thumbnail_height.id as keyof TSqlYoutubeVideoDetailUpdate, value)} />
        
        <FormInput info={F_YOUTUBE_VIDEO.upload_date} value={currentData?.upload_date?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.category} value={currentData?.category || ""} disabled />

        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_live}
          values={["true", "false"]}
          value={currentData?.is_live ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_upcoming}
          values={["true", "false"]}
          value={currentData?.is_upcoming ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_private}
          values={["true", "false"]}
          value={currentData?.is_private ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.age_restricted}
          values={["true", "false"]}
          value={currentData?.age_restricted ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.family_safe}
          values={["true", "false"]}
          value={currentData?.family_safe ? "true" : "false"}
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.created_at} value={currentData?.created_at || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.updated_at} value={currentData?.updated_at || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.last_processed_at} value={currentData?.last_processed_at || ""} disabled />
        
        <FormTextarea
          info={F_YOUTUBE_VIDEO.metadata_json}
          value={
            Array.isArray(currentData?.metadata_json)
              ? currentData.metadata_json.join(", ")
              : currentData?.metadata_json || ""
          }
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_active}
          values={["true", "false"]}
          value={updatedData?.is_active ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.is_active.id as keyof TSqlYoutubeVideoDetailUpdate, value === "true")}
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_deleted}
          values={["true", "false"]}
          value={updatedData?.is_deleted ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.is_deleted.id as keyof TSqlYoutubeVideoDetailUpdate, value === "true")}
        />

        <FormInput info={F_YOUTUBE_VIDEO.deleted_at} value={currentData?.deleted_at || ""} disabled />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/youtube-videos/detail/${videoId}`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
