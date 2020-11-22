import { FunctionComponent, useCallback, useContext } from "react";

import RedditContext from "../../context/redditContext";
import { validSubReddits } from "../../utils/data";
import styles from "./Post.module.css";

type Props = {};

const Post: FunctionComponent = () => {
  const { subReddit, link, title } = useContext(RedditContext);

  const getStyling = useCallback((): string => {
    switch (subReddit) {
      case "programminghumor":
        return styles.programmingHumor;
      case "programminhorror":
        return styles.programmingHorror;
    }
  }, []);

  return (
    <div className={`${styles.post} ${getStyling()}`}>
      <h4>{title}</h4>
      <img className={styles.pic} src={link} alt="" />
    </div>
  );
};

export default Post;
