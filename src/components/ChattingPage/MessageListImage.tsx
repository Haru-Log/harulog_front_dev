import { fetchImgFromFirebase } from 'src/api/fetchImgFirebase'
import React, { useEffect, useState } from 'react'

const MessageListImage = ({ roomType, imgUrl }: { roomType: string; imgUrl: string }) => {

  const [Url, setUrl] = useState("")

  useEffect(() => {
    fetchImgFromFirebase(imgUrl).then((res) => {
      setUrl(res);
    })
  }, [imgUrl])
  console.log("imgUrl: ", Url);

  return (
    <img src={`${roomType === "DM" ? Url:'' }`} alt="Chatroom Profile" className='object-cover rounded-full w-12 h-12 ml-3 mr-3' />
  )
}

export default MessageListImage
