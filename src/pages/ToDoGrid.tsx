import React, { useState, useEffect } from "react";
import Todo from "../components/ToDo";
import { firestore } from "../services/firebaseConfig";
import { Grid, TextField, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ToDoInterface } from "../helpers/interfaces";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 550,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      // padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "35em",
    },
  })
);
function ToDoGrid() {
  const [input, setInput] = useState<ToDoInterface | any>({
    title: " ",
    description: " ",
    dueDate: " ",
    priority: " ",
    status: " ",
  });
  const handleChange = (event: any) => {
    const value = event.target.value;
    setInput({
      ...input,
      [event.target.name]: value,
    });
  };

  const [todos, setTodos] = useState([]);
  const [openModalState, setOpenModalState] = useState<boolean>(false);
  const classes = useStyles();
  const handleModal = () => {
    setOpenModalState(!openModalState);
  };
  useEffect(() => {
    firestore.collection("todos").onSnapshot((snapshot: any) => {
      console.log(snapshot.docs);
      setTodos(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          description: doc.data().description,
          dueDate: doc.data().dueDate,
          priority: doc.data().priority,
          title: doc.data().title,
          status: doc.data().status,
        }))
      );
    });
  }, []);

  const createTodo = (e: any) => {
    e.preventDefault();
    var formData = {
      description: input.description,
      dueDate: input.dueDate,
      priority: input.priority,
      title: input.title,
      status: input.status,
    };
    firestore.collection("todos").add({
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: -1,
    });
    setInput({ title: " ", description: " ", dueDate: " ", priority: " " });
  };

  return (
    <div>
      <Dialog
        open={openModalState}
        onClose={handleModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Task Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="title"
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
              name="description"
              variant="outlined"
              size="small"
              value={input.description}
              //onChange={(e) => setDescription(e.target.value)}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              id="date"
              name="dueDate"
              label="Due Date"
              type="date"
              defaultValue="2017-05-24"
              value={input.dueDate}
              // onChange={(e) => setInput({ dueDate: e.target.value })}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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
              >
                <MenuItem value={-1}>Low</MenuItem>
                <MenuItem value={0}>Medium</MenuItem>
                <MenuItem value={1}>High</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!input}
            type="submit"
            color="primary"
            onClick={createTodo}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ padding: "1.5em" }}>
        <div style={{ marginBottom: "0.5em" }}>
          <Fab color="primary" aria-label="add" onClick={handleModal}>
            <AddIcon />
          </Fab>
          <p>ADD TASK</p>
        </div>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.paper} elevation={3}>
              <h2> To Do </h2>
              {todos &&
                todos
                  .filter((todo: any) => todo.status == -1)
                  .map((todo, index) => {
                    return <Todo todo={todo} />;
                  })}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.paper} elevation={3}>
              <h2> Doing </h2>
              {todos &&
                todos
                  .filter((todo: any) => todo.status == 0)
                  .map((todo, index) => {
                    return <Todo todo={todo} />;
                  })}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.paper} elevation={3}>
              <h2> Done </h2>
              {todos &&
                todos
                  .filter((todo: any) => todo.status == 1)
                  .map((todo, index) => {
                    return <Todo todo={todo} />;
                  })}
            </Paper>
          </Grid>
        </Grid>
        {/* <Grid container spacing={3} justify="center" className="App__grid">
        
      </Grid>

       */}
      </div>
    </div>
  );
}

export default ToDoGrid;
