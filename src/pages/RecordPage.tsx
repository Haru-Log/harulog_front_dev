import React, { useState } from 'react'
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


const RecordPage = () => {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("");
  

  const id = useParams().id;

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/feed/${id}`, { replace: true })
  }


  return (
    <div className="mx-5 p-5 flex justify-center">
      <div className="w-full h-full border-2 rounded-xl px-10 py-10">
        <section className="w-full h-full flex">
          <div className="w-fit h-full flex flex-col" >
            <div className="flex items-center">
              <div className="font-bold mr-5">카테고리</div>
              <Select>
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {
                    dummy_categories.map((it) => (
                      <SelectItem value="light" key={it.category_id}>{it.category_name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>

            </div>
            <div className="flex my-5">
              <div className="font-bold mr-[3.25rem] whitespace-nowrap">성취</div>
              <Input type="text" placeholder="성취 시간을 입력하세요." value={time} onChange={(e) => setTime(e.target.value.replace(/[^0-9]/g, ""))} />

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
            <div className="flex mt-5">
              <div className="font-bold mr-[3rem] whitespace-nowrap">
                사진
              </div>
              <Input type="file" />
            </div>
          </div>
          <div className="w-full h-full ml-[3rem]">
            <Textarea className="w-full h-[30rem] border-2" placeholder="내용을 입력하세요." />
            <div className="flex mt-5 justify-end">
              <div className="mr-5 font-bold">자동게시</div>
              <Switch /></div>
          </div>
        </section>
        <section className="w-full flex justify-between mt-8">
          <Button className="bg-gray-500 hover:opacity-70 shadow-xl rounded-xl" onClick={() => navigate(`/feed/${id}`, { replace: true })}>
            취소
          </Button>
          <Button className="bg-point hover:bg-point-hover active:bg-point-active shadow-xl rounded-xl" onClick={handleSubmit}>
            저장
          </Button>
        </section>
      </div>
    </div>
  )
}

export default RecordPage
