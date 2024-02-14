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