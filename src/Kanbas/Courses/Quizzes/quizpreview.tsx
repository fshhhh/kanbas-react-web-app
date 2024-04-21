import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import * as client from "./client";
import {setQuizzes} from "./reducer";
import {KanbasState} from "../../store";
import {FaAngleLeft, FaAngleRight, FaExclamation} from "react-icons/fa";
import {FaAnglesRight, FaCircleExclamation, FaCircleQuestion, FaDiagramNext, FaPencil} from "react-icons/fa6";

function QuizPreview() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [bookmarkColor, setBookmarkColor] = useState<string>('lightgrey');

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);

    // current question
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };
    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };
    const currentQuestionData = quiz.questionList[currentQuestion - 1];
    const handleQuestionClick = (questionNumber: number) => {
        setCurrentQuestion(questionNumber);
    };

    const toggleBookmarkColor = () => {
        setBookmarkColor(bookmarkColor === 'lightgrey' ? 'red' : 'lightgrey');
    };

    const bookmarkStyles = {
        width: 0,
        height: 0,
        borderTop: `20px solid ${bookmarkColor}`,
        borderRight: `10px solid ${bookmarkColor}`,
        borderBottom: '10px solid transparent',
        borderLeft: `10px solid ${bookmarkColor}`,
        color: 'transparent',
        cursor: 'pointer',
    };

    const location = useLocation();
    const currentUrl = location.pathname;
    const urlWithoutLast10Chars = currentUrl.slice(0, -13);
    const quizEditUrl = `${urlWithoutLast10Chars}/quizedit/quizdetailseditor/`;

    return (
        <div className={"place"}>
            <h2>Q{quiz.title}</h2>
            <div className={"preview margin"}>
                <FaCircleExclamation/>
                This is a preview of the published version of the quiz</div>
            <div className={"margin"}>
                Started: {quiz.availableDate}
            </div>
            <h2>Quiz Instructions</h2>
            <hr/>

            <div style={{display: 'flex'}}>
                <button
                    style={bookmarkStyles}
                    onClick={toggleBookmarkColor}></button>


                <div className={"question margin"}>
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <h4 className={"questionNumber"}>Question {currentQuestion}</h4>
                        <span className={"points"}>{currentQuestionData?.point} pts</span>
                    </div>

                    <hr/>
                    <p className={"questionNumber"}>{quiz.questionList[currentQuestion - 1]?.name}</p>
                    <div></div>

                    {currentQuestionData?.type === 'truefalse' && (
                        <div className={"option"}>
                            <label><input type="radio" name="answer" value="true" />
                                <span className={"option-text"}> True</span></label>
                            <hr />
                            <label><input type="radio" name="answer" value="false" />
                                <span className={"option-text"}> False</span></label>
                        </div>
                    )}
                 </div>
            </div>






            <div className={"margin"}
                style={{display: 'flex', justifyContent: 'space-between'}}>
                {currentQuestion !== 1 && (
                    <button className={"button-padding"}
                        onClick={handlePrevious} disabled={currentQuestion === 1}>
                        <FaAngleLeft/> Previous
                </button>)}
                <div></div>
                {currentQuestion < quiz.questionList.length &&
                    <button className={"button-padding"}
                            onClick={handleNext}>Next <FaAngleRight/></button>}
            </div>

            <div className={"question margin"}
                 style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className={"saved"}>Quiz saved at 00:00am</span>
                <button className={"button-padding-long"}>
                        Submit Quiz
                </button>
            </div>

            <button className={"question-edit margin"}>
                <Link className={"editing"}
                      to={quizEditUrl}>
                    <div><FaPencil/> Keep Editing This Quiz</div>
                </Link>
            </button>

            <div>
                <h3>Questions</h3>
                {quiz.questionList.map((_: any, index: any) => (
                    <div
                        key={index}
                        className={"red margin-left"}
                        style={{cursor: 'pointer', fontWeight: index === currentQuestion - 1 ? 'bold' : 'normal' }}
                        onClick={() => handleQuestionClick(index + 1)}>
                        <FaCircleQuestion className={"grey"}/> Question {index + 1}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default QuizPreview;