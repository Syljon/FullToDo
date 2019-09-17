import "./App.css";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import TaskNavigation from "./components/TaskNavigation/TaskNavigation";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <TaskList
      taskList={[
        "Inbox",
        "Starred",
        "Send email",
        "Drafts",
        "Send email",
        "Drafts",
        "Send email",
        "Drafts",
        "Send email",
        "Drafts"
      ]}
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
}

export default App;
