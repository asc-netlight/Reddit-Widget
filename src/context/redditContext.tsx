import { useLogger } from "hooks/useLogger";
import { createContext, Dispatch, SetStateAction, useCallback, useState } from "react";

import { validPictureExtensions } from "../utils/data";

export type RedditContextType = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  subReddit: string;
  setSubReddit: Dispatch<SetStateAction<string>>;
  loadRedditPost: () => void;
  subReddits: string[];
  setSubReddits: Dispatch<SetStateAction<string[]>>;
};

const RedditContext = createContext<RedditContextType>(null);

export const useRedditContext = (): RedditContextType => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [subReddit, setSubReddit] = useState("");
  const [subReddits, setSubReddits] = useState(null);
  const maxTitleLenght = 150;
  const maxEdgeRatio = 2.5;
  const { logger } = useLogger("useRedditContext");

  let redditData;

  const getFileExt = (link: string) => {
    const ext = link.match(/\.[a-zA-Z]*$/);
    if (ext !== null && ext.length > 0) return ext[0].toLowerCase();
    return null;
  };

  const getPicture = () => {
    const len = redditData.data?.children.length;
    let isPicture = false;
    let index;
    let link;

    logger(redditData);
    while (!isPicture) {
      index = Math.floor(Math.random() * len);
      link = redditData.data.children[index].data.url;
      isPicture = validPictureExtensions.includes(getFileExt(link));
    }

    let title: string = redditData.data.children[index].data.title;
    if (title.length > maxTitleLenght) title = title.slice(0, maxTitleLenght) + "..";

    setTitle(title);
    setLink(link);

    const image = new Image();
    image.src = link;

    image.onload = () => {
      if (image.width / image.height > maxEdgeRatio || image.height / image.width > maxEdgeRatio) {
        getPicture();
        return;
      }
    };
  };

  const loadRedditPost = useCallback(async () => {
    await fetch(`https://www.reddit.com${subReddit}/top/.json?t=week`)
      .then(res => res.json())
      .then(data => {
        redditData = data;
      });
    getPicture();
  }, [subReddit]);

  return {
    link,
    setLink,
    title,
    setTitle,
    subReddit,
    setSubReddit,
    loadRedditPost,
    subReddits,
    setSubReddits
  };
};

export default RedditContext;
