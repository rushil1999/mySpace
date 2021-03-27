import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import BoxSkeleton from "../components/BoxSkeleton";
import BoxDialog from "../components/BoxDialog";
import Button from "@material-ui/core/Button";
import { firestore } from "../services/firebaseConfig";
import { BoxInterface } from "../helpers/interfaces";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getDatabaseDocuments } from "../services/firestore";
import BoxDrawer from "../components/BoxDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

export default function BoxGrid() {
  console.log("Firebase oBject", firestore);
  const [spacing, setSpacing] = useState<GridSpacing>(4);
  const [openModalState, setOpenModalState] = useState<Boolean>(false);
  const [openBoxDrawerState, setOpenBoxDrawerState] = useState<Boolean>(false);
  const [boxes, setBoxes] = useState<Array<BoxInterface>>([]);
  const [childBoxId, setChildBoxId] = useState<String>("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const boxArray: Array<BoxInterface> = [];

  const handleModal = () => {
    setOpenModalState(!openModalState);
  };

  const handleChildBox = (boxId: string) => {
    console.log("Child found", boxId);
    setOpenBoxDrawerState(!openBoxDrawerState);
    setChildBoxId(boxId);
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
  }, []);

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
          <Grid container className={classes.root} spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>
                {boxes.map((boxData) => {
                  return (
                    <Grid item>
                      <BoxSkeleton
                        boxData={boxData}
                        parentHandlerFunction={handleChildBox}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          {openModalState ? (
            <BoxDialog handlerFunction={handleModal}></BoxDialog>
          ) : null}
          {openBoxDrawerState ? (
            <BoxDrawer
              boxData={boxes.find((element) => element.id == childBoxId)}
            ></BoxDrawer>
          ) : null}
        </div>
      )}
    </div>
  );
}
