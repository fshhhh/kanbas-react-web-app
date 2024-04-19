import {useState} from "react";
import WYSIWYGEditor from "./WYSIWYG";
import {FaPlus} from "react-icons/fa6";

function QuestionMaker() {
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [points, setPoints] = useState(0);
    const [questionType, setQuestionType] = useState("");

    const [options, setOptions] = useState([]);

    const handleAddOption = (option: any) => {
        setOptions(options.concat(option));
    };

    return (
        <div style={{marginTop: 50}}>
            <div className={"row mb-3"}>
                <div className={"col mb-3"}>
                    <input type={"text"} className={"form-control"} value={title} placeholder={"Question Title"}
                           onChange={(e) => setTitle(e.target.value)} style={{width: 200}}/>
                </div>
                <div className={"col mb-3"}>
                    <select defaultValue={questionType} className={"form-select"} style={{width: 200}}>
                        <option onClick={() => setQuestionType("MCQ")}>Multiple Choice</option>
                        <option onClick={() => setQuestionType("True/False")}>True/False</option>
                        <option onClick={() => setQuestionType("Fill in the Blank")}>Fill in the Blank</option>
                    </select>
                </div>
                <div className={"col mb-3 d-flex align-items-center"}>
                    <span>pts: </span>
                    <input type={"number"} className={"form-control"} value={points}
                           onChange={(e) => setPoints(parseInt(e.target.value))} style={{width: 200, marginLeft: 5}}/>
                </div>
            </div>
            <hr/>
            <span>Enter your question and multiple answers, and then select the correct one</span>
            <h3 style={{marginTop: 10}}>Question:</h3>
            <div className={"row mb-3"}>
                <WYSIWYGEditor value={prompt} onChange={setPrompt}/>
            </div>
            <h3 style={{marginTop: 50}}>Answers</h3>

            {/*{options.map()}*/}
            <button><FaPlus/> Add Another Answer</button>
        </div>
    )
}

export default QuestionMaker;