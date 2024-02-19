import axios from 'axios';

export const createPost = async (feed) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/feed/create`, {
      "categoryName": feed.categoryName,
      "acitivityTime": feed.acitivityTime,
      "imgUrl": feed.imgUrl,
      "content": feed.content
    }
      , {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    console.log(response.data);
    console.log('Creating all feeds: ', response.data.message);
    return response.data;
  } catch (error) {
    alert('게시글 작성 실패')
  }
}