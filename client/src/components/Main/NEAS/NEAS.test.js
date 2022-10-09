import React from "react";
import { shallow } from "enzyme";
import NEAS from "./NEAS";

describe("NEAS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NEAS />);
    expect(wrapper).toMatchSnapshot();
  });
});
