import React, { LegacyRef, RefObject, useEffect, useRef, useState } from 'react'
import { Calendar } from "../ui/calendar"
import {
  Select,
  SelectContent,
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
import { SelectGroup, SelectLabel } from "@radix-ui/react-select"
import { FeedItem, dummy_sample } from "../types/FeedItem.type"


const RecordPage = () => {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [minute, setMinute] = useState("")
  const [hour, setHour] = useState("")
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState("")

  const imgRef: RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);

  const id = useParams().id;

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const post = dummy_sample.find((it) => it.post_id === parseInt(id));
      if (post) {
        setDate(post.created_at);
        if (imgRef.current) {
          imgRef.current.setAttribute('src', post?.post_image);
        }
        setContent(post.content);
        setCategory(post.category_name);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {
    if (window.confirm(id ? "피드 수정을 완료하시겠습니까?" : "피드 작성을 완료하시겠습니까?")) {
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

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setImgURL(URL.createObjectURL(file))

      if (imgRef.current) {
        imgRef.current.setAttribute('src', imgURL)
      }
    }
  }


  return (
    <div className="w-full h-full p-5 flex justify-center">
      <div className="w-full h-full border-2 rounded-xl px-14 py-6">
        <section className="w-full h-full flex">
          <div className="w-fit h-full flex flex-col mr-5" >
            <div className="flex items-center">
              <div className="font-bold mr-5">카테고리</div>
              <Select onValueChange={(e) => { setCategory(e) }} defaultValue={category}>
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>카테고리</SelectLabel>
                    {
                      dummy_categories.map((it) => (
                        <SelectItem value={it.category_name} key={it.category_id}>{it.category_name}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
            <div className="flex my-5">
              <div className="font-bold mr-[3.25rem] whitespace-nowrap">성취</div>
              {category === "기상" ?
                <div className="flex items-center">
                  <Input type="number" placeholder="시" className="mr-5" value={hour} onChange={(e) => setHour(e.target.value)} /> 시
                  <Input type="number" placeholder="분" className="mx-5" value={minute} onChange={(e) => setMinute(e.target.value)} /> 분
                </div>
                :
                <Input type="number" placeholder="성취 시간을 입력하세요." value={minute} onChange={(e) => setMinute(e.target.value)} />
              }

            </div>
            <div className="flex">
              <div className="font-bold mr-[3.25rem] whitespace-nowrap">
                날짜
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-2"
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center">
            <div className="flex">
              <div className="font-bold mr-[3rem] whitespace-nowrap mb-5">
                사진
              </div>
              <Input accept="image/jpeg, image/png" type="file" onChange={handleUploadImage} />
            </div>
            <img ref={imgRef} alt="사진을 업로드하세요." className="mb-5 max-h-96 object-contain" />
            <Textarea className="w-full border-2" placeholder="내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="flex mt-5 justify-end">
              <div className="mr-5 font-bold">자동게시</div>
              <Switch /></div>
          </div>
        </section>
        <section className="w-full flex justify-between mt-8">
          <Button className="bg-gray-500 hover:opacity-70 shadow-xl rounded-xl" onClick={() => navigate(`/feed/${id}`, { replace: true })}>
            취소
          </Button>
          <Button className="bg-point hover:opacity-70 shadow-xl rounded-xl" onClick={handleSubmit}>
            저장
          </Button>
        </section>
      </div>
    </div>
  )
}

export default RecordPage
