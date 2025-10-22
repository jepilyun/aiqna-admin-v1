"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormSearchBox } from "@/components/form/form-search-box";
import ListPagination from "@/components/common/list-pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { LIST_LIMIT, TSqlYoutubeVideoList } from "aiqna_common_v1";
import { reqYouTubeVideoGetList } from "@/requests/req-admin/req-youtube-video";
import { TableYouTubeVideoList, TableYouTubeVideoListRow } from "@/components/youtube-video/table-youtube-video-list";

/**
 * YouTube Video 목록 페이지
 * @returns YouTube Video 목록 페이지
 */
export default function YouTubeVideoList() {
  const router = useRouter();
  const [data, setData] = useState<TSqlYoutubeVideoList[]>([]);
  const [start, setStart] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cache, setCache] = useState<Record<string, TSqlYoutubeVideoList[]>>({});
  const [keyword, setKeyword] = useState<string>("");

  // 캐시 키 useMemo 처리
  const cacheKey = useMemo(() => `YouTubeVideo_${start}`, [start]);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      return;
    }

    const fetchData = async () => {
      const apiResponse = await reqYouTubeVideoGetList(start);

      if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length > 0) {
        const { data: youtubeVideos, count } = apiResponse.dbResponse;
        setData(youtubeVideos || []);
        setCache((prev) => ({ ...prev, [cacheKey]: youtubeVideos || [] }));
        setTotalPages(Math.ceil((count || 0) / LIST_LIMIT.default));
      } else if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length === 0) {
        setData([]);
        toast.error("Response Success but YouTube Video data does not exist. Please check the data.");
      } else {
        toast.error(apiResponse.alarm || apiResponse.msg || "Error");
        setData([]);
      }
    };

    fetchData();
  }, [cacheKey]);

  const handleSearch = (value: string | null | undefined) => {
    if (value && value.length > 0) {
      router.push(`/youtube-videos/search/${value}`);
    } else {
      toast.error("Please enter a search keyword.");
    }
  };

  const rows = useMemo(() => {
    return data.map((item) => <TableYouTubeVideoListRow key={item.video_id} youtubeVideo={item} />);
  }, [data]);

  return (
    <div className="mt-4 max-w-full">
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <FormSearchBox
            info={{ id: "search-input", label: "Search", placeholder: "Search", is_required: false }}
            value={keyword}
            onChange={(value) => setKeyword(value)}
            search={handleSearch}
          />
          <Link href="/youtube-videos/create" className="flex items-center justify-center">
            <Button variant="outline">
              <Plus />
            </Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <TableYouTubeVideoList renderedRows={rows} />
      </div>
      <ListPagination start={start} total={totalPages} setStart={setStart} />
    </div>
  );
}
