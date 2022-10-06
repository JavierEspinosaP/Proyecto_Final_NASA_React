import React from "react";
import { shallow } from "enzyme";
import NeasCard from "./NeasCard";

describe("NeasCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NeasCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
