import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, getByText } from "react-testing-library";
import sinon from "sinon";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import GridView from "./GridView";
import App from "../../app";

const mockStore = configureMockStore();
const store = mockStore({
  loginReducer: {
    result: {
      success: true
    }
  }
});

const mockData = [
  {url:'/1'}
]

describe("component grid view ", () => {
  it("should mount component successfully", () => {
    const container = document.createElement("div");

    ReactDOM.render(
      <Provider store={store}>
        <App>
          <GridView data={mockData} category={"people"}/>
        </App>
      </Provider>,
      container
    );
    ReactDOM.unmountComponentAtNode(container);
  });
});
