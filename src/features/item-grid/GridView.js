import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import "./grid.scss";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class GridView extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="flex-start"
            alignItems="flex-start"
            spacing={16}
          >
            {this.props.data.map(obj => (
              <Grid key={obj.url} item>
                <Link to={obj.url}>
                  <Paper className={classes.paper} data-url={obj.url}>
                    <div className="grid">
                      <div className="thumb" />
                      {obj.details === undefined ? (
                        <div>
                          {obj.name ? (
                            <div className="name">
                              <b>Name : {obj.name}</b>
                            </div>
                          ) : (
                            <div className="name">
                              <b>Title : {obj.title}</b>
                            </div>
                          )}
                          <div className="character">
                            category : {this.props.category}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

GridView.propTypes = {
  data: PropTypes.object.isArray
};

export default withStyles(styles)(GridView);
