import React, { useEffect, useState } from 'react'
import MyForm from '../components/EditMyInfoPage/MyForm'
import PasswordChangeForm from '../components/EditMyInfoPage/PasswordChangeForm'
import ProfileImageUpload from '../components/EditMyInfoPage/ProfileImageUpload'
import Modal from '../components/EditMyInfoPage/Modal'
import { UserInfo } from "../types/UserInfo.type"
import { fetchEditProfile } from "../api/profile/fetchEditProfile"
import { fetchImgFromFirebase } from "../api/fetchImgFirebase"


const initialUserInfo: UserInfo = {
  userName: "",
  nickname: "",
  email: "",
  createdAt: new Date().toDateString(),
  contactNumber: "",
  introduction: "",
  imageUrl: "",
  socialType: "HARU"
}

const EditMyInfoPage = () => {

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);


  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetchEditProfile();
      if (response.message === "OK") {
        const imgUrl = await fetchImgFromFirebase(response.data.imageUrl)
        setUserInfo({...response.data, imageUrl: imgUrl});
      }
    }
    getUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-gray-100 flex justify-center items-center font-ibm">
      <div className="bg-white rounded-lg w-full">
        {/* Top Section */}
        <div className="flex ">
          <div className="w-1/4 p-3 mt-6 ">
            <ProfileImageUpload userName={userInfo.userName} email={userInfo.email} createdAt={userInfo.createdAt} imageUrl={userInfo.imageUrl} />
          </div>
          <div className="w-3/4 p-4">
            <MyForm userNickname={userInfo.nickname} contactNumber={userInfo.contactNumber ? userInfo.contactNumber : ""} userIntroduction={userInfo.introduction ? userInfo.introduction : ""} />
          </div>
        </div>
        {/* Bottom Section */}
        <div className="w-full ml-2 gap-4 p-4" style={{}}>
          {
            userInfo.socialType === "HARU" &&
            <div>
              <PasswordChangeForm />
            </div>}
          <br />
          <div className="w-full ">
            <Modal />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMyInfoPage
