import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const OauthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token')?.split(' ')[1];
      const nickname = urlParams.get('nickname');
      const role = urlParams.get('role');

      if (token) {
        localStorage.setItem('AccessToken', token);
        localStorage.setItem('nickname', nickname!);
        localStorage.setItem('role', role!);
        navigate('/', { replace: true });
      }
    };
    handleOAuthRedirect();
  }, [navigate]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  );
};

export default OauthCallbackPage;
