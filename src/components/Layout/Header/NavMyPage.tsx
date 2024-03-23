import { useNavigate } from 'react-router-dom';

const NavMyPage = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/profile/${localStorage.getItem('nickname')}`);
      }}
      className="cursor-pointer text-sm font-ibm"
    >
      마이페이지
    </div>
  );
};

export default NavMyPage;
