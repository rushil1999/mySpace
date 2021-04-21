import React, { useState, useEffect } from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import BoxSkeleton from "../components/BoxSkeleton";
import BoxDialog from "../components/BoxDialog";
import Button from "@material-ui/core/Button";
import { BoxInterface } from "../helpers/interfaces";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getDatabaseDocuments } from "../services/firestore";
import BoxDrawer from "../components/BoxDrawer";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default function BoxGrid() {
  const [openModalState, setOpenModalState] = useState<Boolean>(false);
  const [openBoxDrawerState, setOpenBoxDrawerState] = useState<Boolean>(false);
  const [boxes, setBoxes] = useState<Array<BoxInterface>>([]);
  const [childBoxId, setChildBoxId] = useState<String>("");
  const [loading, setLoading] = useState(true);
  const [addBoxState, setAddBoxState] = useState(false);

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
    }),
  );
  const styles = useStyles();



  const handleModal = () => {
    setOpenModalState(!openModalState);
  };

  const onClickNewBoxButton = () => {
    setAddBoxState(true);
  };

  const toggleChildDrawer = () => {
    setOpenBoxDrawerState(!openBoxDrawerState);
  };

  const onGridButtonClicked = (boxId: any) => {
    setChildBoxId(boxId);
    toggleChildDrawer();
  };

  useEffect(() => {
    async function loadContent() {
      const boxArray: Array<BoxInterface> = [];
      const response = await getDatabaseDocuments();
      if (response) {
        response.forEach((element: any) => {
          const box: BoxInterface = {
            id: element.id,
            name: element.name,
            description: element.description,
            createdAt: element.createdAt,
            imgUrl: element.imgUrl,
          };
          boxArray.push(box);
        });
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
          <div style={{ marginTop: "1em", marginBottom: "1em"}}>
            <Button variant="outlined" color="primary" onClick={handleModal}>
              ADD BOX
            </Button>
          </div>
          <Grid
            key="outerGrid"
            className={styles.root}
            container justify="center"
          >
            {boxes.map((boxData) => {
              return (
                <Grid item>
                  <Button
                    key="skeleton-button"
                    onClick={() => {
                      onGridButtonClicked(boxData.id);
                    }}
                  >
                    <BoxSkeleton boxData={boxData} />
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          {openModalState ? (
            <BoxDialog
              handlerFunction={handleModal}
              onClickNewBoxButton={onClickNewBoxButton}
            ></BoxDialog>
          ) : null}
          {openBoxDrawerState ? (
            <div>
              <BoxDrawer
                boxId={boxes!.find((element) => element.id === childBoxId)!.id}
                state={openBoxDrawerState}
                onClose={toggleChildDrawer}
              ></BoxDrawer>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}





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
