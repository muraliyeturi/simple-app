import React from "react";
import GridView from "./GridView";
import api from "../../common/apiConfig";

class ItemGrid extends React.Component {
  constructor(props) {
    super();
    this.state = {
      results: []
    };
  }
  componentDidMount() {
    const handle = this.props.match.url;
    const _this = this;

    fetch(`${api.domain}/api${handle}`)
      .then(response => response.json())
      .then(responseJSON => {
        _this.setState(responseJSON);
      });
  }

  render() {
    const category = this.props.match.url.split("/")[1];
    const cardSize = {
      height: 290,
      width: 200
    };

    return (
      <div>
        <GridView
          data={this.state.results}
          category={category}
          card-size={cardSize}
        />
      </div>
    );
  }
}

export default ItemGrid;
