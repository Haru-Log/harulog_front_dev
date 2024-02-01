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
        post_id: 0,
        user_idx: 0,
        category_name: "",
        content: "",
        post_image: "",
        like: 0,
        comment: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      setFeed: (feed: FeedItem) => set({ feed }),
    }),
    { name: 'feedStore' }
  ),
);