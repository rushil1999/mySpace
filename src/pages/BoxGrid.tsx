import React, { useState, useEffect, useContext } from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import BoxSkeleton from "../components/BoxSkeleton";
import BoxDialog from "../components/BoxDialog";
import Button from "@material-ui/core/Button";
import { BoxInterface } from "../helpers/interfaces";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getDatabaseDocuments } from "../services/firestore";
import TempDrawer from "../components/TempDrawer";
import { ThemeContext } from "../App";

export default function BoxGrid() {
  console.log("BOX Grid");
  const [spacing, setSpacing] = useState<GridSpacing>(4);
  const [openModalState, setOpenModalState] = useState<Boolean>(false);
  const [openBoxDrawerState, setOpenBoxDrawerState] = useState<Boolean>(false);
  const [boxes, setBoxes] = useState<Array<BoxInterface>>([]);
  const [childBoxId, setChildBoxId] = useState<String>("");
  const [loading, setLoading] = useState(true);
  const [addBoxState, setAddBoxState] = useState(false);
  // const classes = useStyles();
  const boxArray: Array<BoxInterface> = [];

  const themeFunction = useContext(ThemeContext);
  const styles = themeFunction();

  const handleModal = () => {
    setOpenModalState(!openModalState);
  };

  const onClickNewBoxButton = () => {
    setAddBoxState(true);
  };

  const onClickChildBox = (boxId: string) => {
    console.log("Skeleton Clicked", boxId, openBoxDrawerState);
    setChildBoxId(boxId);
    toggleChildDrawer();
  };

  const toggleChildDrawer = () => {
    setOpenBoxDrawerState(!openBoxDrawerState);
  };

  // useEffect(() => {
  // 	firestore
  // 		.collection('box')
  // 		.get()
  // 		.then(querySnapshot => {
  // 			const data = querySnapshot.docs.map(doc => doc.data());
  // 			const ids = querySnapshot.docs.map(doc => doc.id);
  // 			data.map((element) => {
  // 					const strictBox: BoxInterface = {
  // 						id: '',
  // 						name: element.name,
  // 						description: element.description,
  // 					}
  // 					boxArray.push(strictBox);
  // 			})

  // 			ids.map((element, index) => {
  // 				boxArray[index]["id"] = element;
  // 			})
  // 			console.log(boxArray);
  // 			if(boxArray){
  // 				setBoxes(boxArray);
  // 				setLoading(false);
  // 			}
  //   });
  //   }, []);

  useEffect(() => {
    async function loadContent() {
      const boxArray = await getDatabaseDocuments();
      if (boxArray) {
        setBoxes(boxArray);
        setLoading(false);
      }
    }
    loadContent();
  }, [addBoxState]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Button variant="outlined" color="primary" onClick={handleModal}>
              ADD BOX
            </Button>
          </div>
          <Grid container className={styles.root} spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>
                {boxes.map((boxData) => {
                  return (
                    <Grid item>
                      <BoxSkeleton
                        boxData={boxData}
                        onClickChildBox={onClickChildBox}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          {openModalState ? (
            <BoxDialog
              handlerFunction={handleModal}
              onClickNewBoxButton={onClickNewBoxButton}
            ></BoxDialog>
          ) : null}
          {openBoxDrawerState ? (
            <div>
              <TempDrawer
                boxId={boxes!.find((element) => element.id === childBoxId)!.id}
                state={openBoxDrawerState}
                onClose={toggleChildDrawer}
              ></TempDrawer>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
