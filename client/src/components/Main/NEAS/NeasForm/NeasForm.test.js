import React from "react";
import { shallow } from "enzyme";
import NeasForm from "./NeasForm";

describe("NeasForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NeasForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
