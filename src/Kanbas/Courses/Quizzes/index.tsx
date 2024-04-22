import { useParams } from "react-router";
import {addQuiz, deleteQuiz, setQuizzes, updateQuiz} from "./reducer";
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import {Link, useLocation} from "react-router-dom";
import "./index.css";
import * as client from "./client";
import {Quiz} from "./client";
import {FaCheckCircle, FaEllipsisV, FaRocket, FaStopCircle} from "react-icons/fa";

function Quizzes() {
    const [context, setContext] = useState(false);
    const location = useLocation();
    const currentUrl = location.pathname;

    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId, dispatch]);

    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);

    const handleAddQuiz = () => {
        client.createQuiz(courseId, quiz).then((quiz) => {
            dispatch(addQuiz(quiz));
        });
    };

    const handleDeleteQuiz = async (quiz: Quiz) => {
        try {
            await client.deleteQuiz(quiz);
            dispatch(deleteQuiz(quiz._id));
            // setQuizzes(quizList.filter((q) => q._id !== quiz._id));
        } catch (err) {
            console.log(err);
        }
    }

    // const handleDeleteQuiz = (quizId: string) => {
    //     client.deleteQuiz(quizId).then((status) => {
    //         dispatch(deleteQuiz(quizId));
    //     });
    // };

    const handleUpdateQuiz = async () => {
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };

    const availableDate = new Date(`${quiz.availableDate.substr(0, 
        quiz.availableDate.lastIndexOf(' '))} ${new Date().getFullYear()}`);

    const currentDate = new Date();

    const toggleContext = () => {
        setContext(!context);
        console.log(courseId);
    }

    const nextQuizId = quizList.length + 1;
    const quizDetailUrl = `${currentUrl}/${nextQuizId}/quizdetail/`;

    return (
        <div>
            <div className={"button"}>
                <Link to={quizDetailUrl}>
                    <button type="button" className="wd-fg-color-red button-padding">
                        + Quiz
                    </button>
                </Link>
                <button type="button" className="button-padding-small"><FaEllipsisV /></button>
            </div>
            <ul className="list-group margin-top">
                <li className="list-group-item">
                    <h4>Assignment Quizzes</h4>
                </li>

                {quizList
                    .filter((quiz) => quiz.course === courseId)
                    .map((quiz, index) => (
                        <li key={index} className="list-group-item greenbar">
                            <div>
                                <FaRocket />
                                {/*the three dots context menu*/}
                                <button style={{float: "right", border: "transparent", backgroundColor: "transparent"}}
                                        onClick={toggleContext}>
                                    <FaEllipsisV/>
                                </button>
                                {context && (
                                    <div className="button">
                                        <button><Link to={quizDetailUrl}>Edit</Link></button>
                                        <button onClick={() => handleDeleteQuiz(quiz)}>Delete</button>
                                        {quiz.published ? <button>Unpublish</button> : <button>Publish</button>}
                                    </div>
                                )}
                                {/*the three dots context menu*/}
                                {/*TODO: make the context menu appear on a different z-axis maybe?*/}
                                <Link to={`./${quiz._id}/quizdetail`}>
                                    <h3>Q{quiz.id} - {quiz.title}</h3>
                                </Link>
                                <div> {availableDate < currentDate ? 'Available' :
                                    <span><span
                                        className={"bold"}>Not available until</span> {quiz.availableDate}</span>}
                                    <span className={"bold"}> Due </span> {quiz.dueDate}
                                    <span className={"green"}> {quiz.published ? <FaCheckCircle/> : <FaStopCircle/>}</span>
                                </div>
                            </div>
                            <p>Number of Questions: {quiz.questions}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Quizzes;