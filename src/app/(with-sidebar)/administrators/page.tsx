"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormSearchBox } from "@/components/form/form-search-box";
import ListPagination from "@/components/common/list-pagination";
import { TableAdministratorList, TableAdministratorListRow } from "@/components/table/table-administrator-list";
import { Button } from "@/components/ui/button";
import { reqAdminGetList } from "@/requests/req-admin/req-admin";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { LIST_LIMIT, TAdmin } from "aiqna_common_v1";

/**
 * 관리자 목록 페이지
 * @returns 관리자 목록 페이지
 */
export default function AdministratorList() {
  const router = useRouter();
  const [data, setData] = useState<TAdmin[]>([]);
  const [start, setStart] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cache, setCache] = useState<Record<string, TAdmin[]>>({});
  const [keyword, setKeyword] = useState<string>("");

  // 캐시 키 useMemo 처리
  const cacheKey = useMemo(() => `Administrator_${start}`, [start]);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      return;
    }

    const fetchData = async () => {
      const apiResponse = await reqAdminGetList(start);

      if (apiResponse.success && apiResponse.dbResponse?.data && apiResponse.dbResponse?.data.length > 0) {
        const { data: administrators, count } = apiResponse.dbResponse;
        setData(administrators || []);
        setCache((prev) => ({ ...prev, [cacheKey]: administrators || [] }));
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
  }, [cacheKey]);

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
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <FormSearchBox
            info={{ id: "search-input", label: "Search", placeholder: "Search", is_required: false }}
            value={keyword}
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
