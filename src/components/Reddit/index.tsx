import { useConfig } from "hooks/useConfig";
import { useLogger } from "hooks/useLogger";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";

import RedditContext from "../../context/redditContext";
import Header from "../Header";
import Post from "../Post";
import styles from "./Reddit.module.css";

type Props = {};

const Reddit: FunctionComponent = ({}) => {
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
