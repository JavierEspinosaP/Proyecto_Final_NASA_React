import React from "react";
import { shallow } from "enzyme";
import NeasForm from "./NeasEditForm";

describe("NeasForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NeasForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
