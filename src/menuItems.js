import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Home from "@material-ui/icons/Home";

import Movie from "@material-ui/icons/Movie";
import People from "@material-ui/icons/People";
import Motorcycle from "@material-ui/icons/Motorcycle";
import Stars from "@material-ui/icons/Stars";
import Language from "@material-ui/icons/Language";

import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Book from "@material-ui/icons/Book";

import { Link } from "react-router-dom";

export const mainMenu = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
  </div>
);

export const menu = (
  <div>
    <Link to="/people">
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="PEOPLE" />
      </ListItem>
    </Link>
    <Link to="/films">
      <ListItem button>
        <ListItemIcon>
          <Movie />
        </ListItemIcon>
        <ListItemText primary="FILM" />
      </ListItem>
    </Link>
    <Link to="/planets">
      <ListItem button>
        <ListItemIcon>
          <Language />
        </ListItemIcon>
        <ListItemText primary="PLANETS" />
      </ListItem>
    </Link>
    <Link to="/species">
      <ListItem button>
        <ListItemIcon>
          <Book />
        </ListItemIcon>
        <ListItemText primary="SPECIES" />
      </ListItem>
    </Link>
    <Link to="/starships">
      <ListItem button>
        <ListItemIcon>
          <Stars />
        </ListItemIcon>
        <ListItemText primary="STARSHIPS" />
      </ListItem>
    </Link>
    <Link to="/vehicles">
      <ListItem button>
        <ListItemIcon>
          <Motorcycle />
        </ListItemIcon>
        <ListItemText primary="VEHICLES" />
      </ListItem>
    </Link>
  </div>
);
