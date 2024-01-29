const getTimeDifference = (lastMessageTime: string) => {
  const messageTime = new Date(lastMessageTime);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - messageTime.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "지금";
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};

export default getTimeDifference
