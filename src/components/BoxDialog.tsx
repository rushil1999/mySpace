import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { BoxInterface } from "../helpers/interfaces";
import { saveBoxDocument } from "../services/firestore";
import { imageUrl } from "../helpers/constants";
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import { ThemeContext } from "../App";

export default function BoxDialog(props: any) {
  const { handlerFunction, onClickNewBoxButton } = props;
  const [loading, setLoading] = useState<Boolean>(false);
  const [dialogOpenState, setDialogOpenState] = useState<Boolean>(true);
  const [formState, setFormState] = useState<BoxInterface | any>({
    name: "",
    description: "",
    category: "",
    otherCategory: "",
  });

  const themeFunction = useContext(ThemeContext);
  const styles = themeFunction();
  const handleChange = (event: any) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  async function onBoxFormSubmit() {
    setLoading(true);
    var formData: BoxInterface = {
      name: formState.name,
      description: formState.description,
      category: formState.category
        ? formState.category
        : formState.otherCateogry,
      createdAt: new Date().getTime(),
      imgUrl: imageUrl.find(
        (element: Record<string, string>) =>
          element.category === formState.category
      )?.imgUrl,
    };
    const response: any = await saveBoxDocument(formData);
    if (response) {
      setLoading(false);
      setDialogOpenState(false);
      onClickNewBoxButton();
    }
  }

  return (
    <div>
      <Dialog
        open={!!dialogOpenState}
        onClose={handlerFunction}
        aria-labelledby="form-dialog-title"
      >
        {loading ? <CircularProgress></CircularProgress> : null}
        <DialogTitle id="form-dialog-title">Box Details</DialogTitle>
        <DialogContent>
          <form>
            <FormControl className={styles.formControl}>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={formState.name}
                name="name"
                label="Name"
                id="name"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={formState.description}
                name="description"
                label="Description"
                id="description"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                fullWidth
                margin="dense"
                value={formState.category}
                onChange={handleChange}
              >
                <MenuItem value={"Work"}>Work</MenuItem>
                <MenuItem value={"Fun"}>Fun</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"Love"}>Love</MenuItem>
                <MenuItem value={"SelfImprov"}>Self Improvment</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
              {formState.category === "Other" ? (
                <TextField
                  autoFocus
                  margin="dense"
                  fullWidth
                  value={formState.otherCategory}
                  name="otherCategory"
                  label="Catogory"
                  id="other cateogry"
                  onChange={handleChange}
                  required
                />
              ) : null}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerFunction} color="primary">
            Cancel
          </Button>
          <Button onClick={onBoxFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// TODO: Handle Service
//   async function onBoxFormSubmit() {
//     var formData = {
//       name: formState.name,
//       description: formState.description,
//     };
//     const boxArray: any = [];
//     firestore
//       .collection("box")
//       .get()
//       .then((querySnapshot) => {
//         const data = querySnapshot.docs.map((doc) => doc.data());
//         const ids = querySnapshot.docs.map((doc) => doc.id);
//         data.map((element) => {
//           const strictBox: BoxInterface = {
//             id: "",
//             name: element.name,
//             description: element.description,
//           };
//           boxArray.push(strictBox);
//         });

//         ids.map((element, index) => {
//           boxArray[index]["id"] = element;
//         });
//         console.log(boxArray);
//         if (boxArray.length) {
//           firestore
//             .collection("box")
//             .doc()
//             .set(formData)
//             .then(function () {
//               //TODO: Popup
//               console.log("Box successfully written!");
//             })
//             .catch(function (error) {
//               //TODO: Pop up Error dialog
//               console.error("Error writing Box: ", error);
//             });
//         }
//       });
//   }
