import { FunctionComponent, useCallback, useContext } from "react";

import RedditContext from "../../context/redditContext";
import styles from "./Header.module.css";

type Props = {};

const Header: FunctionComponent = () => {
  const { subReddit } = useContext(RedditContext);

  const getStyling = useCallback((): string => {
    switch (subReddit) {
      case "ProgrammerHumor":
        return styles.programmingHumor;
      case "programminhorror":
        return styles.programmingHorror;
    }
  }, []);

  return (
    <div className={`${styles.header} ${getStyling()}`}>
      <p>{`Today's Top Posts @ /r/${subReddit}`}</p>
    </div>
  );
};

export default Header;
