import React, {useEffect, useState} from 'react';
import {FaCheckCircle, FaEllipsisV, FaTimesCircle} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {KanbasState} from "../../store";
import * as client from "../Quizzes/client";
import {useParams} from "react-router";

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuiz,
    setQuizzes,
} from "./reducer";
import {Link, useLocation} from "react-router-dom";

function Quizdetail() {
    const location = useLocation();
    const currentUrl = location.pathname;
    const quizPreviewUrl = `${currentUrl}quizpreview/`;
    const quizEditUrl = `${currentUrl}quizedit/quizdetailseditor/`;

    const { courseId } = useParams();
    const dispatch = useDispatch();

    const [isPublished, setIsPublished] = useState(true);
    const [showQuiz, setShowQuiz] = useState(true);

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);


    const togglePublishStatus = () => {
        setIsPublished(!isPublished);
        setShowQuiz(!showQuiz);
    };

    return (
        <div>
            <div className="button">
                <button type="button" className="wd-fg-color-green button-padding"
                    onClick={togglePublishStatus}>
                    {isPublished ? <FaCheckCircle /> : <FaTimesCircle />}
                    {isPublished ? ' Published' : ' Unpublish'}
                </button>

                <Link to={quizPreviewUrl}>
                    <button className="button-padding">Preview</button>
                </Link>
                <Link to={quizEditUrl}>
                    <button type="button" className="button-padding"><FaPencil /> Edit</button>
                </Link>

                <button type="button" className="button-padding-small"><FaEllipsisV /></button>
            </div>
            <hr/>


            <div>
                <h2>Q{quiz.title}</h2>

                <div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Quiz Type</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.quizType}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Points</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.points}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Assignment Group</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.assignmentGroup}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Shuffle Answers</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.shuffleAnswers}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Time Limit</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.timeLimit}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Multiple Attempts</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.multipleAttempts}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>View Responses</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.viewResponse}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Show Correct Answers</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.showCorrectAnswers}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>One Question at a Time</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.oneQuestionAtATime}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Require Respondus LockDown Browser</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.requireRespondus}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Required to View Quiz Results</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.requireViewQuizResult}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Webcam Required</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.webcamRequired}</span>
                        </div>
                    </div>

                    <div className="row justify-content-start">
                        <div className="col-md-3 d-flex justify-content-end bold">
                            <span>Lock Questions After Answering</span>
                        </div>
                        <div className="col-md-3">
                            <span>{quiz.lockQuestionsAfterAnswering}</span>
                        </div>
                    </div>
                </div>

                <p></p>

                <div className="row justify-content-start">
                    <div className="col-md-3 bold">
                        <span>Due</span>
                    </div>
                    <div className="col-md-3 bold">
                        <span>For</span>
                    </div>
                    <div className="col-md-3 bold">
                        <span>Available from</span>
                    </div>
                    <div className="col-md-3 bold">
                        <span>Until</span>
                    </div>
                </div>

                <hr/>

                <div className="row justify-content-start">
                    <div className="col-md-3">
                        <span>{quiz.dueDate}</span>
                    </div>
                    <div className="col-md-3">
                        <span>{quiz.for}</span>
                    </div>
                    <div className="col-md-3">
                        <span>{quiz.availableDate}</span>
                    </div>
                    <div className="col-md-3">
                        <span>{quiz.untilDate}</span>
                    </div>
                </div>
                <hr />






            </div>






        </div>

    );
};

export default Quizdetail;