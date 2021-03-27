import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import TextField from "@material-ui/core/TextField";
import { ListSubheader } from "@material-ui/core";
import DropZone from "./Upload";

const useStyles = makeStyles({
  list: {
    width: 550,
  },
  fullList: {
    width: "auto",
  },
});

function BoxDrawer(props: any) {
  const classes = useStyles();
  const [openDrawerState, setOpenDrawerState] = useState<Boolean>(true);
  const { name, description } = props.boxData;
  console.log("Props", name, description, props);

  const toggleDrawer = () => () => {
    setOpenDrawerState(!openDrawerState);
  };

  const list = () => (
    <div>
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListSubheader>Name: </ListSubheader>
            <br></br>
            <ListItemText primary={name} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListSubheader>Description: </ListSubheader>
            <br></br>
            <ListItemText primary={description} />
          </ListItem>
        </List>
      </div>
      <div>
        <DropZone />
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={!!openDrawerState}
          onClose={toggleDrawer()}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default BoxDrawer;
