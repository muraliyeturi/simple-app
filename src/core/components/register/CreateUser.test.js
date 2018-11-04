import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, getByText } from "react-testing-library";
import sinon from "sinon";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CreateUser from "./CreateUser";

const mockStore = configureMockStore();
const store = mockStore({
  userReducer: {
    result: {
      status: true
    }
  }
});

describe("component Create user ", () => {
  it("should mount component successfully", () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <CreateUser />
      </Provider>,
      container
    );
    ReactDOM.unmountComponentAtNode(container);
  });
});
