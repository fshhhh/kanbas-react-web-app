import { useParams } from "react-router";
import {addQuiz, deleteQuiz, setQuiz, setQuizzes, updateQuiz, toggleQuizPublished} from "./reducer";
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import {Link, useLocation} from "react-router-dom";
import "./index.css";
import * as client from "./client";
import {Quiz} from "./client";
import {FaCheckCircle, FaEllipsisV, FaPlane, FaRocket, FaStopCircle} from "react-icons/fa";

function Quizzes() {
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

    const nextQuizId = quizList.length + 1;
    const quizDetailUrl = `${currentUrl}/${nextQuizId}/quizdetail/`;
    const [quizzes, setQuizzess] = useState<Quiz[]>([]);
    const handleAddQuiz = async () => {
        try {
            const newQuiz = await client.createQuiz(quiz);
            setQuizzes([newQuiz, ...quizList]);
        } catch (err) {
            console.log(err);
        }
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

    const currentDate = new Date();

    const [openContextQuizId, setOpenContextQuizId] = useState(null);
    const toggleContext = (quizId: any) => {
        setOpenContextQuizId(openContextQuizId === quizId ? null : quizId);
    }

    const [isPublished, setIsPublished] = useState(quiz.published);

    const handlePublishToggle = (quizId: any) => {
        const updatedQuizList = quizList.map((quiz) =>
            quiz._id === quizId
                ? { ...quiz, published: !quiz.published }
                : quiz
        );
        dispatch(toggleQuizPublished(updatedQuizList));
    };
    const renderContent = (quiz: any) => {
        const [monthDay, timeStr] = quiz.availableDate.split(" at ");
        const [month, day] = monthDay.split(" ");
        const currentYear = new Date().getFullYear();
        const monthIndex = new Date(`${month} 1, 2000`).getMonth();
        const availableDate = new Date(currentYear, monthIndex, day, 23, 59);
        const currentDate = new Date();

        const [monthDayU, timeStrU] = quiz.untilDate.split(" at ");
        const [monthU, dayU] = monthDayU.split(" ");
        const currentYearU = new Date().getFullYear();
        const monthIndexU = new Date(`${monthU} 1, 2000`).getMonth();
        const availableDateU = new Date(currentYearU, monthIndexU, dayU, 23, 59);


        if (currentDate < availableDate) {
            return (<span>
                     <span className="bold">Not available until</span> {quiz.availableDate}
                </span>
            );
        } else if (currentDate <= availableDateU) {
            return (<span>
                     <span className="bold">Available until</span> {quiz.untilDate}
                </span>);
        } else {
            return <>Closed</>;
        }
    };


    return (
        <div>
            <div className={"button"}>
                <Link to={quizDetailUrl}>
                    <button type="button" className="wd-fg-color-red button-padding"
                            onClick={handleAddQuiz}>
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
                                <button style={{ float: "right", border: "transparent", backgroundColor: "transparent" }} onClick={() => toggleContext(quiz._id)}>
                                    <FaEllipsisV />
                                </button>
                                {openContextQuizId === quiz._id && (
                                    <div className="button">
                                        <button><Link to={quizDetailUrl} className={"link"}>Edit</Link></button>
                                        <button onClick={() => handleDeleteQuiz(quiz)}>Delete</button>
                                        <button onClick={() => handlePublishToggle(quiz._id)}>
                                            {quiz.published ? 'Unpublish' : 'Publish'}
                                        </button>
                                    </div>
                                )}
                                {/*the three dots context menu*/}
                                {/*TODO: make the context menu appear on a different z-axis maybe?*/}
                                <Link to={`./${quiz._id}/quizdetail/`}
                                      className={"link"}>
                                    <h3>Q {quiz.title}</h3>
                                </Link>
                                <div>

                                    <div key={quiz.id}>{renderContent(quiz)}</div>

                                    <span className={"bold"}> Due </span> {quiz.dueDate}
                                    <span className={"green"}
                                          onClick={handlePublishToggle}> {quiz.published ? <FaCheckCircle/> : <FaStopCircle/>}</span>
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