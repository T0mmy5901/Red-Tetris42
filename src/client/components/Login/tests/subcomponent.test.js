import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LoginSub from "../subcomponent";
import { StyledForm, StyledTextField } from "../styles";

const props = {
  connectPlayer: jest.fn()
};

describe("<LoginSub />", () => {
  test("should render without crashing", () => {
    const wrapper = shallow(<LoginSub {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("should update playerName and set error to true with a too long playerName", () => {
    const wrapper = shallow(<LoginSub {...props} />);
    const event = { target: { value: "PlayerNameTooLong" } };

    wrapper.find(StyledTextField).simulate("change", event);
    expect(wrapper.find(StyledTextField).props().value).toBe(
      "PlayerNameTooLong"
    );
    expect(wrapper.find(StyledTextField).props().error).toBeTruthy();
  });

  test("should update playerName, set error to true and not call connectPlayer on submit with an unvalid character", () => {
    const wrapper = shallow(<LoginSub {...props} />);
    const event = { target: { value: "Name$" } };

    wrapper.find(StyledTextField).simulate("change", event);
    expect(wrapper.find(StyledTextField).props().value).toBe("Name$");
    expect(wrapper.find(StyledTextField).props().error).toBeTruthy();
    wrapper.find(StyledForm).simulate("submit", {
      preventDefault: () => {}
    });
    expect(props.connectPlayer.mock.calls.length).toBe(0);
  });

  test("should update playerName, set error to false and call connectPlayer on Submit with a valid input", () => {
    const wrapper = shallow(<LoginSub {...props} />);
    const event = { target: { value: "ValidName" } };

    wrapper.find(StyledTextField).simulate("change", event);
    expect(wrapper.find(StyledTextField).props().value).toBe("ValidName");
    expect(wrapper.find(StyledTextField).props().error).not.toBeTruthy();
    wrapper.find(StyledForm).simulate("submit", {
      preventDefault: () => {}
    });
    expect(props.connectPlayer.mock.calls.length).toBe(1);
  });
});
