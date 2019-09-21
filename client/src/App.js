import "./App.css";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import TaskNavigation from "./components/TaskNavigation/TaskNavigation";
import Task from "./components/Task/Task";
import AddDialog from "./components/AddDialog/AddDialog";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import _ from "lodash";
import axios from "axios";

const drawerWidth = 300;

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  fabButton: {
    position: "fixed",
    zIndex: 1,
    bottom: "1rem",
    right: "1rem",
    margin: "0 auto"
  }
});

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [fetchedTask, setfetchedTask] = React.useState([]);

  const [showedTask, setshowedTask] = React.useState({});

  function handleDialogToggle() {
    setDialogOpen(!dialogOpen);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  function clickNav(index) {
    const task = _.find(fetchedTask, { _id: index });
    task.description = task.description;
    console.log(task);
    setshowedTask(task);
  }

  function orderBy(value) {
    console.log(value);
    const newTaskList = _.orderBy(
      fetchedTask,
      value,
      value === "priority" ? "desc" : "asc"
    );
    console.log(newTaskList);
    setfetchedTask(newTaskList);
  }

  useEffect(() => {
    axios
      .get("/api/task/")
      .then(res => setfetchedTask(res.data))
      .catch(err => console.log(err));
  }, []);

  const drawer = (
    <TaskList
      clicked={clickNav}
      orderBy={orderBy}
      taskList={fetchedTask}
      showedTask={showedTask}
    ></TaskList>
  );

  return (
    <div className={classes.root}>
      <Header
        drawerWidth={drawerWidth}
        drawerToggle={handleDrawerToggle}
      ></Header>
      <TaskNavigation
        drawerWidth={drawerWidth}
        drawerToggle={handleDrawerToggle}
        drawer={drawer}
        mobileOpen={mobileOpen}
      ></TaskNavigation>
      <Task showedTask={showedTask}></Task>
      <AddDialog open={dialogOpen} handleClose={handleDialogToggle}></AddDialog>
      <Fab
        color="secondary"
        onClick={handleDialogToggle}
        className={classes.fabButton}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default App;
