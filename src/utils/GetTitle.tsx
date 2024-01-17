import { useLocation } from 'react-router-dom';

const GetTitle = (): string => {
  const location = useLocation();

  const titleMap: { [key: string]: string } = {
    '/feed': '피드',
    '/feed/create': '활동 기록',
    '/challenge': '챌린지',
    '/challenge/create': '챌린지 생성',
    '/social': '소셜',
    '/grow': 'GROW',
    '/dashboard': '대시보드',
    '/edit': '내 정보 수정',
  };

  const title: string = titleMap[location.pathname] || '';

  return title;
}

export default GetTitle;
