"use client";

import { use, useEffect, useState } from "react";
import { F_YOUTUBE_VIDEO, TSqlYoutubeVideoDetail } from "aiqna_common_v1";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { useRouter } from "next/navigation";
import { reqYouTubeVideoDelete, reqYouTubeVideoGetDetail } from "@/requests/req-admin/req-youtube-video";
import { FormTextarea } from "@/components/form/form-textarea";

/**
 * YouTube Video 상세 페이지
 * @param params YouTube Video ID
 * @returns YouTube Video 상세 페이지
 */
export default function YouTubeVideoDetail({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TSqlYoutubeVideoDetail | null>(null);

  const fetchData = async () => {
    const apiResponse = await reqYouTubeVideoGetDetail(videoId);

    if (apiResponse.success) {
      setData(apiResponse.dbResponse?.data[0] || null);
    } else {
      toast.error(apiResponse.alarm || apiResponse.msg || "Error");
      setData(null);
    }
  };

  const handleDelete = async () => {
    if (!data) {
      toast.error("삭제할 YouTube Video 데이터가 없습니다.");
      return;
    }

    const confirmed = confirm(`정말 ${data.video_id}을 삭제하시겠습니까?`);

    if (!confirmed) return;

    const res = await reqYouTubeVideoDelete(data.video_id);

    if (res.success && res.dbResponse?.data.length === 1) {
      toast.success(res.msg || "삭제 완료되었습니다.");
      router.push("/youtube-videos");
    } else if (res.success && res.dbResponse?.data.length === 0) {
      toast.success("삭제가 진행되었으나 YouTube Video 데이터가 존재하지 않아 처리된 데이터가 없습니다.");
    } else {
      toast.error(res.alarm || res.msg || "삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  return (
    <div>
      <PageTitle title="YouTube Video Detail" />
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput info={F_YOUTUBE_VIDEO.video_id} value={data?.video_id || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.etag} value={data?.etag || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.kind} value={data?.kind || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.title} value={data?.title || ""} disabled />
        <FormTextarea info={F_YOUTUBE_VIDEO.description} value={data?.description || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.published_date} value={data?.published_date?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.is_shorts} value={data?.is_shorts ? "true" : "false"} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.channel_id} value={data?.channel_id || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.channel_name} value={data?.channel_name || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.channel_url} value={data?.channel_url || ""} disabled />
        
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_country}
          value={
            Array.isArray(data?.info_country)
              ? data.info_country.join(", ")
              : data?.info_country || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_city}
          value={
            Array.isArray(data?.info_city)
              ? data.info_city.join(", ")
              : data?.info_city || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_district}
          value={
            Array.isArray(data?.info_district)
              ? data.info_district.join(", ")
              : data?.info_district || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_neighborhood}
          value={
            Array.isArray(data?.info_neighborhood)
              ? data.info_neighborhood.join(", ")
              : data?.info_neighborhood || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_landmark}
          value={
            Array.isArray(data?.info_landmark)
              ? data.info_landmark.join(", ")
              : data?.info_landmark || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_category}
          value={
            Array.isArray(data?.info_category)
              ? data.info_category.join(", ")
              : data?.info_category || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_name}
          value={
            Array.isArray(data?.info_name)
              ? data.info_name.join(", ")
              : data?.info_name || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_special_tag}
          value={
            Array.isArray(data?.info_special_tag)
              ? data.info_special_tag.join(", ")
              : data?.info_special_tag || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_influencer}
          value={
            Array.isArray(data?.info_influencer)
              ? data.info_influencer.join(", ")
              : data?.info_influencer || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_season}
          value={
            Array.isArray(data?.info_season)
              ? data.info_season.join(", ")
              : data?.info_season || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_time_of_day}
          value={
            Array.isArray(data?.info_time_of_day)
              ? data.info_time_of_day.join(", ")
              : data?.info_time_of_day || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_activity_type}
          value={
            Array.isArray(data?.info_activity_type)
              ? data.info_activity_type.join(", ")
              : data?.info_activity_type || ""
          }
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.info_reservation_required}
          values={["true", "false"]}
          value={data?.info_reservation_required ? "true" : "false"}
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.info_travel_tips}
          value={
            Array.isArray(data?.info_travel_tips)
              ? data.info_travel_tips.join(", ")
              : data?.info_travel_tips || ""
          }
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.category_id} value={data?.category_id?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.language} value={data?.language || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.default_audio_language} value={data?.default_audio_language || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.localized_title} value={data?.localized_title || ""} disabled />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.localized_description}
          value={data?.localized_description || ""}
          disabled
        />
        <FormInput info={F_YOUTUBE_VIDEO.live_broadcast_content} value={data?.live_broadcast_content || ""} disabled />

        <FormTextarea
          info={F_YOUTUBE_VIDEO.tags}
          value={
            Array.isArray(data?.tags)
              ? data.tags.join(", ")
              : data?.tags || ""
          }
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.view_count} value={data?.view_count?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.like_count} value={data?.like_count?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.favorite_count} value={data?.favorite_count?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.comment_count} value={data?.comment_count?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.duration_text} value={data?.duration_text || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.duration_seconds} value={data?.duration_seconds?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.dimension} value={data?.dimension || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.definition} value={data?.definition || ""} disabled />

        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.caption}
          values={["true", "false"]}
          value={data?.caption ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.licensed_content}
          values={["true", "false"]}
          value={data?.licensed_content ? "true" : "false"}
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.projection} value={data?.projection || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.upload_status} value={data?.upload_status || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.privacy_status} value={data?.privacy_status || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.license} value={data?.license || ""} disabled />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.embeddable}
          values={["true", "false"]}
          value={data?.embeddable ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.public_stats_viewable}
          values={["true", "false"]}
          value={data?.public_stats_viewable ? "true" : "false"}
          disabled
        />

        <FormTextarea
          info={F_YOUTUBE_VIDEO.topic_ids}
          value={
            Array.isArray(data?.topic_ids)
              ? data.topic_ids.join(", ")
              : data?.topic_ids || ""
          }
          disabled
        />
        <FormTextarea
          info={F_YOUTUBE_VIDEO.relevant_topic_ids}
          value={
            Array.isArray(data?.relevant_topic_ids)
              ? data.relevant_topic_ids.join(", ")
              : data?.relevant_topic_ids || ""
          }
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_default_url} value={data?.thumbnail_default_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_default_width} value={data?.thumbnail_default_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_default_height} value={data?.thumbnail_default_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_medium_url} value={data?.thumbnail_medium_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_medium_width} value={data?.thumbnail_medium_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_medium_height} value={data?.thumbnail_medium_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_high_url} value={data?.thumbnail_high_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_high_width} value={data?.thumbnail_high_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_high_height} value={data?.thumbnail_high_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_standard_url} value={data?.thumbnail_standard_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_standard_width} value={data?.thumbnail_standard_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_standard_height} value={data?.thumbnail_standard_height?.toString() || ""} disabled />

        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_maxres_url} value={data?.thumbnail_maxres_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_maxres_width} value={data?.thumbnail_maxres_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_maxres_height} value={data?.thumbnail_maxres_height?.toString() || ""} disabled />
        
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_url} value={data?.thumbnail_url || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_width} value={data?.thumbnail_width?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.thumbnail_height} value={data?.thumbnail_height?.toString() || ""} disabled />
        
        <FormInput info={F_YOUTUBE_VIDEO.upload_date} value={data?.upload_date?.toString() || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.category} value={data?.category || ""} disabled />

        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_live}
          values={["true", "false"]}
          value={data?.is_live ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_upcoming}
          values={["true", "false"]}
          value={data?.is_upcoming ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_private}
          values={["true", "false"]}
          value={data?.is_private ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.age_restricted}
          values={["true", "false"]}
          value={data?.age_restricted ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.family_safe}
          values={["true", "false"]}
          value={data?.family_safe ? "true" : "false"}
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.created_at} value={data?.created_at || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.updated_at} value={data?.updated_at || ""} disabled />
        <FormInput info={F_YOUTUBE_VIDEO.last_processed_at} value={data?.last_processed_at || ""} disabled />
        
        <FormTextarea
          info={F_YOUTUBE_VIDEO.metadata_json}
          value={
            Array.isArray(data?.metadata_json)
              ? data.metadata_json.join(", ")
              : data?.metadata_json || ""
          }
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_active}
          values={["true", "false"]}
          value={data?.is_active ? "true" : "false"}
          disabled
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_deleted}
          values={["true", "false"]}
          value={data?.is_deleted ? "true" : "false"}
          disabled
        />

        <FormInput info={F_YOUTUBE_VIDEO.deleted_at} value={data?.deleted_at || ""} disabled />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button className="w-24" asChild>
          <Link href={`/youtube-videos/detail/${videoId}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" className="w-24" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
