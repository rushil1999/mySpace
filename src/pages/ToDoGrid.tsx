import React, { useState, useEffect } from "react";
import Todo from "../components/ToDo";
import { firestore } from "../services/firebaseConfig";
import { Grid, TextField, Button } from "@material-ui/core";

function ToDoGrid() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    firestore.collection("todos").onSnapshot((snapshot: any) => {
      setTodos(
        snapshot.docs.map((doc: any) => ({ id: doc.id, todo: doc.data().todo }))
      );
    });
  }, []);

  const createTodo = (e: any) => {
    e.preventDefault();
    firestore.collection("todos").add({
      todo: input,
    });
    setInput("");
  };

  return (
    <div style={{ marginTop: "1em" }}>
      <h2> To Be Done</h2>
      <Grid container spacing={3} justify="center" className="App__grid">
        <Grid item xs={8} sm={8} md={4} lg={4}>
          <TextField
            label="create todo"
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            className="App_submitBtn"
            onClick={createTodo}
          >
            SAVE
          </Button>
        </Grid>
      </Grid>

      {todos.map((todo) => (
        <Todo todo={todo} />
      ))}
    </div>
  );
}

export default ToDoGrid;
