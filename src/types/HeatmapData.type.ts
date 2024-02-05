export interface Jandi {
  date: Date;
  category: string[]
}

export interface newJandi{
  date: Date;
  categoryPosts:{
    "기상"?: number;
    "공부"?: number;
    "운동"?: number;
    "독서"?: number;
  }
}