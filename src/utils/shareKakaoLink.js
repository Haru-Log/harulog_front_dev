export const shareKakao = (challenge_id, challenge_title, challenge_img, challenge_category, challenge_leader) => { 
  if (window.Kakao) {
    const Kakao = window.Kakao;
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
      console.log('kakao init');
    }

    Kakao.Share.sendCustom({
      templateId: 103968,
      templateArgs: {
        title: `${challenge_title}`,
        description: '하루로그 챌린지 초대장',
        path: `challenge/${challenge_id}`,
        category : `${challenge_category}`,
        leader : `${challenge_leader}`,
        THU: `${challenge_img}`,
      },
    });
  }
};

export const shareFeedKakao = (feed_id, feed_profile, feed_likes, feed_comments, user_name, feed_img, feed_content, feed_category) => {
  if (window.Kakao) {
    const Kakao = window.Kakao;
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
      console.log('kakao init');
    }

    Kakao.Share.sendCustom({
      templateId: 104632,
      templateArgs: {
        description: `${feed_content}`,
        path: `feed/${feed_id}`,
        PRF : `${feed_profile}`,
        likes : `${feed_likes}`,
        comments : `${feed_comments}`,
        name : `${user_name}`,
        THU: `${feed_img}`,
        category : `${feed_category}`,
      },
    });
  }
}