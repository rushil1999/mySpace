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
import Modal from "@material-ui/core/Modal";
import { FormControl, TextField, Button } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { ToDoInterface } from "../helpers/interfaces";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 550,
  },
}));

function Todo(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<ToDoInterface | any>({
    title: props.todo.title,
    description: props.todo.description,
    dueDate: props.todo.dueDate,
    priority: props.todo.priority,
    status: props.todo.status,
  });
  const [openModalState, setOpenModalState] = useState<boolean>(false);
  const handleModal = () => {
    setOpenModalState(!openModalState);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event: any) => {
    const value = event.target.value;
    setInput({
      ...input,
      [event.target.name]: value,
    });
  };
  const updateTodo = () => {
    var formData = {
      description: input.description,
      dueDate: input.dueDate,
      priority: input.priority,
      title: input.title,
      status: input.status,
    };
    firestore.collection("todos").doc(props.todo.id).set(
      {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        status: -1,
      },
      { merge: true }
    );
    handleModal();
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
      <Dialog
        open={openModalState}
        onClose={handleModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="title"
              placeholder="xhjj"
              name="title"
              variant="outlined"
              size="small"
              value={input.title}
              // onChange={(e) => setInput({ title: e.target.value })}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="Description"
              placeholder={props.todo.description}
              name="description"
              variant="outlined"
              size="small"
              value={input.description}
              //onChange={(e) => setDescription(e.target.value)}
              onChange={handleChange}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="priority"
                value={input.priority}
                // onChange={(e) => setInput({ priority: e.target.value })}
                onChange={handleChange}
                placeholder={props.todo.priority}
              >
                <MenuItem value={-1}>Low</MenuItem>
                <MenuItem value={0}>Medium</MenuItem>
                <MenuItem value={1}>High</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="priority"
                value={input.priority}
                // onChange={(e) => setInput({ priority: e.target.value })}
                onChange={handleChange}
                placeholder={props.todo.priority}
              >
                <MenuItem value={-1}>To Do</MenuItem>
                <MenuItem value={0}>Doing</MenuItem>
                <MenuItem value={1}>Done</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={updateTodo}>
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} sm={12} md={12} lg={12}>
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
                  onClick={handleModal}
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
