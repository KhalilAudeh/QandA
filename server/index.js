const express = require("express");
const app = express();
const cors = require("cors");
// use pool to connect postgres and server
const pool = require("./db");

// using middleware
app.use(cors());

// request body to get JSON data from client side 
app.use(express.json());

// ROUTES

// CREATE A QUESTION
app.post("/addQuestion", async (req, res) => {
    try {
      const { content, type } = req.body;

      const new_question = await pool.query(
        "INSERT INTO questions (content, type) VALUES($1, $2) RETURNING *",
        [content, type]
      );
  
      // SHOW BACK IN RETURN THE POST WE DID
      res.json(new_question.rows);
    } catch (err) {
      console.error(err.message);
    }
});

// GET ALL QUESTIONS
app.get("/getQuestions", async (req, res) => {
    try {
      const allQuestions = await pool.query("SELECT * FROM questions");
      res.json(allQuestions.rows);
    } catch (err) {
      console.error(err.message);
    }
});
  
// GET QUESTION
app.get("/question/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const question = await pool.query("SELECT * FROM questions WHERE question_id = $1", [
        id
      ]);
  
      res.json(question.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

// GET ALL RELATED ANSWERS FOR THE CLICKED QUESTION
app.get("/answers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const answers = await pool.query("SELECT * FROM answers WHERE question_id = $1", [
        id
      ]);
  
      res.json(answers.rows);
    } catch (err) {
      console.error(err.message);
    }
});

// CREATE A ANSWER
app.post("/addAnswer", async (req, res) => {
    try {
      const { content, question_id } = req.body;

      const new_answer = await pool.query(
        "INSERT INTO answers (content, question_id) VALUES($1, $2) RETURNING *",
        [content, question_id]
      );
  
      // SHOW BACK IN RETURN THE POST WE DID
      res.json(new_answer.rows);
    } catch (err) {
      console.error(err.message);
    }
});

// SERVER LISTEN
app.listen(5000, () => {
    console.log("server is listening on port 5000")
})