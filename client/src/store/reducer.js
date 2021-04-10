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

export default function qAndAReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_REQUESTED:
      return { ...state, questions: { loading: true, error: false } };
    case FETCH_SUCCEEDED:
      return {
        ...state,
        questions: {
          items: action.payload.questions,
          loading: false,
          error: false,
        },
      };
    case FETCH_FAILED:
      return {
        ...state,
        questions: { items: [], loading: false, error: action.payload.error },
      };

    case CREATE_QUESTION_REQUESTED:
      return { ...state, createQuestion: { loading: true, error: false, question : action.payload.question } };
    case CREATE_QUESTION_SUCCEEDED:
      return {
        ...state,
        createQuestion: { loading: false, error: false },
      };
    case CREATE_QUESTION_FAILED:
      return {
        ...state,
        question: { loading: false, error: action.payload.error },
      };

    case GET_QUESTION_REQUESTED:
      return { ...state, question: { loading: true, error: false } };
    case GET_QUESTION_SUCCEEDED:
      return {
        ...state,
        question: {
          item: action.payload.question,
          loading: false,
          error: false,
        },
      };
    case GET_QUESTION_FAILED:
      return {
        ...state,
        question: { item: {}, loading: false, error: action.payload.error },
      };

    case GET_ANSWERS_REQUESTED:
      return { ...state, answers: { loading: true, error: false } };
    case GET_ANSWERS_SUCCEEDED:
      return {
          ...state,
          answers: {
            answers: action.payload.answers,
            loading: false,
            error: false,
          },
      };
    case GET_ANSWERS_FAILED:
      return {
          ...state,
          answers: { answers: [], loading: false, error: action.payload.error },
      };

    case CREATE_ANSWER_REQUESTED:
      return { ...state, createAnswer: { loading: true, error: false, answer : action.payload.answer } };
    case CREATE_ANSWER_SUCCEEDED:
      return {
        ...state,
        createAnswer: { loading: false, error: false },
      };
    case CREATE_ANSWER_FAILED:
      return {
        ...state,
        answer: { loading: false, error: action.payload.error },
      };

    default:
      return state;
  }
}