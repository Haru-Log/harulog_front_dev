import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/ui/select'
import { dummy_categories } from 'src/types/Category.type'
import { Input } from 'src/ui/input'
import { DatePickerWithRange } from 'src/ui/date-range-picker'
import { Textarea } from 'src/ui/textarea'
import { Button } from 'src/ui/button'

const InputCard = () => {
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
                  {dummy_categories.map((it) => (
                    <SelectItem value={it.category_name} key={it.category_id}>{it.category_name}</SelectItem>))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">목표</span>
            <Input type="number" placeholder="목표 시간(분)을 입력하세요" className='mt-5 w-[280px] border-2' />
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">기간</span>
            <DatePickerWithRange className='mt-5' />
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">사진</span>
            <Input type="file" className='mt-5 w-[280px] border-2' />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div>
            <span className="font-bold mr-5">챌린지 제목</span>
            <Textarea
              placeholder="제목을 입력해주세요."
              className="resize-none min-h-28 min-w-32 mt-1 border-2"
            />
          </div>
          <div className='mt-3'>
            <span className="font-bold mr-5">챌린지 설명</span>
            <Textarea
              placeholder="세부 사항을 입력해주세요."
              className="resize-none min-h-32 min-w-32 mt-1 border-2"
            />
          </div>
          <div className='mt-3'>
            <span className="font-bold mr-5">인증 방법</span>
            <Textarea
              placeholder="세부 사항을 입력해주세요."
              className="resize-none min-h-32 min-w-32 mt-1 border-2"
            />
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <Button className='bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md'>취소</Button>
        <Button className='bg-point rounded-lgtext-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-point-hover active:bg-point-active drop-shadow-md'>생성</Button>
      </div>
    </div>
  )
}

export default InputCard
