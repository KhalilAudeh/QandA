import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_REQUESTED,
  FETCH_SUCCEEDED,
  FETCH_FAILED,
  CREATE_QUESTION_REQUESTED,
  CREATE_QUESTION_SUCCEEDED,
  CREATE_QUESTION_FAILED,
  GET_QUESTION_REQUESTED,
  GET_QUESTION_SUCCEEDED,
  GET_QUESTION_FAILED,
  GET_ANSWERS_REQUESTED,
  GET_ANSWERS_SUCCEEDED,
  GET_ANSWERS_FAILED,
  CREATE_ANSWER_REQUESTED,
  CREATE_ANSWER_SUCCEEDED,
  CREATE_ANSWER_FAILED
} from "./actions";

// baseURL
const baseURL = "http://localhost:5000";

// GET ALL QUESTIONS
const fetchQuestions = async () => {
  const { data } = await axios.get(`${baseURL}/getQuestions`);
  return data;
};
function* getQuestions() {
  try {
    const response = yield call(fetchQuestions);
    console.warn(response);

    yield put({ type: FETCH_SUCCEEDED, payload: { questions: response } });
  } catch (e) {
    yield put({ type: FETCH_FAILED, payload: { error: e } });
  }
}

function* watchGetQuestions() {
  yield takeLatest(FETCH_REQUESTED, getQuestions);
}


// CREATE A QUESTION
const createQuestion = async (questionObj) => {
  const { data } = await axios.post(`${baseURL}/addQuestion`, {
   ...questionObj
  });
  return data;
};
function* postQuestion(action) {
  try {
    const response = yield call(createQuestion, { ...action.payload });
    yield put({
      type: CREATE_QUESTION_SUCCEEDED,
      payload: { question: response },
    });
  } catch (e) {
    yield put({ type: CREATE_QUESTION_FAILED, payload: { error: e } });
  }
}

function* watchPostQuestion() {
  yield takeLatest(CREATE_QUESTION_REQUESTED, postQuestion);
}


// GET QUESTION BASED ON ITS ID
const fetchQuestion = async (id) => {
  const { data } = await axios.get(`${baseURL}/question/${id}`);
  return data;
};
function* getQuestion(action) {
  try {
    const response = yield call(fetchQuestion, action.payload.id);
    console.warn(response);

    yield put({ type: GET_QUESTION_SUCCEEDED, payload: { question: response } });

  } catch (e) {
    yield put({ type: GET_QUESTION_FAILED, payload: { error: e } });
  }
}

function* watchGetQuestion() {
  yield takeLatest(GET_QUESTION_REQUESTED, getQuestion);
}


// GET ANSWERS BASED ON QUESTION ITS ID
const fetchAnswers = async (id) => {
  const { data } = await axios.get(`${baseURL}/answers/${id}`);
  return data;
};
function* getAnswers(action) {
  try {
    const response = yield call(fetchAnswers, action.payload.id);
    console.warn(response);

    yield put({ type: GET_ANSWERS_SUCCEEDED, payload: { answers: response } });

  } catch (e) {
    yield put({ type: GET_ANSWERS_FAILED, payload: { error: e } });
  }
}

function* watchGetAnswers() {
  yield takeLatest(GET_ANSWERS_REQUESTED, getAnswers);
}


// CREATE AN ANSWER FOR SPECIFIC QUESTION
const createAnswer = async (answerObj) => {
  const { data } = await axios.post(`${baseURL}/addAnswer`, {
   ...answerObj
  });
  return data;
};
function* postAnswer(action) {
  try {
    const response = yield call(createAnswer, { ...action.payload });
    console.warn("action.payload")
    console.warn(action.payload)

    yield put({
      type: CREATE_ANSWER_SUCCEEDED,
      payload: { answer: response },
    });
  } catch (e) {
    yield put({ type: CREATE_ANSWER_FAILED, payload: { error: e } });
  }
}

function* watchPostAnswer() {
  yield takeLatest(CREATE_ANSWER_REQUESTED, postAnswer);
}

export const Sagas = [watchGetQuestions, watchPostQuestion, watchGetQuestion, watchGetAnswers, watchPostAnswer];