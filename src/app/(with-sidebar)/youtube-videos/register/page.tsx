"use client";

import { FormInput } from "@/components/form/form-input";
import { FormRadioGroup } from "@/components/form/form-radio-group";
import { PageTitle } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { F_YOUTUBE_VIDEO, TSqlYoutubeVideoDetailInsert } from "aiqna_common_v1";
import { reqYouTubeVideoRegister } from "@/requests/req-admin/req-youtube-video";

/**
 * YouTube Video 등록 페이지
 * @returns YouTube Video 등록 페이지
 */
export default function YouTubeVideoRegister() {
  const router = useRouter();
  const [data, setData] = useState<TSqlYoutubeVideoDetailInsert>({
    is_shorts: false,
  } as TSqlYoutubeVideoDetailInsert);

  const handleFieldsChange = <K extends keyof TSqlYoutubeVideoDetailInsert>(key: K, value: TSqlYoutubeVideoDetailInsert[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.video_id) {
      const result = await reqYouTubeVideoRegister(data);

      if (result.success) {
        toast.success(result.msg || "Success");
        router.push(`/youtube-videos/detail/${data.video_id}`);
      } else {
        toast.error(result.error || result.alarm || result.msg || "Error");
      }
    } else {
      if (!data.video_id) {
        toast.error("Video ID is required");
      }
    }
  };

  return (
    <div>
      <PageTitle title="YouTube Video Register" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-5xl mx-auto">
        <FormInput
          info={F_YOUTUBE_VIDEO.video_id}
          value={data?.video_id || ""}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.video_id.id as keyof TSqlYoutubeVideoDetailInsert, value)}
        />
        <FormRadioGroup
          info={F_YOUTUBE_VIDEO.is_shorts}
          values={["true", "false"]}
          value={data?.is_shorts ? "true" : "false"}
          onChange={(value) => handleFieldsChange(F_YOUTUBE_VIDEO.is_shorts.id as keyof TSqlYoutubeVideoDetailInsert, value === "true")}
        />
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button className="w-24" asChild>
            <Link href={`/youtube-videos`}>Cancel</Link>
          </Button>
          <Button type="submit" className="w-24">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
