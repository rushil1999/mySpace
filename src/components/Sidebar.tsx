import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Drawer } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { ViewAgenda } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function Sidebar(props: any) {
  console.log("IN Sidebar", props.history.location);

  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => () => {
    setState(!state);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem>
          <ListItemText primary="Environments" />
        </ListItem>
      </List>
      <List>
        <Divider />
        <ListItem button component={Link} to={"/box-grid"}>
          <ListItemIcon>
            <ViewAgenda />
          </ListItemIcon>
          <ListItemText primary="Resource Management" />
        </ListItem>
        <ListItem button component={Link} to={"/todo-grid"}>
          <ListItemIcon>
            <ViewAgenda />
          </ListItemIcon>
          <ListItemText primary="Task Management" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ViewAgenda />
          </ListItemIcon>
          <ListItemText primary="Music Player" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer()}>
        <MenuIcon />
      </Button>
      <Drawer open={state} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
}

export default Sidebar;
