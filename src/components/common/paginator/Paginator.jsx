import style from './paginator.module.css';

export const Paginator = ({ currentPage, pagesCount, handlePageClick }) => {
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <span
          className={currentPage === page ? style.selected : ''}
          key={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};
