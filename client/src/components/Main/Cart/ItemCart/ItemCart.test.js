import React from "react";
import { shallow } from "enzyme";
import ItemCart from "./ItemCart";

describe("ItemCart", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ItemCart />);
    expect(wrapper).toMatchSnapshot();
  });
});
