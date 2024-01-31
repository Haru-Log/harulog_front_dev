import React from 'react'
import MyForm from '../components/EditMyInfoPage/MyForm'
import PasswordChangeForm from '../components/EditMyInfoPage/PasswordChangeForm'
import ProfileImageUpload from '../components/EditMyInfoPage/ProfileImageUpload'
import Modal from '../components/EditMyInfoPage/Modal'

const EditMyInfoPage = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full">
        {/* Top Section */}
        <div className="flex ">
          <div className="w-1/4 p-3 mt-6 ">
            <ProfileImageUpload />
          </div>
          <div className="w-3/4 p-4">
            <MyForm />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full ml-2 gap-4 p-4" style={{}}>
          <div>
            <PasswordChangeForm />
          </div>
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
