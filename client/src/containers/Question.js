import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
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
import { GET_QUESTION_REQUESTED, GET_ANSWERS_REQUESTED, CREATE_ANSWER_REQUESTED } from "./../store/actions";
import { useParams } from "react-router-dom";

const Question = () => {

    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [question_id, setQuestionId] = useState(id);

    const useStyles = makeStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.background.paper,
        },
      }));
    const classes = useStyles();


    const dispatch = useDispatch();

    // DISPATCHING CLICKED QUESTION
    useEffect(() => {
      dispatch({ type: GET_QUESTION_REQUESTED, payload: { id }});
    }, [dispatch, id]);

    const { item = {}, error, loading } = useSelector(
        (state) => state.question || {}
    );

    // DISPATCHING RELATED ANSWERS
    useEffect(() => {
        dispatch({ type: GET_ANSWERS_REQUESTED, payload: { id }});
      }, [dispatch, id]);
  
      const { answers = [], answers_error, answers_loading } = useSelector(
          (state) => state.answers || {}
      );

    // FOR LOADER & ALERT USE
    if (loading || answers_loading) return <CircularProgress />;
    if (error || answers_error)
        return (
        <Alert severity="error">
            This is an error alert — oops something went wrong!
        </Alert>
        );
    
    // FOR DIALOG POPUP USE

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false);
    };

    const addAnswerHandler = () => {
        dispatch({ type: CREATE_ANSWER_REQUESTED, payload: { content, question_id } });
        window.location.reload(false);
      };
    
        const createAnswerButton = () => (
            <div>
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                create new one
              </Button>
              <Dialog
                open={open}
                onClose={handleClosePopup}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Creating New Answer</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To create a new answer, please enter your answer content
                  </DialogContentText>
                  <form
                    noValidate
                    autoComplete="off"
                    onChange={(e) =>
                        e.target.id === "content"
                          ? setContent(e.target.value)
                          : setQuestionId(e.target.value)
                      }
                  >
                    <TextField
                      margin="dense"
                      id="content"
                      label="Answer Content"
                      type="text"
                      fullWidth
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePopup} color="secondary">
                    cancel
                  </Button>
                  <Button onClick={addAnswerHandler} color="primary">
                    submit answer
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    
    return (
        <div style={{ padding: "100px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* QUESTION & ITS RELATED ANSWERS */}
        <Card className={classes.root} variant="outlined">
            <CardContent key={item.question_id}>
                <p className="question">
                {item.content}
                </p>
                <Button
                variant="outlined"
                color="primary"
                style={{ margin: "0 20px" }}
                disableElevation
                >
                {item.type}
                </Button>
            </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
            <h3>RELATED ANSWERS</h3>
            {(answers).map((answer) => (
            <CardContent key={answer.answer_id}>
                <h6>{answer.content}</h6>
            </CardContent>
            ))}
            <CardActions>
            {/* Create new answer button */}
            <h4 className="styled-txt">add new answer ?</h4>
            <br></br>
            {createAnswerButton()}
            </CardActions>
      </Card>
        </div>
        </div>
    );
};

export default Question;