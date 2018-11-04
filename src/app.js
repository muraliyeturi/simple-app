import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { menu, mainMenu } from "./menuItems";
import ListItem from "@material-ui/core/ListItem";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./core/components/login/Login";
import ItemGrid from "./features/item-grid/ItemGrid";
import ItemDetails from "./features/item-details/ItemDetails";
import { connect } from "react-redux";

import { logout } from "./actions/login";

import "./app.scss";
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight - 10,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class MiniDrawer extends React.Component {
  constructor() {
    super();
    this.isLoggedInStatus = this.isLoggedInStatus.bind(this);
    this.state = {
      open: false,
      isLoggedIn: window.localStorage.getItem("currentUser") !== null
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  isLoggedInStatus = status => {
    if (status) {
      this.setState({ isLoggedIn: true });
      setTimeout(() => {
        NotificationManager.success(
          "user successfully logged in",
          "Welcome..!"
        );
      }, 500);
    }
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    this.props.dispatch(logout());
  };

  render() {
    const { classes, theme } = this.props;
    let appContext = (
      <Login sendData={this.isLoggedInStatus} onClick={() => {}} />
    );

    if (this.state.isLoggedIn) {
      appContext = (
        <Router>
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift
              )}
            >
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  SWAPI list Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                )
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <List>{mainMenu}</List>
              <Divider />
              <List>{menu}</List>
              <Divider />
              <ListItem button onClick={this.handleLogout}>
                <span className="logout">Logout</span>
              </ListItem>
            </Drawer>
            <main className={classes.content}>
              <div className="padding-top-60" />
              <Route exact path="/people" component={ItemGrid} />
              <Route exact path="/people/:id" component={ItemDetails} />
              <Route exact path="/films" component={ItemGrid} />
              <Route exact path="/films/:id" component={ItemDetails} />
              <Route exact path="/planets" component={ItemGrid} />
              <Route exact path="/planets/:id" component={ItemDetails} />
              <Route exact path="/species" component={ItemGrid} />
              <Route exact path="/species/:id" component={ItemDetails} />
              <Route exact path="/starships" component={ItemGrid} />
              <Route exact path="/starships/:id" component={ItemDetails} />
              <Route exact path="/vehicles" component={ItemGrid} />
              <Route exact path="/vehicles/:id" component={ItemDetails} />
            </main>
            <NotificationContainer />
          </div>
        </Router>
      );
    }

    return appContext;
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  //redux state catch will go here
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(MiniDrawer)
);
