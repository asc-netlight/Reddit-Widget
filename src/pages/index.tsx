import { NextPage } from "next";

import Reddit from "../components/Reddit";
import RedditContext, { useRedditContext } from "../context/redditContext";

const IndexPage: NextPage = () => {
  const contextValue = useRedditContext();

  return (
    <RedditContext.Provider value={contextValue}>
      <Reddit />
    </RedditContext.Provider>
  );
};

export default IndexPage;
