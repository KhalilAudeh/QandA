import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Card } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useDispatch } from "react-redux";
import { CREATE_QUESTION_REQUESTED } from "./../store/actions";

const QuestionsList = () => {
  // FOR SEARCH USE
  const [searchValue, setSearchValue] = useState("");

  const { items = [], error, loading } = useSelector(
    (state) => state.questions || {}
  );

  // FOR DROPDOWN MENU USE
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const all_options = items.map((item) => item.type);

  let options = [...new Set(all_options)];

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilterType, setSelectedFilterType] = useState("none");

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setSelectedFilterType(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // FOR DIALOG POPUP USE
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  // FOR ONCHANGE SOR SUBMITTING QUESTION
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const addQuestionHandler = () => {
    dispatch({ type: CREATE_QUESTION_REQUESTED, payload: { content, type } });
    window.location.reload(false);
  };

  // FOR LOADER & ALERT USE
  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">
        This is an error alert — oops something went wrong!
      </Alert>
    );

  const filterArray = (arr) => {
    if (selectedFilterType !== "none") {
      return [...arr].filter((item) => item.type && item.type === selectedFilterType);
    }
    return [...arr];
  };

  const searchArray = (arr) => {
    if (searchArray !== "") {
      return [...arr].filter((item) =>
        item.content && item.content.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );
    }
    return [...arr];
  };

  const searchAndFilter = (arr) => {
    let filtered = filterArray(arr);
    let searched = searchArray(filtered);

    return searched;
  };

  const createQuestionButton = () => (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        create new question
      </Button>
      <Dialog
        open={open}
        onClose={handleClosePopup}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Creating New Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create this question, please enter your question content as well
            as its related type
          </DialogContentText>
          <form
            noValidate
            autoComplete="off"
            onChange={(e) =>
              e.target.id === "content"
                ? setContent(e.target.value)
                : setType(e.target.value)
            }
          >
            <TextField
              margin="dense"
              id="content"
              label="Question Content"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="type"
              label="Question Type"
              type="text"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="secondary">
            cancel
          </Button>
          <Button onClick={addQuestionHandler} color="primary">
            submit question
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div style={{ padding: "100px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* SEARCH FIELD */}

        <TextField
          id="outlined-search"
          label="Search here for questions"
          type="search"
          variant="outlined"
          onChange={(event) => setSearchValue(event.target.value)}
          style={{ width: "40%" }}
        />

        {/* DROPDOWN FOR TYPE SELECT */}
        <div className={classes.root} style={{ marginTop: "-20px" }}>
          <List component="nav" aria-label="Device settings">
            <ListItemText
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Filter By Type"
              onClick={handleClickListItem}
            >
              <ListItemText
                primary="Filter By Type"
                secondary={<p>{selectedFilterType}</p>}
              />
            </ListItemText>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                onClick={() => handleMenuItemClick(option)}
              >
                {option}
              </MenuItem>
            ))}
            <MenuItem key="none" onClick={() => setSelectedFilterType("none")}>
              None
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* LIST OF QUESTIONS */}
      <Card className={classes.root} variant="outlined">
        {searchAndFilter(items).map((item) => (
          <CardContent key={item.question_id}>
            <a className="questions" href={'/question/' + item.question_id}>
              {item.content}
            </a>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: "0 20px" }}
              disableElevation
            >
              {item.type}
            </Button>
          </CardContent>
        ))}
        <CardActions>
          {/* Create new question button */}
          {createQuestionButton()}
        </CardActions>
      </Card>
    </div>
  );
};

export default QuestionsList;