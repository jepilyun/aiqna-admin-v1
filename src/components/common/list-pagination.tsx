import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 36;

export default function ListPagination({
  start,
  total,
  setStart,
}: {
  start: number;
  total: number;
  setStart: (start: number) => void;
}) {
  // start index를 기반으로 현재 페이지 계산
  const currentPage = Math.floor(start / ITEMS_PER_PAGE) + 1;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // 페이지 번호를 start index로 변환
  const handlePageChange = (page: number) => {
    const newStart = (page - 1) * ITEMS_PER_PAGE;
    setStart(newStart);
  };

  // 이전 페이지
  const handlePrevious = (e: React.MouseEvent) => {
    if (currentPage === 1) {
      e.preventDefault();
    } else {
      const newStart = Math.max(0, start - ITEMS_PER_PAGE);
      setStart(newStart);
    }
  };

  // 다음 페이지
  const handleNext = (e: React.MouseEvent) => {
    if (currentPage === totalPages) {
      e.preventDefault();
    } else {
      const newStart = Math.min((totalPages - 1) * ITEMS_PER_PAGE, start + ITEMS_PER_PAGE);
      setStart(newStart);
    }
  };

  // 페이지가 없으면 페이지네이션 숨기기
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious aria-disabled={currentPage === 1} onClick={handlePrevious} />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink isActive={pageNum === currentPage} onClick={() => handlePageChange(pageNum)}>
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext aria-disabled={currentPage === totalPages} onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
