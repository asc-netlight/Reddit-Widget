import { render, screen } from "@testing-library/react";

import RedditComponent from "./index";

describe("Clicker render", () => {
  it("renders without crashing", () => {
    render(<RedditComponent />);
    expect(screen.getAllByRole("heading")).toHaveLength(1);
  });
});
