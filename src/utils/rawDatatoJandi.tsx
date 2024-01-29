import { Jandi } from "../types/HeatmapData.type";

export const mergeCategory = (receieved_jandi: { date: Date, category: string }[]): Jandi[] => {
  const mergedJandi: Jandi[] = [];
  let currentGroup: { date: Date; category: string[] } = { date: new Date('1900-01-01'), category: [] };

  receieved_jandi.forEach((item) => {
    if (currentGroup.date.toISOString().split('T')[0] === new Date('1900-01-01').toISOString().split('T')[0]
      || currentGroup.date.toISOString().split('T')[0] !== item.date.toISOString().split('T')[0]) {
      // 새로운 날짜의 그룹 시작
      if (currentGroup.date.toISOString().split('T')[0] !== new Date('1900-01-01').toISOString().split('T')[0]) {
        mergedJandi.push(currentGroup);
      }
      currentGroup = { date: item.date, category: [item.category] };
    } else {
      // 같은 날짜의 그룹에 추가
      currentGroup.category.push(item.category);
    }
  });

  // 마지막 그룹 추가
  if (currentGroup.date.toISOString().split('T')[0] !== new Date('1900-01-01').toISOString().split('T')[0]) {
    mergedJandi.push(currentGroup);
  }

  return mergedJandi;
}

export const shiftDate = (date: Date, numDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export const mergeJandi = (initialState: Jandi[], receievedData: Jandi[]) => {
  const combinedJandi = [...initialState, ...receievedData]

  combinedJandi.sort((a, b) => a.date.getTime() - b.date.getTime())

  let mergedJandi = combinedJandi.filter((x, idx) => {
    if (x.category[0].length === 0 && idx < combinedJandi.length - 1 && x.date.toISOString().split('T')[0] === combinedJandi[idx + 1].date.toISOString().split('T')[0]) {
      // 뒤에 있는 애랑 날짜 같은데 카테고리 비었을 경우
      return false
    } else if (x.category[0].length === 0 && idx > 0 && x.date.toISOString().split('T')[0] === combinedJandi[idx - 1].date.toISOString().split('T')[0]) {
      // 앞에 있는 애랑 날짜 같은데 카테고리 비었을 경우
      return false
    } else {
      // 날짜 겹치는거 없거나 아니면 카테고리 안 비었을 경우
      return true
    }
  })
  return mergedJandi;
}

export const filterJandi = (data: Jandi[], category: string) => {

  let temp = data.map((it)=>{
    if(it.category.includes(category)){
      return {...it, category: [category, it.category.filter(x=>x===category).length + ""]}
    } else{
      return {...it, category: [""]}
    }
  })
  return temp;
}

export function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}
