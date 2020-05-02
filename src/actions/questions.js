import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addQuestionToUser, addAnswerToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}

export function handleAddAnswerToQuestion(authUser, qid, answer) {
  return (dispatch) => {
    return saveQuestionAnswer({
      authUser,
      qid,
      answer,
    }).then((authUser, qid, answer) => {
      dispatch(addAnswerToUser(authUser, qid, answer));
      dispatch(addAnswerToQuestion(authUser, qid, answer));
    });
  };
}

export function addAnswerToQuestion({ authUser, qid, answer }) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
