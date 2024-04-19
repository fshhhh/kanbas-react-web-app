import {Link, useLocation, useParams} from "react-router-dom";
import {FaMagnifyingGlass} from "react-icons/fa6";

function QuizQuestionsEditor() {
    const {quizId} = useParams(); //will be needed once we incorporate the id into the url
    const { pathname } = useLocation();

    const location = useLocation();
    const currentUrl = location.pathname;
    const urlWithoutLast10Chars = currentUrl.slice(0, -20);
    const quizEditUrl = `${urlWithoutLast10Chars}/quizdetailseditor`;
    const quizEditQUrl = `${urlWithoutLast10Chars}/quizquestionseditor`;

    return (
        <div>
            <nav className="nav nav-tabs" style={{marginTop: "40px"}}>
                <Link to={quizEditUrl} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizdetailseditor") ? "active" : ""}`}>Details</Link>
                <Link to={quizEditQUrl} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizquestionseditor") ? "active" : ""}`}>Questions</Link>
            </nav>
            {/*TODO: question.map or whatever to display the questions*/}
            <button>
                <Link to={"./questionmaker"}>
                    + New Question
                </Link>
            </button>
            <div className={"btn-toolbar"}>
                <button className={"btn btn-primary"}>Save</button>
                <button className={"btn btn-success"}>Save and Publish</button>
                <button className={"btn btn-danger"}>Cancel</button>
            </div>
        </div>
    )
}

export default QuizQuestionsEditor;