import {useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import WYSIWYGEditor from "./WYSIWYG";
import * as client from "../client";
import {Quiz} from "../client";

function QuizDetailsEditor() {
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
            id: "",
            name: "",
            type: "",
            answer: "",
            points: 0
        }]
    });

    const { pathname } = useLocation();
    const { courseId } = useParams();

    const location = useLocation();
    const currentUrl = location.pathname;
    const urlWithoutLast10Chars = currentUrl.slice(0, -19);
    const quizEditUrl = `${urlWithoutLast10Chars}/quizquestionseditor/`;
    const quizEditUrl2 = `${urlWithoutLast10Chars}/quizdetailseditor/`;
    const saveUrl = currentUrl.slice(0, -27);
    const cancelUrl = currentUrl.slice(0, -39);

    const handleDueDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value); // Convert input value to Date object
        setQuiz({...quiz, dueDate: selectedDate});
    };
    const handleAvailableDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value); // Convert input value to Date object
        setQuiz({...quiz, availableDate: selectedDate});
    };
    const handleUntilDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value); // Convert input value to Date object
        setQuiz({...quiz, untilDate: selectedDate});
    };

    function formattedDate(date: Date) {
        return date.toISOString().split('T')[0];
    }

    const update = async () => {
        await client.updateQuiz(quiz);
    };

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
                <Link to={quizEditUrl2} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizdetailseditor") ? "active" : ""}`}>Details</Link>
                <Link to={quizEditUrl} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizquestionseditor") ? "active" : ""}`}>Questions</Link>
            </nav>

            <div className={"mb-3"}>
                <input type="text" className="form-control" id="title" value={quiz.title} placeholder={"New Title"}
                       onChange={(e) => setQuiz({...quiz, title: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <WYSIWYGEditor value={quiz.description}
                               onChange={(e) => setQuiz({...quiz, description: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label htmlFor="quizType" className="form-label">Quiz Type</label>
                <select className="form-select" id="quizType" value={quiz.quizType}
                        onChange={(e) => setQuiz({...quiz, quizType: e.target.value})}>
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
            </div>
            <div className={"mb-3"}>
                <label className={"form-label"}>Points</label>
                <input type={"number"} defaultValue={quiz.points} className={"form-control"}
                       onChange={(e) => setQuiz({...quiz, points: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
                <select className="form-select" id="assignmentGroup" value={quiz.assignmentGroup}
                        onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value})}>
                    <option value="Quizzes">Quizzes</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                    <option value="Exams">Exam</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="shuffleAnswers" className="form-label">Shuffle Answers</label>
                <select className="form-select" id="quizType" defaultValue={quiz.shuffleAnswers}
                        onChange={(e) => setQuiz({...quiz, shuffleAnswers: e.target.value})}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Set Time Limit</label>
                <input type={"number"} className={"form-control"} defaultValue={quiz.timeLimit}
                       onChange={(e) => setQuiz({...quiz, timeLimit: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Allow Multiple Attempts</label>
                <input type={"checkbox"} checked={quiz.multipleAttempts} style={{marginLeft: 10}}
                       onChange={() => setQuiz({...quiz, multipleAttempts: !quiz.multipleAttempts})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Show Correct Answers</label>
                <input type={"checkbox"} checked={quiz.showCorrectAnswers} style={{marginLeft: 10}}
                       onChange={() => setQuiz({...quiz, showCorrectAnswers: !quiz.showCorrectAnswers})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Access Code</label>
                <input type={"text"} className={"form-control"} defaultValue={quiz.accessCode}
                       onChange={(e) => setQuiz({...quiz, accessCode: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">One Question at a Time</label>
                <input type={"checkbox"} checked={quiz.oneQuestionAtATime} style={{marginLeft: 10}}
                       onChange={() => setQuiz({...quiz, oneQuestionAtATime: !quiz.oneQuestionAtATime})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Webcam Required</label>
                <input type={"checkbox"} checked={quiz.webcamRequired} style={{marginLeft: 10}}
                       onChange={() => setQuiz({...quiz, webcamRequired: !quiz.webcamRequired})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Lock Questions After Answering</label>
                <input type={"checkbox"} checked={quiz.lockQuestionsAfterAnswering} style={{marginLeft: 10}}
                       onChange={() => setQuiz({...quiz, lockQuestionsAfterAnswering: !quiz.lockQuestionsAfterAnswering})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" value={formattedDate(quiz.dueDate)} style={{marginLeft: 10}}
                       onChange={handleDueDateChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Available Date</label>
                <input type="date" value={formattedDate(quiz.availableDate)} style={{marginLeft: 10}}
                       onChange={handleAvailableDateChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Available Date</label>
                <input type="date" value={formattedDate(quiz.untilDate)} style={{marginLeft: 10}}
                       onChange={handleUntilDateChange}/>
            </div>
            <div className={"btn-toolbar"}>
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

export default QuizDetailsEditor;