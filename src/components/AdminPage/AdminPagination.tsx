import { Button } from '@/ui/button';
import { useAdminStore } from '@/zustand/adminStore';

const AdminPagination = () => {
  const {
    toggle,
    currentFeedPage,
    currentUserPage,
    totalFeedPage,
    totalUserPage,
    setCurrentFeedPage,
    setCurrentUserPage,
  } = useAdminStore();

  const handlePrevFeedClick = () => {
    setCurrentFeedPage(currentFeedPage - 1);
  };

  const handleNextFeedClick = () => {
    setCurrentFeedPage(currentFeedPage + 1);
  };

  const handlePrevUserClick = () => {
    setCurrentUserPage(currentUserPage - 1);
  };

  const handleNextUserClick = () => {
    setCurrentUserPage(currentUserPage + 1);
  };

  return (
    <div className="flex items-center w-full justify-center">
      {toggle === 'posts' ? (
        <div className="w-full mt-7 rounded-xl flex justify-between">
          <div>
            {currentFeedPage > 0 && (
              <Button
                className="bg-main w-20 rounded-lg font-bold shadow-sm hover:bg-main-hover active:bg-main-active"
                onClick={handlePrevFeedClick}
              >
                이전
              </Button>
            )}
          </div>
          <div>
            {currentFeedPage < totalFeedPage - 1 && (
              <Button
                className="bg-point w-20 rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active"
                onClick={handleNextFeedClick}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full mt-7 rounded-xl flex justify-between">
          <div>
            {currentUserPage > 0 && (
              <Button
                className="bg-main w-20 rounded-lg font-bold shadow-sm hover:bg-main-hover active:bg-main-active"
                onClick={handlePrevUserClick}
              >
                이전
              </Button>
            )}
          </div>
          <div>
            {currentUserPage < totalUserPage - 1 && (
              <Button
                className="bg-point w-20 rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active"
                onClick={handleNextUserClick}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPagination;
