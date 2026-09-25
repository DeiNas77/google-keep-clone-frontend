import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

type PageItem = number | "ellipsis";

const getPageItems = (current: number, total: number): PageItem[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const candidates = new Set([1, total, current - 1, current, current + 1]);
  const pages = [...candidates]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const items: PageItem[] = [];
  let previous = 0;

  for (const page of pages) {
    if (page - previous === 2) {
      items.push(previous + 1);
    } else if (page - previous > 2) {
      items.push("ellipsis");
    }
    items.push(page);
    previous = page;
  }

  return items;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handleChange = (page: number) => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const items = getPageItems(currentPage, totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-2 mt-6 mb-4"
    >
      <button
        type="button"
        aria-label="Página anterior"
        disabled={!canGoPrev}
        onClick={() => handleChange(currentPage - 1)}
        className="w-9 h-9 grid place-items-center rounded-full bg-(--pagination-color) text-white transition-all hover:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="w-9 h-9 grid place-items-center rounded-full text-white/50 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === currentPage ? "page" : undefined}
            onClick={() => handleChange(item)}
            className={`w-9 h-9 rounded-full text-sm font-medium transition-all cursor-pointer ${
              item === currentPage
                ? "bg-(--secondary-color) text-white"
                : "bg-(--pagination-color) text-white hover:brightness-125"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Página siguiente"
        disabled={!canGoNext}
        onClick={() => handleChange(currentPage + 1)}
        className="w-9 h-9 grid place-items-center rounded-full bg-(--pagination-color) text-white transition-all hover:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

