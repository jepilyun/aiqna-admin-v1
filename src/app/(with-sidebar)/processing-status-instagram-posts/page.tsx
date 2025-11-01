"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { FormSearchBox } from "@/components/form/form-search-box";
import ListPagination from "@/components/common/list-pagination";
import { toast } from "sonner";
import { LIST_LIMIT, TSqlProcessingLogInstagramPost } from "aiqna_common_v1";
import { reqProcessingStatusInstagramPostGetList } from "@/requests/req-admin/req-processing-status-instagram-post";
import { TableProcessingStatusInstagramPostList, TableProcessingStatusInstagramPostListRow } from "@/components/processing-status-instagram-post/table-processing-status-instagram-post-list";

/**
 * YouTube Video 처리 상태 목록 페이지
 * @returns YouTube Video 처리 상태 목록 페이지
 */
export default function ProcessingStatusInstagramPostList() {
  const router = useRouter();
  const [data, setData] = useState<TSqlProcessingLogInstagramPost[]>([]);
  const [start, setStart] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cache, setCache] = useState<Record<string, TSqlProcessingLogInstagramPost[]>>({});
  const [keyword, setKeyword] = useState<string>("");

  // 캐시 키 useMemo 처리
  const cacheKey = useMemo(() => `ProcessingStatusInstagramPost_${start}`, [start]);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      return;
    }

    const fetchData = async () => {
      const apiResponse = await reqProcessingStatusInstagramPostGetList(start);

      if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length > 0) {
        const { data: processingStatusInstagramPosts, count } = apiResponse.dbResponse;
        setData(processingStatusInstagramPosts || []);
        setCache((prev) => ({ ...prev, [cacheKey]: processingStatusInstagramPosts || [] }));
        setTotalPages(Math.ceil((count || 0) / LIST_LIMIT.default));
      } else if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length === 0) {
        setData([]);
        toast.error("Response Success but Processing Status Instagram Post data does not exist. Please check the data.");
      } else {
        toast.error(apiResponse.alarm || apiResponse.msg || "Error");
        setData([]);
      }
    };

    fetchData();
  }, [cacheKey]);

  const handleSearch = (value: string | null | undefined) => {
    if (value && value.length > 0) {
      router.push(`/processing-status-instagram-posts/search/${value}`);
    } else {
      toast.error("Please enter a search keyword.");
    }
  };

  const rows = useMemo(() => {
    return data.map((item) => <TableProcessingStatusInstagramPostListRow key={item.id} processingStatusInstagramPost={item} />);
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
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <TableProcessingStatusInstagramPostList renderedRows={rows} />
      </div>
      <ListPagination start={start} total={totalPages} setStart={setStart} />
    </div>
  );
}
