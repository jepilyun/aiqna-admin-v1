"use client";

import { use, useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormSearchBox } from "@/components/form/form-search-box";
import ListPagination from "@/components/common/list-pagination";
import { TableAdministratorList, TableAdministratorListRow } from "@/components/table/table-administrator-list";
import { Button } from "@/components/ui/button";
import { reqAdminSearchByKeyword } from "@/requests/req-admin/req-admin";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { LIST_LIMIT, TAdmin } from "aiqna_common_v1";

/**
 * 관리자 검색 결과 페이지
 * @returns 관리자 검색 결과 페이지
 * @route /administrators/search/[searchKeyword]
 */
export default function AdministratorSearch({ params }: { params: Promise<{ searchKeyword: string }> }) {
  const { searchKeyword } = use(params);
  const router = useRouter();
  const [data, setData] = useState<TAdmin[]>([]);
  const [start, setStart] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState<string>(decodeURIComponent(searchKeyword));

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await reqAdminSearchByKeyword(keyword, start);

      if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length > 0) {
        const { data: administrators, count } = apiResponse.dbResponse;
        setData(administrators || []);
        setTotalPages(Math.ceil((count || 0) / LIST_LIMIT.default));
      } else if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length === 0) {
        setData([]);
        toast.error("Response Success but Administrator data does not exist. Please check the data.");
      } else {
        toast.error(apiResponse.alarm || apiResponse.msg || "Error");
        setData([]);
      }
    };

    fetchData();
  }, []); // searchKeyword, page 가 변경되면 cityCacheKey 가 변경되므로 렌더링 최적화를 위해 캐시 키 사용

  const handleSearch = (value: string | null | undefined) => {
    if (value && value.length > 0) {
      router.push(`/administrators/search/${value}`);
    } else {
      toast.error("Please enter a search keyword.");
    }
  };

  const rows = useMemo(() => {
    return data.map((item) => <TableAdministratorListRow key={item.aid} administrator={item} />);
  }, [data]);

  return (
    <div className="mt-4 max-w-full">
      <div className="flex items-start justify-between mb-4">
        <Link href="/administrators">
          <Button variant="outline">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <FormSearchBox
            info={{ id: "search-input", label: "Search", placeholder: "Search", is_required: false }}
            value={searchKeyword}
            onChange={(value) => setKeyword(value)}
            search={handleSearch}
          />
          <Link href="/administrators/create" className="flex items-center justify-center">
            <Button variant="outline">
              <Plus />
            </Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <TableAdministratorList renderedRows={rows} />
      </div>
      <ListPagination start={start} total={totalPages} setStart={setStart} />
    </div>
  );
}
