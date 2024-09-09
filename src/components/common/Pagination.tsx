// Pagination.tsx
import React from 'react';
import styles from './Pagination.module.css'; // Create a CSS module for styling
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Generate an array of page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* Previous Button: Only show when currentPage > 1 */}
      {currentPage > 1 && (
        <button className={styles.paginationButton} onClick={handlePrevious}>
          {t('pagination.previous')}
        </button>
      )}

      {/* Page Numbers */}
      <div className={styles.pageNumbers}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles.pageNumberButton} ${page === currentPage ? styles.activePage : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button: Only show when currentPage < totalPages */}
      {currentPage < totalPages && (
        <button className={styles.paginationButton} onClick={handleNext}>
          {t('pagination.next')}
        </button>
      )}
    </div>
  );
};

export default Pagination;
