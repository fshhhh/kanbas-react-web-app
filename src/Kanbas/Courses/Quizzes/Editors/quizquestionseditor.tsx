import {Link, useLocation, useParams} from "react-router-dom";
import * as client from "../client";
import {useState} from "react";
import {Quiz} from "../client";

function QuizQuestionsEditor() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quiz, setQuiz] = useState<Quiz>({
        _id: "",
        description: "",
        title: "",
        quizType: "Graded Quiz",
        points: "0",
        assignmentGroup: "QUIZZES",
        shuffleAnswers: "Yes",
        timeLimit: "20 Minutes",
        multipleAttempts: false,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: new Date(),
        availableDate: new Date(),
        untilDate: new Date(),
        for: "Everyone",
        requireRespondus: false,
        requireViewQuizResult: false,
        viewResponse: "Always",
        published: false,
        course: "",
        questions: "",
        questionList: [{
            id: "1",
            name: "One option",
            type: "",
            answer: "",
            points: 0
        }]
    });

    const { courseId } = useParams();
    const { pathname } = useLocation();

    const location = useLocation();
    const currentUrl = location.pathname;
    const urlWithoutLast10Chars = currentUrl.slice(0, -21);
    const quizEditUrl = `${urlWithoutLast10Chars}/quizdetailseditor/`;
    const quizEditQUrl = `${urlWithoutLast10Chars}/quizquestionseditor/`;
    const saveUrl = currentUrl.slice(0, -29);
    const cancelUrl = currentUrl.slice(0, -43);

    const createQuiz = async () => {
        try {
            const newQuiz = await client.createQuiz(courseId, quiz);
            setQuizzes([newQuiz, ...quizzes]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <nav className="nav nav-tabs" style={{marginTop: "40px"}}>
                <Link to={quizEditUrl} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizdetailseditor") ? "active" : ""}`}>Details</Link>
                <Link to={quizEditQUrl} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizquestionseditor") ? "active" : ""}`}>Questions</Link>
            </nav>
            {/*TODO: question.map or whatever to display the questions*/}
            {quiz.questionList.map((question, index) => (
                <div key={index} className={"flex-fill"}>
                    <span>Question {question.id}:</span>
                    <span>{question.name}</span>
                </div>
            ))}

            <button style={{marginTop: 20}} className={"btn btn-warning"}>
                <Link to={"./questionmaker"} style={{color: "black"}}>
                    + New Question
                </Link>
            </button>
            <div className={"btn-toolbar"} style={{marginTop: 20}}>
                <Link to={saveUrl}>
                    <button className={"btn btn-primary"} onClick={createQuiz}>Save</button>
                </Link>
                <Link to={cancelUrl}>
                    <button className={"btn btn-success"}>Save and Publish</button>
                </Link>
                <Link to={cancelUrl}>
                    <button className={"btn btn-danger"}>Cancel</button>
                </Link>
            </div>
        </div>
    )
}

export default QuizQuestionsEditor;