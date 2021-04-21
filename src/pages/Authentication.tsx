import React, {useState, useContext} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ThemeContext } from "../App";
import {
  CircularProgress,
  FormControl,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { UserInterface } from '../helpers/interfaces';
import {auth} from '../services/firebaseConfig';

const Authentication = (props: any) => {
  const themeFunction = useContext(ThemeContext);
  const styles = themeFunction();
  const [loading, setLoading] = useState<Boolean>(false);
  const [dialogOpenState, setDialogOpenState] = useState<Boolean>(true);
  const [userCredentialState, setUserCredentialState] = useState<UserInterface>({
    email: "",
    password: ""
  });

  const onFormSubmit = async () => {
    setLoading(true);
    const {email, password} = userCredentialState;
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        var user = userCredential.user;
        console.log('User Created', user);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Failed User Creation", errorMessage);
      })
  }
    
    
  const handleChange = async (event: any) => {
    const value = event.target.value;
    setUserCredentialState({
      ...userCredentialState,
      [event.target.name]: value,
    })
  }

  return(
    <div>
      <Dialog
        open={!!dialogOpenState}
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
                value={userCredentialState.email}
                name="email"
                label="Eamil"
                id="email"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={userCredentialState.password}
                name="password"
                label="Password"
                id="password"
                onChange={handleChange}
                required
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Authentication;