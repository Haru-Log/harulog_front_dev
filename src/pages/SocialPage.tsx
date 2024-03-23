import { useEffect } from 'react';
import SearchResultList from '../components/SocialPage/SearchResultList';
import SearchBox from '../components/SocialPage/SearchBox';
import { useContentStore } from '../zustand/searchUserStore';
import { searchUsers } from '../api/search/SearchUsers';
import SearchPagination from '../components/SocialPage/SearchPagination';

const SocialPage = () => {
  const {
    content,
    searchToggle,
    currentPage,
    setSearchToggle,
    setUserList,
    setCurrentPage,
    setTotalPage,
  } = useContentStore();

  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await searchUsers(searchToggle, content, currentPage);
        setUserList(response.data.contents);
        setTotalPage(response.data.pageInfo.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchToggle, currentPage, setUserList, setTotalPage]);

  return (
    <div className="w-full flex justify-center mt-10 font-ibm">
      <div className="w-full h-full flex flex-col mx-10 items-center">
        <div className="w-full flex justify-between">
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center ${
              searchToggle === 'all'
                ? 'border-t-4 border-black font-bold'
                : 'border-t-2 border-t-gray-400 text-gray-400'
            }`}
            onClick={() => setSearchToggle('all')}
          >
            전체
          </div>
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${
              searchToggle === 'followings'
                ? 'border-t-4 border-black font-bold'
                : 'border-t-2 border-t-gray-400 text-gray-400'
            }`}
            onClick={() => setSearchToggle('followings')}
          >
            팔로잉
          </div>
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${
              searchToggle === 'followers'
                ? 'border-t-4 border-black font-bold'
                : 'border-t-2 border-t-gray-400 text-gray-400'
            }`}
            onClick={() => setSearchToggle('followers')}
          >
            팔로워
          </div>
        </div>
        <SearchBox />
        <SearchResultList />
        <SearchPagination />
      </div>
    </div>
  );
};

export default SocialPage;
