import React from "react";
import { shallow } from "enzyme";
import LandingsForm from "./LandingsEditForm";

describe("LandingsForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LandingsForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
