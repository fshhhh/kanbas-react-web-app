import {Link, useLocation, useParams} from "react-router-dom";
import {FaMagnifyingGlass} from "react-icons/fa6";

function QuizQuestionsEditor() {
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