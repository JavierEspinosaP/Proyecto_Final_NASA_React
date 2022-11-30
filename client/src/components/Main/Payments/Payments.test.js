import React from "react";
import { shallow } from "enzyme";
import Payments from "./Payments";

describe("Payments", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Payments />);
    expect(wrapper).toMatchSnapshot();
  });
});
