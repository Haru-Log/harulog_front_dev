import React, { useState } from 'react'
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


const RecordPage = () => {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("");


  const id = useParams().id;

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/feed/${id}`, { replace: true })
  }


  return (
    <div className='flex flex-col mx-10 mt-10 border-2 rounded-xl px-10 py-10'>
      <div className='flex flex-row'>
        <div className='flex flex-col mr-10'>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 w-16">카테고리</span>
            <Select>
              <SelectTrigger className="w-[280px] border-2">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    dummy_categories.map((it) => (
                      <SelectItem value={it.category_name} key={it.category_id}>{it.category_name}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">성취</span>
            <Input type="text" placeholder="성취 시간(분)을 입력하세요." value={time} onChange={(e) => setTime(e.target.value.replace(/[^0-9]/g, ""))} className='mt-5 w-[280px] border-2' />
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">
              날짜
            </span>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-2 mt-5"
            />
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">사진</span>
            <Input type="file" className='mt-5 w-[280px] border-2' />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <Textarea className="resize-none w-full h-[420px] border-2" placeholder="내용을 입력하세요." />
          <div className="flex mt-8 justify-end items-center">
            <div className="mr-5 font-bold">자동게시</div>
            <Switch /></div>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <Button className="bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md" onClick={() => navigate(`/feed/${id}`, { replace: true })}>
          취소
        </Button>
        <Button className="bg-point rounded-lg text-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-point-hover active:bg-point-active drop-shadow-md" onClick={handleSubmit}>
          저장
        </Button>
      </div>

    </div>
  )
}

export default RecordPage
