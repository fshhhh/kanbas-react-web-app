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
    const [dueDate, setDueDate] = useState(null);
    const [availableDate, setAvailableDate] = useState(null);
    const [untilDate, setUntilDate] = useState(null);
    //TODO: surely there's a better way to do this lmao

    const {quizId} = useParams(); //will be needed once we incorporate the id into the url
    const { pathname } = useLocation();

    return (
        <div>
            <nav className="nav nav-tabs" style={{marginTop: "40px"}}>
                <Link to="./quizdetailseditor" style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizdetailseditor") ? "active" : ""}`}>Details</Link>
                <Link to={"./quizquestionseditor"} style={{color: "red"}}
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
                <input type={"number"} defaultValue={timeLimit}
                       onChange={(e) => setTimeLimit(parseInt(e.target.value))}/>
            </div>
        </div>
    )
}

export default QuizDetailsEditor;