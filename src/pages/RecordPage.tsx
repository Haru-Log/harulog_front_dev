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
import { FeedItem, dummy_sample } from "../types/FeedItem.type"
import { useFeedStore } from "../zustand/feedStore"

const RecordPage = () => {

  const { feed, setFeed } = useFeedStore();
  const id = useParams().id;

  const [date, setDate] = useState<Date | undefined>(id ? feed.created_at : new Date());
  const [minute, setMinute] = useState("")
  const [hour, setHour] = useState("")
  const [category, setCategory] = useState(id ? feed.category_name : "");
  const [content, setContent] = useState(id ? feed.content : "");
  const [imgURL, setImgURL] = useState(id ? feed.post_image : "");

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
          imgRef.current.setAttribute('src', feed.post_image);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {

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

    if (category === "기상" && hour.length === 0) {
      hourRef.current?.focus()
      return;
    } else if (minute.length === 0) {
      minuteRef.current?.focus()
      return;
    }


    if (window.confirm("피드 작성을 완료하시겠습니까?")) {
      //더미코드
      localStorage.setItem((dummy_sample.length + 1).toString(), JSON.stringify(imgURL))
      const newFeed: FeedItem = {
        post_id: dummy_sample.length + 1,
        user_idx: 2,
        category_name: category,
        content: content,
        post_image: imgURL,
        like: 0,
        comment: 0,
        created_at: new Date()
      }
      dummy_sample.push(newFeed);
      navigate(`/feed/${id}`, { replace: true })
    }
  }

  const handleEdit = () => {

    if (content.length < 1) {
      contentRef.current?.focus()
      return;
    }
    if (category === "기상" && hour.length === 0) {
      hourRef.current?.focus()
      return;
    } else if (minute.length === 0) {
      minuteRef.current?.focus()
      return;
    }

    if (window.confirm("피드 수정을 완료하시겠습니까?")) {
      //더미코드
      localStorage.setItem((dummy_sample.length + 1).toString(), JSON.stringify(imgURL))
      const newFeed: FeedItem = {
        post_id: parseInt(id!),
        user_idx: 2,
        category_name: category,
        content: content,
        post_image: imgURL,
        like: 0,
        comment: 0,
        created_at: new Date()
      }
      dummy_sample.map((x) => {
        if (x.post_id === parseInt(id!)) {
          return newFeed
        } else {
          return x
        }
      })
      navigate(`/feed`, { replace: true })
    }
  }

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setImgURL(URL.createObjectURL(file))
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
                    setHour(e.target.value)
                  }
                }} /> 시
                <Input type="number" placeholder="분" className="ml-5 mr-2 w-20" ref={minuteRef} value={minute} onChange={(e) => {
                  if ((e.target.value === "" || (parseInt(e.target.value) >= 0 && parseInt(e.target.value) < 60))) {
                    setMinute(e.target.value)
                  }
                }} /> 분
              </div>
              :
              <Input type="number" placeholder="성취 시간(분)을 입력하세요." value={minute} onChange={(e) => setMinute(e.target.value)} className='w-[280px] border-2' ref={minuteRef} />
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
            <Switch /></div>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <Button className="bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md" onClick={() => navigate(`/feed/${id}`, { replace: true })}>
          취소
        </Button>
        <Button className="bg-point rounded-lg text-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-point-hover active:bg-point-active drop-shadow-md" onClick={id ? handleEdit : handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  )
}

export default RecordPage
