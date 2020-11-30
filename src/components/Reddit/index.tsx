import { useConfig } from "hooks/useConfig";
import { useLogger } from "hooks/useLogger";
import React, { FunctionComponent, useContext, useEffect } from "react";

import RedditContext from "../../context/redditContext";
import Header from "../Header";
import Post from "../Post";
import styles from "./Reddit.module.css";

const Reddit: FunctionComponent = () => {
  const { subReddit, setSubReddit, loadRedditPost } = useContext(RedditContext);
  const { logger } = useLogger("RedditComponent");
  const { config } = useConfig();

  useEffect(() => {
    config.conf ? setSubReddit(config.conf.subReddit) : setSubReddit("");
    logger("Config.conf: " + config.conf);
  }, [config]);

  useEffect(() => {
    if (subReddit) {
      loadRedditPost();
    }
  }, [subReddit, loadRedditPost]);

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
