import {useState} from "react";
import WYSIWYGEditor from "./WYSIWYG";
import {FaPencil, FaPlus, FaTrashCan} from "react-icons/fa6";
import {Link, useLocation} from "react-router-dom";

function QuestionMaker() {
    const location = useLocation();
    const url = location.pathname;
    const cancelUrl = url.slice(0, -13);

    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [points, setPoints] = useState(0);
    const [questionType, setQuestionType] = useState("");

    const [option, setOption] = useState("");
    const [options, setOptions] = useState<any[]>(["True", "False", "15"]);

    const handleAddOption = () => {
        setOptions([...options, option]); // Append the new option to the existing options array
    };

    const handleUpdateOption = () => {
        //TODO: lol idk
    }

    const handleDeleteOption = (indexToDelete: any) => {
        setOptions(prevOptions => prevOptions.filter((_, index) => index !== indexToDelete));
    };

    const handleUpdate = () => {

    }

    const handleCancel = () => {
        {console.log(cancelUrl)}
    }

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

            {options.map((option, index) => (
                <div key={index} className={"flex-fill"}>
                    <label htmlFor={`option-${index}`}>Options:</label>
                    <input
                        type="text"
                        id={`option-${index}`}
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        className="form-control mb-2"
                        style={{width: 200}}
                    />
                    <button onClick={() => setOption(option)}><FaPencil/></button>
                    <button onClick={() => handleDeleteOption(index)}><FaTrashCan/></button>
                </div>
            ))}

            <input type={"text"} value={option} style={{marginTop: 20}}
                   onChange={(e) => setOption(e.target.value)}/>
            <button onClick={handleAddOption}><FaPlus/> Add New Option</button>
            <button onClick={handleUpdateOption}><FaPencil/> Update Option</button>

            <div className={"btn-toolbar"} style={{marginTop: 20}}>
                <button className={"btn btn-primary"} style={{backgroundColor: "red"}}
                        onClick={handleUpdate}>Update Question</button>
                <Link to={cancelUrl} style={{textDecoration: "none"}}>
                    <button className={"btn btn-secondary"}
                            onClick={handleCancel}>Cancel
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default QuestionMaker;