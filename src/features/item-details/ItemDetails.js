import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridView from "../item-grid/GridView";
import ItemImageList from "./ItemImageList";
import api from "../../common/apiConfig";

import "./item-details.scss";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: "flex",
    width: 400
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class ItemDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      results: [],
      thumb: [
        {
          url: "image1",
          title: "1",
          category: "",
          details: "none"
        },
        {
          url: "image2",
          title: "2",
          category: "",
          details: "none"
        },
        {
          url: "image3",
          title: "3",
          category: "",
          details: "none"
        },
        {
          url: "image4",
          title: "4",
          category: "",
          details: "none"
        },
        {
          url: "image5",
          title: "5",
          category: "",
          details: "none"
        }
      ],
      spacing: "16"
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
    const { classes } = this.props;
    const { spacing } = this.state;
    const cardSize = {
      height: 50,
      width: 50
    };

    const miniCardSize = {
      height: 20,
      width: 20
    };

    const cleanArray = obj => {
      let arry = [];
      for (const item in obj) {
        arry.push({ url: obj[item] });
      }
      return arry;
    };

    const itemDisplayDetails = item => {
      let itemValue = this.state[item.key];
      const hiddenKey = [
        "results",
        "thumb",
        "spacing",
        "vehicles",
        "species",
        "starships",
        "url",
        "films",
        "people",
        "characters",
        "planets",
        "homeworld"
      ];
      if (itemValue && !hiddenKey.includes(item.key)) {
        return (
          <li key={item.key}>
            <b>{item.key.toString().replace(/_/g, " ")}:</b> {itemValue}
          </li>
        );
      }
    };

    return (
      <div className="item-details">
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="flex-start"
              spacing={16}
            >
              <Grid item>
                <Paper className={classes.paper}>
                  <div className="item-gallery">
                    <div className="thumb-main">thumb</div>
                    <GridView
                      data={this.state.thumb}
                      category={category}
                      card-size={cardSize}
                    />
                  </div>
                  <div className="details">
                    <div className="item-name">
                      {this.state.name ? (
                        <h3>name: {this.state.name}</h3>
                      ) : (
                        <h3>title: {this.state.title}</h3>
                      )}
                    </div>
                    <div className="category">
                      <i>category: {category}</i>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <ul className="details">
                    {Object.keys(this.state).map(key => {
                      return itemDisplayDetails({ key });
                    })}
                  </ul>
                  <div>
                    {this.state.films ? (
                      <div className="item-gallery-mini">
                        <ItemImageList
                          data={cleanArray(this.state.films)}
                          card-size={miniCardSize}
                          category="Films"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.species ? (
                      <div className="item-gallery-mini">
                        <ItemImageList
                          data={cleanArray(this.state.species)}
                          card-size={miniCardSize}
                          category="Species"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.vehicles ? (
                      <div className="item-gallery-mini">
                        <ItemImageList
                          data={cleanArray(this.state.vehicles)}
                          card-size={miniCardSize}
                          category="Vehicles"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.starships ? (
                      <div className="item-gallery-mini">
                        <ItemImageList
                          data={cleanArray(this.state.starships)}
                          card-size={miniCardSize}
                          category="Starships"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.people ? (
                      <div className="item-gallery-mini">
                        <ItemImageList
                          data={cleanArray(this.state.people)}
                          card-size={miniCardSize}
                          category="people"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ItemDetails);
