import React, { useState, useEffect } from "react";
import Todo from "../components/ToDo";
import { firestore } from "../services/firebaseConfig";
import { Grid, TextField, Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ToDoInterface } from "../helpers/interfaces";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
  });
  const handleChange = (event: any) => {
    const value = event.target.value;
    setInput({
      ...input,
      [event.target.name]: value,
    });
  };

  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  //   const [title, setDescription] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [description, setDescription] = useState("");
  const classes = useStyles();

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
    };
    firestore.collection("todos").add({
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
    });
    setInput({ title: " ", description: " ", dueDate: " ", priority: " " });
  };

  return (
    <div style={{ padding: "2em" }}>
      <h2> To Be Done</h2>
      <Grid container spacing={3} style={{ height: "80%" }}>
        {/* <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid> */}
        <Grid item xs={8} sm={8} md={4} lg={4}>
          <Paper className={classes.paper}>
            <TextField
              label="title"
              name="title"
              variant="outlined"
              size="small"
              value={input.title}
              // onChange={(e) => setInput({ title: e.target.value })}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              size="small"
              value={input.description}
              //onChange={(e) => setDescription(e.target.value)}
              onChange={handleChange}
            />
            {console.log(description)}
            <TextField
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
            {/*
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Due Date"
              value={input.dueDate}
              onChange={(e) => setInput({ dueDate: e.target.value })}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            </MuiPickersUtilsProvider> */}

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
            <Button
              disabled={!input}
              type="submit"
              variant="contained"
              className="App_submitBtn"
              onClick={createTodo}
            >
              SAVE
            </Button>
            {todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      {/* <Grid container spacing={3} justify="center" className="App__grid">
        
      </Grid>

       */}
    </div>
  );
}

export default ToDoGrid;
