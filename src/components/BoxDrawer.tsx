import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import { ListSubheader } from "@material-ui/core";
import DropZone from "./Upload";
import Preview from "./Preview";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { saveFileToBox } from "../services/firestore";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
    list: {
      width: 550,
    },
    fullList: {
      width: "auto",
    },
  })
);

function BoxDrawer(props: any) {
  const classes = useStyles();
  const [openDrawerState, setOpenDrawerState] = useState<Boolean>(true);
  const [addNewFileState, setAddNewFileState] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { id, name, description, files } = props.boxData;
  console.log("Props", name, description, props);

  const toggleDrawer = () => () => {
    setOpenDrawerState(!openDrawerState);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function fetchUrlList(urlArray: Array<String>) {
    if (urlArray && urlArray.length > 0) {
      const finalArray = [];
      if (files === undefined) {
        finalArray.push(...urlArray);
      } else {
        finalArray.push(...files);
        finalArray.push(...urlArray);
      }
      const response = saveFileToBox(id, finalArray);
      if (response) {
        console.log("Files adde to box");
        setAddNewFileState(true);
      }
    }
  }

  const list = () => (
    <div>
      <div
        className={clsx(classes.list)}
        role="presentation"
        // onClick={toggleDrawer()}
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
        <Divider />
        <List>
          {files.map((file: string) => {
            return (
              <ListItem>
                <div>
                  <Typography
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    {file}
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                    anchorPosition={{
                      left: 50000,
                      top: 10,
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    {/* <Typography>I use Popover.</Typography> */}
                    <Preview file={file}></Preview>
                  </Popover>
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
      <div>
        <DropZone sendUrlListToParent={fetchUrlList} />
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
