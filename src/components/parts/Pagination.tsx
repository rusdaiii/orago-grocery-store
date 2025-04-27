import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

type PaginationProps = {
  page: number;
  pageCount: number;
  // eslint-disable-next-line no-unused-vars
  changePage: (page: number) => void;
  className?: string;
};

const Pagination = ({
  page,
  pageCount,
  changePage,
  className,
}: PaginationProps) => {
  if (pageCount === 1 || !pageCount) {
    return null;
  }

  return (
    <PaginationComponent className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          />
        </PaginationItem>

        {Array.from({ length: pageCount }, (_, i) => {
          const value = i + 1;

          return (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === value}
                onClick={() => changePage(value)}
                className={`rounded-full ${
                  page === value
                    ? 'bg-primary text-white transition-all ease-out duration-700'
                    : 'transition-all ease-in duration-100'
                }`}
              >
                {value}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => changePage(page + 1)}
            disabled={page === pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
};

export default Pagination;
