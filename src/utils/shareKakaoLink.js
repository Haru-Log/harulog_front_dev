export const shareKakao = (challenge_id, challenge_title, challenge_img, challenge_category) => { 
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
        description: '000님이 하루로그 챌린지 초대를 보냈습니다!',
        path: `challenge/${challenge_id}`,
        category : `${challenge_category}`,
        THU: `${challenge_img}`,
      },
    });
  }
};