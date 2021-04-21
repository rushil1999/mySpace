import { CircularProgress, Drawer, ListSubheader } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import { AssetInterface, BoxInterface } from "../helpers/interfaces";
import { getDocumentByIdAndType } from "../services/firestore";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Grid from "@material-ui/core/Grid";
// import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
// import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";
// import Preview from "./Preview";
import DropZone from "./Upload";
import AssetGrid from './AssetGrid';
import {
  saveDocumentByIdAndType,
  updateDocumentByIdAndType,
} from "../services/firestore";

function BoxDrawer(props: any) {
  const themeFunction = useContext(ThemeContext);
  const styles = themeFunction();
  const { state, boxId, onClose } = props;
  const [drawerState] = useState<boolean>(state);
  const [loading, setLoading] = useState<boolean>(true);
  const [boxState, setBoxState] = useState<BoxInterface>();
  const [assets, setAssets] = useState<Array<AssetInterface>>();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [assetContent, setAssetContent] = useState<string>();
  // const open = Boolean(anchorEl);

  // const handlePopoverOpen = (anchorValue: any, assetContent: any) => {
  //   setAnchorEl(anchorValue);
  //   setAssetContent(assetContent);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  function fetchUploadedAssets(assetArray: any) {
    console.log("assetArray", assetArray);
    saveAssets(assetArray);
  }

  async function saveAssets(assetArray: any) {
    const savedAssetIds: Array<string> = [];
    for (const asset of assetArray) {
      const response = await saveDocumentByIdAndType(asset, "assets");
      if (response && response.id) {
        savedAssetIds.push(response.id);
      }
    }
    await allocateAssetsToBox(savedAssetIds);
  }
  //Curently the entore assets array get updated 
  //TODO: Optimize assets array updation
  async function allocateAssetsToBox(savedAssetIds: Array<string>) {
    const currentBoxAssetIdArray: any = boxState!.assets;
    currentBoxAssetIdArray.push(...savedAssetIds);
    const response: any = await updateDocumentByIdAndType(
      boxState!.id,
      { assets: currentBoxAssetIdArray },
      "box"
    );
    if(!response){
      // const assetArray = await fetchBoxAssets(boxState.assets);
      // setAssets(assetArray);  
    }
    
  }

  useEffect(() => {
    setLoading(true);
    async function getBoxData() {
      const responseArray = await getDocumentByIdAndType(boxId, "box");
      const id = responseArray![0]?.toString();
      const data: any = responseArray![1];
      const { name, description, category, createdAt, assets } = data;
      console.log(data, id);
      if (id && data) {
        const box: BoxInterface = {
          id: id,
          name,
          description,
          createdAt,
          category,
          assets,
        };
        const assetArray = await fetchBoxAssets(assets);
        setAssets(assetArray);
        setBoxState(box);
        setLoading(false);
      }
    }
    getBoxData();
  }, [boxId]);

  async function fetchBoxAssets(
    assetIds: Array<string>
  ): Promise<Array<AssetInterface>> {
    const assetsArray: Array<AssetInterface> = [];
    for (const assetId of assetIds) {
      const responseArray = await getDocumentByIdAndType(assetId, "assets");
      const id = responseArray![0]?.toString();
      const data: any = responseArray![1];
      const { name, content } = data;
      if (id && data) {
        const asset: AssetInterface = {
          id,
          name,
          content,
        };
        assetsArray.push(asset);
      }
    }
    return assetsArray;
  }

  return (
    <React.Fragment key="right-drawer">
      <Drawer anchor="right" open={drawerState} onClose={onClose}>
        <div className={styles.list}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <List>
                <ListItem>
                  <ListSubheader>Name: </ListSubheader>
                  <ListItem>
                    <ListItemText primary={boxState!.name} />
                  </ListItem>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <ListSubheader>Description: </ListSubheader>
                  <ListItem>
                    <ListItemText primary={boxState!.description} />
                  </ListItem>
                </ListItem>
              </List>
              <Divider />
              <AssetGrid
                items={assets}
              ></AssetGrid>
              <div>
                <DropZone sendUploadedAssetsToParent={fetchUploadedAssets} />
              </div>
            </>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default BoxDrawer;

