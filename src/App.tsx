import React from "react";
import "./App.css";
import Routes from "./components/Routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 500,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      position: "absolute",
      marginTop: "2em",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    list: {
      width: 550,
    },
    fullList: {
      width: "auto",
    },
    card: {
      maxWidth: 345,
      margin: theme.spacing(2),
    },
    media: {
      height: 190,
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    modalform: {
      marginTop: "2em",
    },
  })
);

export const ThemeContext = React.createContext(useStyles);

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <ThemeContext.Provider value={useStyles}>
          <Routes />
        </ThemeContext.Provider>
      </React.Fragment>
    </div>
  );
}

export default App;
