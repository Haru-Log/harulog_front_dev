import firebase from './../firebase'

export const fetchImgFromFirebase = async (imgUrl) => {
  try {
    const storageRef = firebase.storage().ref()
    const response = await storageRef.child(imgUrl).getDownloadURL()
    return response
  } catch (error) {
    alert('이미지 로드 실패')
    throw error
  }

}