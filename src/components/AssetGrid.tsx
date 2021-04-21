import React, {useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "../App";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Preview from "./Preview";

const AssetGrid = (props: any) => {
  const themeFunction = useContext(ThemeContext);
  const styles = themeFunction();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [assetContent, setAssetContent] = useState<string>();
  const [popoverState, setPopOverState] = useState<Boolean>(false);
  const {items} = props;

  const handlePopoverOpen = (anchorValue: any, assetContent: any) => {
    setAnchorEl(anchorValue);
    setPopOverState(true);
    setAssetContent(assetContent);
  };

  const handlePopoverClose = () => {
    setPopOverState(false);
    setAnchorEl(null);
  };

  return(
    <Grid
      key="outerGrid"
      className={styles.root}
      container justify="center"
      spacing={4}
      >
        {items!.map((asset: any) => {
          return (
            <Grid item>
              <InsertDriveFileIcon
                key={asset!.name}
                onMouseEnter={(event) => {
                  handlePopoverOpen(
                    event.currentTarget,
                    asset!.content
                  );
                }}
                onMouseLeave={handlePopoverClose}
              ></InsertDriveFileIcon>
              <Typography
                variant="button"
                display="block"
                gutterBottom
              >
                {asset.name}
              </Typography>
              <Popover
                id="mouse-over-popover"
                className={styles.popover}
                classes={{
                  paper: styles.paper,
                }}
                open={!!popoverState}
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
                <Preview file={assetContent}></Preview>
              </Popover>
            </Grid>
          );
        })}
      </Grid>
  );
}

export default AssetGrid;