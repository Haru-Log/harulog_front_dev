import { create } from "zustand";
import { FeedItem } from "../types/FeedItem.type";
import { devtools } from "zustand/middleware";

interface FeedState {
  feed: FeedItem;
  setFeed: (feed: FeedItem) => void;
}

export const useFeedStore = create<FeedState>()(
  devtools(
    (set) => ({
      feed: {
        id: 0,
        nickname: "",
        categoryName: "",
        content: "",
        imgUrl: "",
        createdAt: new Date(),
        updateAt: new Date(),
        activityTime: 0,
        commentCount: 0,
        likeCount: 0,
        goal: 0
      },
      setFeed: (feed: FeedItem) => set({ feed }),
    }),
    { name: 'feedStore' }
  ),
);