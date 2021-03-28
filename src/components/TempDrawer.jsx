import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import { CircularProgress, ListSubheader } from "@material-ui/core";
import DropZone from "./Upload";
import Preview from "./Preview";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { saveFileToBox, getDatabaseDocumentById } from "../services/firestore";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
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

function TempDrawer(props) {
  // type RespStructure =
  //   | null
  //   | [string, undefined | Record<string, string | number | Array<string>>];
  const classes = useStyles();
  const { boxId } = props;
  console.log("TEMP DRAWER", boxId, props);
  const [box, setBox] = useState();
  const [urlArrayState, setUrlArrayState] = useState();
  const { state, onClose } = props;
  const [drawerInnerState, setDrawerInnerState] = useState(state);
  const [addNewFileState, setAddNewFileState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setFileUrl();
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  function fetchUrlList(urlArray) {
    if (urlArray && urlArray.length > 0) {
      const finalArray = [];
      if (box.files === undefined) {
        finalArray.push(...urlArray);
      } else {
        finalArray.push(...box.files);
        finalArray.push(...urlArray);
      }
      const response = saveFileToBox(box.id, finalArray);
      if (response) {
        console.log("Files adde to box");
        setUrlArrayState(finalArray);
      }
    }
  }

  useEffect(() => {
    setDrawerInnerState(state);
  }, [state]);

  useEffect(() => {
    console.log("USE EFFECT");
    fetchData(boxId);
  }, [boxId]);

  async function fetchData(boxId) {
    setLoading(true);
    const response = await getDatabaseDocumentById(boxId);
    console.log("IN FUNCTION", response[0], response[1]);
    const document = {
      id: response[0],
      description: response[1].description,
      name: response[1].name,
      files: response[1].files,
      category: response[1].category,
      fileNames: response[1].fileNames,
    };
    console.log("DOCUMENT", document);
    setBox(document);
    setLoading(false);
  }

  const content = () => (
    <div>
      <div
        className={clsx(classes.list)}
        role="presentation"
        // onClick={toggleDrawer()}
        // onKeyDown={toggleDrawer()}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListSubheader>Name: </ListSubheader>
            <ListItem>
              <ListItemText primary={box.name} />
            </ListItem>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListSubheader>Description: </ListSubheader>
            <ListItem>
              <ListItemText primary={box.description} />
            </ListItem>
          </ListItem>
        </List>
        <Divider />
        <List>
          {box.fileNames.map((fileName) => {
            return (
              <ListItem>
                <div>
                  <Typography
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    {fileName}
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
                    <Preview
                      file={
                        "https://firebasestorage.googleapis.com/v0/b/myspace-ec3c9.appspot.com/o/Resume.pdf?alt=media&token=e5622336-f8a8-45b7-9847-4280f9c47cfd"
                      }
                    ></Preview>
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

  console.log("Current Situation", loading, box);

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"right"} open={!!drawerInnerState} onClose={onClose}>
          {loading ? <CircularProgress /> : content()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
export default TempDrawer;
