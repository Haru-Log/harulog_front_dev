import { Button } from 'src/ui/button'
import { Input } from 'src/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { useContentStore } from 'src/zustand/searchUserStore'
import { searchUsers } from 'src/api/search/SearchUsers'

const SearchBox = () => {
  const { content, searchToggle, currentPage, setContent, setUserList, setTotalPage, setCurrentPage } = useContentStore();

  const handleSearchButton = async () => {
    setCurrentPage(0);
    try {
      const response = await searchUsers(searchToggle, content, currentPage);
      setUserList(response.data.contents);
      setTotalPage(response.data.pageInfo.totalPages)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSearchButton();
    }
  }

  return (
    <div className="flex items-center space-x-2 w-full justify-center mt-5">
      <Input
        type="text"
        className="px-3 py-2 h-12"
        placeholder="유저 이름을 검색해보세요."
        value={content}
        onChange={(e) => { setContent(e.target.value) }}
        onKeyDown={handleKeyPress}
      />
      <Button className="w-[90px] h-12 px-3 py-2 bg-point hover:bg-point-hover active:bg-point-active" onClick={handleSearchButton}>
        <Search color="#ffffff" />
      </Button>
    </div>
  )
}

export default SearchBox
