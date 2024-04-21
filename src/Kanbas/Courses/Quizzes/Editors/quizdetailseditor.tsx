import {useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import WYSIWYGEditor from "./WYSIWYG";

function QuizDetailsEditor() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("");
    const [quizType, setQuizType] = useState("Graded Quiz");
    const [points, setPoints] = useState(0);
    const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
    const [shuffleAnswers, setShuffleAnswers] = useState(true);
    const [timeLimit, setTimeLimit] = useState(20);
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
    const [webcamRequired, setWebcamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());
    const [availableDate, setAvailableDate] = useState(new Date());
    const [untilDate, setUntilDate] = useState(new Date());
    //TODO: surely there's a better way to do this lmao

    const {quizId} = useParams(); //will be needed once we incorporate the id into the url
    const { pathname } = useLocation();

    const location = useLocation();
    const currentUrl = location.pathname;
    const urlWithoutLast10Chars = currentUrl.slice(0, -19);
    const quizEditUrl = `${urlWithoutLast10Chars}/quizquestionseditor/`;
    const quizEditUrl2 = `${urlWithoutLast10Chars}/quizdetailseditor/`;
    const cancelUrl = currentUrl.slice(0, -27);

    const handleDueDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value); // Convert input value to Date object
        setDueDate(selectedDate); // Update state with selected date
    };
    const handleAvailableDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value); // Convert input value to Date object
        setAvailableDate(selectedDate); // Update state with selected date
    };
    const handleUntilDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value); // Convert input value to Date object
        setUntilDate(selectedDate); // Update state with selected date
    };

    function formattedDate(date: Date) {
        return date.toISOString().split('T')[0];
    }

    return (
        <div>
            <nav className="nav nav-tabs" style={{marginTop: "40px"}}>
                <Link to={quizEditUrl2} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizdetailseditor") ? "active" : ""}`}>Details</Link>
                <Link to={quizEditUrl} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizquestionseditor") ? "active" : ""}`}>Questions</Link>
            </nav>

            <div className={"mb-3"}>
                <input type="text" className="form-control" id="title" value={title} placeholder={"New Title"}
                       onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <WYSIWYGEditor value={description} onChange={setDescription}/>
            </div>
            <div className="mb-3">
                <label htmlFor="quizType" className="form-label">Quiz Type</label>
                <select className="form-select" id="quizType" value={quizType}
                        onChange={(e) => setQuizType(e.target.value)}>
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
            </div>
            <div className={"mb-3"}>
                <label className={"form-label"}>Points</label>
                <input type={"number"} defaultValue={points} className={"form-control"}
                       onChange={(e) => setPoints(parseInt(e.target.value))}/>
            </div>
            <div className="mb-3">
                <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
                <select className="form-select" id="assignmentGroup" value={assignmentGroup}
                        onChange={(e) => setAssignmentGroup(e.target.value)}>
                    <option value="Quizzes">Quizzes</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                    <option value="Exams">Exam</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="shuffleAnswers" className="form-label">Shuffle Answers</label>
                <select className="form-select" id="quizType" defaultValue={shuffleAnswers + ""}
                        onChange={() => setShuffleAnswers(!shuffleAnswers)}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Set Time Limit</label>
                <input type={"number"} className={"form-control"} defaultValue={timeLimit}
                       onChange={(e) => setTimeLimit(parseInt(e.target.value))}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Allow Multiple Attempts</label>
                <input type={"checkbox"} checked={multipleAttempts} style={{marginLeft: 10}}
                       onChange={() => setMultipleAttempts(!multipleAttempts)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Show Correct Answers</label>
                <input type={"checkbox"} checked={showCorrectAnswers} style={{marginLeft: 10}}
                       onChange={() => setShowCorrectAnswers(!showCorrectAnswers)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Access Code</label>
                <input type={"text"} className={"form-control"} defaultValue={accessCode}
                       onChange={(e) => setAccessCode(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">One Question at a Time</label>
                <input type={"checkbox"} checked={oneQuestionAtATime} style={{marginLeft: 10}}
                       onChange={() => setOneQuestionAtATime(!oneQuestionAtATime)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Webcam Required</label>
                <input type={"checkbox"} checked={webcamRequired} style={{marginLeft: 10}}
                       onChange={() => setWebcamRequired(!webcamRequired)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Lock Questions After Answering</label>
                <input type={"checkbox"} checked={lockQuestionsAfterAnswering} style={{marginLeft: 10}}
                       onChange={() => setLockQuestionsAfterAnswering(!lockQuestionsAfterAnswering)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" value={formattedDate(dueDate)} style={{marginLeft: 10}}
                       onChange={handleDueDateChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Available Date</label>
                <input type="date" value={formattedDate(availableDate)} style={{marginLeft: 10}}
                       onChange={handleAvailableDateChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Available Date</label>
                <input type="date" value={formattedDate(untilDate)} style={{marginLeft: 10}}
                       onChange={handleUntilDateChange}/>
            </div>
            <div className={"btn-toolbar"}>
                <button className={"btn btn-primary"}>Save</button>
                <button className={"btn btn-success"}>Save and Publish</button>
                <Link to={cancelUrl}>
                    <button className={"btn btn-danger"}>Cancel</button>
                </Link>
            </div>
        </div>
    )
}

export default QuizDetailsEditor;