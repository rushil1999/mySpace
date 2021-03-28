import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { firestore } from "../services/firebaseConfig";
import Dialog from "@material-ui/core/Dialog";
import Modal from "@material-ui/core/Modal";
import { FormControl, TextField, Button } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    marginTop: "2em",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalform: {
    marginTop: "2em",
  },
}));

function Todo(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    firestore.collection("todos").doc(props.todo.id).set(
      {
        description: input,
      },
      { merge: true }
    );
    setInput("");
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className="todo__modal"
      >
        <div className={classes.paper}>
          <h4>update todo</h4>
          <FormControl className={classes.modalform}>
            <form>
              <TextField
                label="update todo"
                placeholder={props.todo.description}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                className="todo__submit"
                onClick={updateTodo}
              >
                update
              </Button>
            </form>
          </FormControl>
        </div>
      </Modal>

      <Grid item xs={2} sm={2} md={12} lg={12}>
        <Paper>
          <List>
            <ListItem>
              <ListItemText
                primary={props.todo.title}
                secondary={props.todo.description}
              />
              <ListItemSecondaryAction>
                {props.todo.priority >= 0 ? (
                  props.todo.priority ? (
                    <Chip label="High" color="secondary" size="small" />
                  ) : (
                    <Chip label="Medium" color="primary" size="small" />
                  )
                ) : (
                  <Chip label="Low" size="small" />
                )}
                <IconButton
                  edge="end"
                  color="primary"
                  aria-label="edit"
                  onClick={handleOpen}
                  size="small"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={(event) =>
                    firestore.collection("todos").doc(props.todo.id).delete()
                  }
                  edge="end"
                  color="secondary"
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </div>
  );
}

export default Todo;
