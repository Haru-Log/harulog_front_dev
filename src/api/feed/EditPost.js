import axios from 'axios';

export const editPost = async (feed) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/feed/${feed.id}`, {
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