import { useConfig } from "hooks/useConfig";
import React, { FunctionComponent, useContext, useEffect } from "react";

import RedditContext from "../../context/redditContext";
import Header from "../Header";
import Post from "../Post";
import styles from "./Reddit.module.css";

type Props = {};

const Reddit: FunctionComponent = ({}) => {
  const { subReddit, setSubReddit, loadRedditPost } = useContext(RedditContext);
  const { config } = useConfig();

  useEffect(() => {
    config.conf ? setSubReddit(config.conf.subReddit) : setSubReddit("");
  }, [config]);

  useEffect(() => {
    if (subReddit) {
      loadRedditPost();
    }
  }, [subReddit, setSubReddit]);

  return (
    <div className={styles.container}>
      <div className={styles.fullpost}>
        {subReddit && <Header />}
        {subReddit && <Post />}
      </div>
    </div>
  );
};

export default Reddit;
