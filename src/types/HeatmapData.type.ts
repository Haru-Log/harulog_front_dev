export interface Jandi {
  date: Date;
  category: {
    "기상"?: number;
    "공부"?: number;
    "운동"?: number;
    "독서"?: number;
    "전체"?: null;
  };
}

export type HeatmapCategory = "기상" | "공부" | "운동" | "독서" | "전체"

export type GrowCategory = "기상" | "공부" | "운동" | "독서"
