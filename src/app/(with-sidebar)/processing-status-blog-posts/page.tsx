"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { FormSearchBox } from "@/components/form/form-search-box";
import ListPagination from "@/components/common/list-pagination";
import { toast } from "sonner";
import { LIST_LIMIT, TSqlProcessingLogBlogPost } from "aiqna_common_v1";
import { reqProcessingStatusBlogPostGetList } from "@/requests/req-admin/req-processing-status-blog-post";
import { TableProcessingStatusBlogPostList, TableProcessingStatusBlogPostListRow } from "@/components/processing-status-blog-post/table-processing-status-blog-post";

/**
 * YouTube Video 처리 상태 목록 페이지
 * @returns YouTube Video 처리 상태 목록 페이지
 */
export default function ProcessingStatusBlogPostList() {
  const router = useRouter();
  const [data, setData] = useState<TSqlProcessingLogBlogPost[]>([]);
  const [start, setStart] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cache, setCache] = useState<Record<string, TSqlProcessingLogBlogPost[]>>({});
  const [keyword, setKeyword] = useState<string>("");

  // 캐시 키 useMemo 처리
  const cacheKey = useMemo(() => `ProcessingStatusBlogPost_${start}`, [start]);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      return;
    }

    const fetchData = async () => {
      const apiResponse = await reqProcessingStatusBlogPostGetList(start);

      if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length > 0) {
        const { data: processingStatusBlogPosts, count } = apiResponse.dbResponse;
        setData(processingStatusBlogPosts || []);
        setCache((prev) => ({ ...prev, [cacheKey]: processingStatusBlogPosts || [] }));
        setTotalPages(Math.ceil((count || 0) / LIST_LIMIT.default));
      } else if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length === 0) {
        setData([]);
        toast.error("Response Success but Processing Status Blog Post data does not exist. Please check the data.");
      } else {
        toast.error(apiResponse.alarm || apiResponse.msg || "Error");
        setData([]);
      }
    };

    fetchData();
  }, [cacheKey]);

  const handleSearch = (value: string | null | undefined) => {
    if (value && value.length > 0) {
      router.push(`/processing-status-blog-posts/search/${value}`);
    } else {
      toast.error("Please enter a search keyword.");
    }
  };

  const rows = useMemo(() => {
    return data.map((item) => <TableProcessingStatusBlogPostListRow key={item.id} processingStatusBlogPost={item} />);
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
        <TableProcessingStatusBlogPostList renderedRows={rows} />
      </div>
      <ListPagination start={start} total={totalPages} setStart={setStart} />
    </div>
  );
}
