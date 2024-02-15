// MyForm.tsx

import { Input } from 'src/ui/input';
import React, { useEffect, useState } from 'react';
import { editProfileInfo } from "../../api/profile/EditProfileInfo";

const MyForm: React.FC<{
  userNickname: string; contactNumber: string; userIntroduction: string;
}> = ({ userNickname, contactNumber, userIntroduction }) => {

  const [nickname, setNickname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    setNickname(userNickname)
    setPhoneNumber(contactNumber)
    setIntroduction(userIntroduction)
  }, [userNickname, contactNumber, userIntroduction])

  const validatePhoneNumber = (number: string): boolean => {
    const regex = /^(010|070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
    return regex.test(number) || number.length === 0;
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handleIntroductionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newIntroduction = event.target.value;
    setIntroduction(newIntroduction);
  };

  const handleSubmit = async () => {
    const response = await editProfileInfo({
      nickname: nickname,
      contactNumber: contactNumber,
      introduction: introduction
    })

    if(response.message === "OK"){
      alert('변경완료!')
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg required p-4 text-left">
      <div className="mb-4">
        <label className="block mb-1 ">닉네임</label>
        <Input
          type="text"
          placeholder="친구들이 부를 멋진 이름을 적어주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none  focus:inputborder-blue-700 text-xs resize-none"
        />
        {nickname === '' && <p className="text-red-500"></p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">전화번호</label>
        <Input
          type="text"
          value={phoneNumber}
          placeholder="아직 전화번호를 추가하지 않았어요. (숫자만 입력해주세요.)"
          onChange={handlePhoneNumberChange}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs resize-none"
        />
        {phoneNumber === '' && <p className="text-red-500"></p>}
        {!validatePhoneNumber(phoneNumber) && phoneNumber !== '' && (
          <p className="text-red-500">유효한 전화번호를 입력해주세요.</p>
        )}
      </div>

      <div>
        <label className="block  mb-1">자기소개</label>
        <textarea
          value={introduction}
          placeholder="자신을 표현할 수 있는 한 문장을 남겨주세요."
          onChange={handleIntroductionChange}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs resize-none"
        />
        <p className="text-gray-500 mt-2">
          {/* 인풋안에서 내용을 입력하고 엔터키를 누르면 내용이 입력되며, 탭키를 누르면 내용이 입력됩니다. */}
        </p>
      </div>
      <div className="w-full flex justify-end pr-2">
        <button
          className=" text-sm text-white px-4 mt-6 mb-3 py-1 rounded  shadow-md bg-[#84B4BB]"
          onClick={handleSubmit}
        >
          수정완료
        </button>
      </div>
    </div>
  );
};

export default MyForm;
