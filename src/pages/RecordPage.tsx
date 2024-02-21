import React, { RefObject, useEffect, useRef, useState } from 'react'
import { Calendar } from "../ui/calendar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { dummy_categories } from "../types/Category.type"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { useNavigate, useParams } from "react-router-dom"
import { SelectLabel } from "@radix-ui/react-select"
import { useFeedStore } from "../zustand/feedStore"
import axios from "axios"
import { createPost } from "../api/feed/CreatePost"
import { editPost } from "../api/feed/EditPost"
import { deletePost } from "../api/feed/DeletePost"

const REST_API_KEY = '60f504ceb850cf533b3d9d172bfb8d4c'

const RecordPage = () => {

  const { feed, setFeed } = useFeedStore();
  const id = useParams().id;

  const [date] = useState<Date | undefined>(id ? feed.createdAt : new Date());
  const [minute, setMinute] = useState(id ? (feed.categoryName === "기상" ? feed.activityTime % 60 : feed.activityTime) : 0)
  const [hour, setHour] = useState(id ? (feed.categoryName === "기상" ? Math.floor(feed.activityTime / 60) : 0) : 0)
  const [category, setCategory] = useState(id ? feed.categoryName : "");
  const [content, setContent] = useState(id ? feed.content : "");
  const [imgURL, setImgURL] = useState(id ? feed.imgUrl : "");
  const [postImage, setPostImage] = useState<File | undefined>()

  const categoryRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  const hourRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const minuteRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const contentRef: RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);
  const imgRef: RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (feed) {
        if (imgRef.current) {
          imgRef.current.setAttribute('src', feed.imgUrl);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = async () => {

    if (content.length < 1) {
      contentRef.current?.focus()
      return;
    }
    if (!imgRef.current?.src) {
      alert('이미지를 업로드 하세요');
      return;
    }
    if (category === "") {
      categoryRef.current?.focus()
      return;
    }
    if (category === "기상" && hour === 0) {
      hourRef.current?.focus()
      return;
    } else if (minute === 0) {
      minuteRef.current?.focus()
      return;
    }


    if (window.confirm("피드 작성을 완료하시겠습니까?")) {
      const formData = new FormData();

      formData.append('categoryName', category)
      formData.append('activityTime', minute.toString());
      formData.append('content', content)
      formData.append('imgUrl', postImage as File)

      const response = await createPost(formData)

      if (response && response.message === "OK") {
        setFeed({
          ...feed,
          categoryName: category,
          content: content,
          imgUrl: imgURL,
          activityTime: category === "기상" ? hour * 60 + minute : minute
        })
        navigate(`/feed/${response.data.id}`, { replace: true })
      }

    }
  }

  const handleEdit = async () => {

    if (content.length < 1) {
      contentRef.current?.focus()
      return;
    }
    if (category === "기상" && hour === 0) {
      hourRef.current?.focus()
      return;
    } else if (minute === 0) {
      minuteRef.current?.focus()
      return;
    }

    if (window.confirm("피드 수정을 완료하시겠습니까?")) {
      const response = await editPost({
        categoryName: category,
        activityTime: minute,
        imgUrl: imgURL,
        content: content,
        id: id
      })
      if (response && response.message === "OK") {
        setFeed({
          ...feed,
          categoryName: category,
          content: content,
          imgUrl: imgURL,
          activityTime: category === "기상" ? hour * 60 + minute : minute
        })
        navigate(`/feed/${id}`, { replace: true })
      }
    }
  }

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setPostImage(file)
      setImgURL(URL.createObjectURL(file))
    }
  }

  const autoGenerateContent = () => {
    const max_tokens = 32;
    const temperature = 0.3;
    const top_p = 0.85;
    const n = 3;
    axios.post("https://api.kakaobrain.com/v1/inference/kogpt/generation",
      {
        'prompt': content,
        'max_tokens': max_tokens,
        'temperature': temperature,
        'top_p': top_p,
        'n': n
      },
      {
        headers: {
          'Authorization': 'KakaoAK ' + REST_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      console.log(res);
    })
  }

  const handleDeletePost = async () => {
    const response = await deletePost(id);
    if (response && response.message === "OK") {
      alert('삭제 완료')
      navigate('/feed', { replace: true })
    }
  }

  useEffect(() => {
    if (imgRef.current && imgURL.length) {
      imgRef.current.setAttribute('src', imgURL)
    }
  }, [imgURL])

  return (
    <div className='flex flex-col mx-10 mt-10 border-2 rounded-xl px-10 py-10 font-ibm'>
      <div className='flex flex-row'>
        <div className='flex flex-col mr-10'>
          <div className='flex flex-row items-center'>
            <span className="font-bold mr-5 w-16">카테고리</span>
            {(id ? category : true) &&
              <Select onValueChange={(e) => { setCategory(e) }} defaultValue={category}>
                <SelectTrigger className="w-[180px] border-2 flex-1" ref={categoryRef}>
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>카테고리</SelectLabel>
                    {dummy_categories.map((it) => (
                      <SelectItem value={it.category_name} key={it.category_id}>{it.category_name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>}
          </div>
          <div className='flex flex-row mt-5 items-center'>
            <span className="font-bold mr-5 w-16">성취</span>
            {category === "기상" ?
              <div className="flex items-center">
                <Input type="number" placeholder="시" className="mr-2 w-20" ref={hourRef} value={hour} onChange={(e) => {
                  if ((e.target.value === "" || (parseInt(e.target.value) >= 0 && parseInt(e.target.value) < 24))) {
                    setHour(parseInt(e.target.value))
                  }
                }} /> 시
                <Input type="number" placeholder="분" className="ml-5 mr-2 w-20" ref={minuteRef} value={minute} onChange={(e) => {
                  if ((e.target.value === "" || (parseInt(e.target.value) >= 0 && parseInt(e.target.value) < 60))) {
                    setMinute(parseInt(e.target.value))
                  }
                }} /> 분
              </div>
              :
              <Input type="number" placeholder="성취 시간(분)을 입력하세요." value={minute} onChange={(e) => setMinute(parseInt(e.target.value))} className='w-[280px] border-2' ref={minuteRef} />
            }
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">
              날짜
            </span>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => { console.log('calendar', e) }}
              className="rounded-md border-2 mt-5"
              disabled
              month={date}
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center">
          <div className='flex mb-5 flex-row items-center'>
            <div className="font-bold mr-5 w-16">
              사진
            </div>
            <Input accept="image/jpeg, image/png" type="file" onChange={handleUploadImage} className='w-full border-2' />
          </div>
          <img ref={imgRef} alt="사진을 업로드하세요." className="object-contain mb-5 h-[265px] rounded-lg max-h-96 border-2 " />
          <Textarea className="resize-none w-full border-2" placeholder="내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} ref={contentRef} />
          <div className="flex mt-8 justify-end items-center">
            <div className="mr-5 font-bold">자동게시</div>
            <Switch onClick={autoGenerateContent} /></div>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <Button className="bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md" onClick={() => navigate(`/feed/${id}`, { replace: true })}>
          취소
        </Button>
        {id ? <Button className="bg-red-500 rounded-lg text-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-red-800 active:bg-point-active drop-shadow-md" onClick={handleDeletePost}>
          삭제
        </Button> :
          <></>}
        <Button className="bg-point rounded-lg text-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-point-hover active:bg-point-active drop-shadow-md" onClick={id ? handleEdit : handleSubmit}>
          저장
        </Button>

      </div>
    </div>
  )
}

export default RecordPage
