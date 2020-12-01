import { FunctionComponent, useCallback, useContext } from "react";

import RedditContext from "../../context/redditContext";
import styles from "./Post.module.css";

const Post: FunctionComponent = () => {
  const { subReddit, link, title } = useContext(RedditContext);

  const getStyling = useCallback((): string => {
    switch (subReddit) {
      case "ProgrammerHumor":
        return styles.programmingHumor;
      case "programminghorror":
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
