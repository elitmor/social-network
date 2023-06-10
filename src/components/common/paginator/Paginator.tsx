import cn from 'classnames';
import { useState } from 'react';
import style from './paginator.module.css';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize: number;
};

export const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const portionCount = Math.ceil(pagesCount / portionSize);

  const [currentPortion, setCurrentPortion] = useState(1);

  const handlePageClick = (pageNumber: number) => {
    onPageChanged(pageNumber);
  };

  const handlePortionClick = (portionNumber: number) => {
    setCurrentPortion(portionNumber);
  };

  const leftPage = (currentPortion - 1) * portionSize + 1;
  const rightPage = currentPortion * portionSize;

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={style.paginator}>
      {currentPortion > 1 && (
        <button
          onClick={() => {
            handlePortionClick(currentPortion - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter((page) => page >= leftPage && page <= rightPage)
        .map((page) => (
          <span
            className={cn(
              {
                [style.selected]: currentPage === page,
              },
              style.pageNumber,
            )}
            key={page}
            onClick={() => {
              handlePageClick(page);
            }}
          >
            {page}
          </span>
        ))}

      {portionCount > currentPortion && (
        <button
          onClick={() => {
            handlePortionClick(currentPortion + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};
