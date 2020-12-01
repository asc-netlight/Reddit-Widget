import { render } from "@testing-library/react";
import RedditContext from "context/redditContext";
import React from "react";

import RedditComponent from "./index";

describe("Clicker render", () => {
  test("renders without crashing", () => {
    render(
      <RedditContext.Provider
        value={
          {
            setSubReddit: () => {
              // do nothing
            }
          } as any
        }>
        <RedditComponent />
      </RedditContext.Provider>
    );
    expect(true);
  });
});
