import { Button } from '@/ui/button';
import { useContentStore } from '@/zustand/searchUserStore';

const SearchPagination = () => {
  const { currentPage, totalPage, setCurrentPage } = useContentStore();

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center w-full justify-center">
      <div className="w-full mt-7 rounded-xl flex justify-between">
        <div>
          {currentPage > 0 && (
            <Button
              className="bg-main w-20 rounded-lg font-bold shadow-sm hover:bg-main-hover active:bg-main-active"
              onClick={handlePrevClick}
            >
              이전
            </Button>
          )}
        </div>
        <div>
          {currentPage < totalPage - 1 && (
            <Button
              className="bg-point w-20 rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active"
              onClick={handleNextClick}
            >
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPagination;
