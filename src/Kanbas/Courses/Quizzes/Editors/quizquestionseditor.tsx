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
            <div>
                <button className={"button"}>
                    <button>+ New Question</button>
                    <button>+ New Question Group</button>
                    <button><FaMagnifyingGlass/>Find Questions</button>
                </button>
            </div>
        </div>
    )
}

export default QuizQuestionsEditor;