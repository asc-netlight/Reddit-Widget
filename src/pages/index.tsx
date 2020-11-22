import { GetStaticProps, NextPage } from "next";

import Reddit from "../components/Reddit";
import RedditContext, { useRedditContext } from "../context/redditContext";

type Props = {
  buildTime: number;
};

const IndexPage: NextPage<Props> = ({ buildTime }) => {
  const contextValue = useRedditContext();

  return (
    <RedditContext.Provider value={contextValue}>
      <Reddit />
    </RedditContext.Provider>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      buildTime: Date.now()
    }
  };
};

export default IndexPage;
