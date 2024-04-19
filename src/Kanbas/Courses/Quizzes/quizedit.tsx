import QuizDetailsEditor from "./Editors/quizdetailseditor";
import QuizQuestionsEditor from "./Editors/quizquestionseditor";
import {Link, useLocation, useParams} from "react-router-dom";
import "./index.css";

function QuizEdit() {
    const {quizId} = useParams(); //will be needed once we incorporate the id into the url
    const { pathname } = useLocation();
    return (
        <div>
            {/*TODO: THIS DOESN'T QUITE WORK*/}
            <nav className="nav nav-tabs" style={{marginTop: "40px"}}>
                <Link to="./quizdetailseditor" style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizdetailseditor") ? "active" : ""}`}>Details</Link>
                <Link to={"./quizquestionseditor"} style={{color: "red"}}
                      className={`nav-link ${pathname.includes("quizquestionseditor") ? "active" : ""}`}>Questions</Link>
            </nav>

            {/* Render different components based on the URL path */}
            {pathname.includes("quizdetails") && <QuizDetailsEditor />}
            {pathname.includes("quizquestions") && <QuizQuestionsEditor />}
        </div>

    );
}

export default QuizEdit;