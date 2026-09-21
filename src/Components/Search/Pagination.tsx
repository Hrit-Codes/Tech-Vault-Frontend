import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  siblingCount?: number;
}

function buildPageList(
  current: number,
  total: number,
  siblings: number
): (number | "ellipsis")[] {
  const totalSlots = siblings * 2 + 5;

  // If total fits, show all pages
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(current - siblings, 2);
  const right = Math.min(current + siblings, total - 1);

  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  const items: (number | "ellipsis")[] = [1];

  if (showLeftEllipsis) items.push("ellipsis");
  for (let i = left; i <= right; i++) items.push(i);
  if (showRightEllipsis) items.push("ellipsis");

  items.push(total);
  return items;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages, siblingCount);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    // Smooth-scroll the grid into view — feels natural in ecommerce
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rangeStart =
    totalItems && itemsPerPage
      ? (currentPage - 1) * itemsPerPage + 1
      : null;
  const rangeEnd =
    totalItems && itemsPerPage
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : null;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      {/* Results range — hidden on mobile */}
      {totalItems && itemsPerPage && rangeStart && rangeEnd && (
        <p className="hidden sm:block text-xs font-semibold text-description">
          Showing{" "}
          <span className="text-foreground">{rangeStart}</span>
          {"–"}
          <span className="text-foreground">{rangeEnd}</span> of{" "}
          <span className="text-foreground">{totalItems}</span> products
        </p>
      )}

      {/* Page controls */}
      <nav
        aria-label="Pagination"
        className="flex items-center gap-1.5 sm:ml-auto"
      >
        {/* Previous */}
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-secondary-400/15 text-description hover:text-foreground hover:border-primary-400/40 hover:bg-primary-500/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-secondary-400/15 disabled:hover:bg-transparent disabled:hover:text-description cursor-pointer"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1.5">
          {pages.map((item, idx) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                aria-hidden="true"
                className="flex items-center justify-center w-10 h-10 text-description"
              >
                <MoreHorizontal size={16} />
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => goTo(item)}
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Go to page ${item}`}
                className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  item === currentPage
                    ? "bg-primary-500 text-white shadow-sm shadow-primary-500/25 hover:bg-primary-600"
                    : "border border-secondary-400/15 text-description hover:text-foreground hover:border-primary-400/40 hover:bg-primary-500/5"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-secondary-400/15 text-description hover:text-foreground hover:border-primary-400/40 hover:bg-primary-500/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-secondary-400/15 disabled:hover:bg-transparent disabled:hover:text-description cursor-pointer"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </nav>
    </div>
  );
}