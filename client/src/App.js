import "./App.css";
import React, { useEffect } from "react";
import { FETCH_REQUESTED } from "./store/actions";
import { useDispatch } from "react-redux";
import QuestionsList from './containers/QuestionsList';
import Question from './containers/Question';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_REQUESTED });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/questions">
            <QuestionsList />
          </Route>
          <Route path="/question/:id">
            <Question />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
 
export default App;
