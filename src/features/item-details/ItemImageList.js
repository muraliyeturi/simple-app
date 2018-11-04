import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import "./item-image-list.scss";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class ItemImageList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="item-image-list">
        <h3>{this.props.category} </h3>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="flex-start"
              spacing={16}
            >
              {this.props.data.map(obj => (
                <Grid key={obj.url} item>
                  <Link to={obj.url}>
                    <Paper className={classes.paper}>
                      <div className="grid">
                        <div className="thumb" />
                      </div>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ItemImageList.propTypes = {
  data: PropTypes.object.isArray
};

export default withStyles(styles)(ItemImageList);
