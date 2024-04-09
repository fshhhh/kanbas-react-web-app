import { useParams } from "react-router";
import { setCurrentQuiz } from "../Quizzes/reducer";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import {Link, useLocation} from "react-router-dom";
import QuizDetail from "./quizdetail";

function Quizzes() {
    const { courseId } = useParams();
    const location = useLocation();
    const currentUrl = location.pathname;
    const quizDetailUrl = `${currentUrl}/quizdetail`;

    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const dispatch = useDispatch();

    const handleEditQuiz = (quiz: any) => {
        dispatch(setCurrentQuiz(quiz));



    };

    const handleDeleteQuiz = () => {

    };

    return (
        <div>
            <Link to={quizDetailUrl}>
                <button type="button" className="wd-fg-color-red button-padding">
                    + Quiz
                </button>
            </Link>

            <ul className="list-group margin-top">
                <li className="list-group-item">
                    <h4>Assignment Quizzes</h4>
                </li>

                {quizList
                    .filter((quiz) => quiz.course === courseId)
                    .map((quiz, index) => (
                        <li key={index} className="list-group-item greenbar">
                            <div>
                                <h3>{quiz.title}</h3>
                                <div>
                                    <button
                                        className={"button-padding float-end"}
                                        onClick={() => handleEditQuiz(quiz)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={"button-padding float-end"}
                                        onClick={() => handleDeleteQuiz()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p>Number of Questions: {quiz.questions.length}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Quizzes;