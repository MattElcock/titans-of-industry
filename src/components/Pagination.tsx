import { Box, Button, IconButton } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationButton {
  page: number;
  isCurrentPage: boolean;
  onChange: (page: number) => void;
}

const PaginationButton = ({
  page,
  isCurrentPage,
  onChange,
}: PaginationButton) => {
  const handleClick = () => {
    onChange(page);
  };

  return (
    <Button
      bg={isCurrentPage ? "primary" : "secondary"}
      color="text"
      _hover={{
        opacity: 0.5,
        bgColor: isCurrentPage ? "primary" : "secondary",
      }}
      onClick={handleClick}
    >
      {page}
    </Button>
  );
};

interface PaginationProps {
  total: number;
  currentPage: number;
  limit: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  total,
  currentPage,
  limit,
  onChange,
}: PaginationProps) => {
  const numOfPages = Math.ceil(total / limit);
  const maxButtonsToShow = 3;

  const allPages = Array.from({ length: numOfPages }).map((_val, i) => (
    <PaginationButton
      key={`pagination-button-${i + 1}`}
      page={i + 1}
      isCurrentPage={i + 1 === currentPage}
      onChange={onChange}
    />
  ));

  const start = Math.max(0, currentPage - Math.ceil(maxButtonsToShow / 2));
  const end = Math.min(numOfPages, start + maxButtonsToShow);

  const displayedPages = allPages.slice(start, end);

  const handlePreviousPage = () => {
    onChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onChange(currentPage + 1);
  };

  return (
    <Box display="flex" gap={5} justifyContent="center">
      <IconButton
        icon={<ArrowLeft />}
        aria-label="Previous page"
        bgColor="secondary"
        color="text"
        _hover={{
          opacity: 0.5,
          bgColor: "secondary",
        }}
        onClick={handlePreviousPage}
        isDisabled={currentPage === 1}
      />
      {displayedPages}
      <IconButton
        icon={<ArrowRight />}
        aria-label="Next page"
        bgColor="secondary"
        color="text"
        _hover={{
          opacity: 0.5,
          bgColor: "secondary",
        }}
        onClick={handleNextPage}
        isDisabled={currentPage === numOfPages}
      />
    </Box>
  );
};
