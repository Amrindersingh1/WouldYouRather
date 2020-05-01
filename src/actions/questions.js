import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion,saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';


function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    return saveQuestion({
      question
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

export function handleAddAnswerToQuestion (authUser, qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    return saveQuestionAnswer({
      authUser, qid, answer
    })
      .then((authUser, qid, answer) => dispatch(addAnswerToQuestion(authUser, qid, answer)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (QUESTIONS) {
  return {
    type: RECEIVE_QUESTIONS,
    QUESTIONS,
  }
}