import { useEffect } from "react";
import { dummy_sample } from "../types/FeedItem.type";
import { useFeedStore } from "../zustand/feedStore";

const useFeedFetcher = (id) => {
  const feedIdToFind = id;
  const selectedFeed = isNaN(feedIdToFind)
    ? undefined
    : dummy_sample.find((feed) => feed.post_id === feedIdToFind);
  const setFeed = useFeedStore((state) => state.setFeed);

  useEffect(() => {
    if (selectedFeed) {
      setFeed(selectedFeed);
    }
  }, [selectedFeed, setFeed]);

  return selectedFeed;
};

export default useFeedFetcher;