import React, {useEffect, useState} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaSearch } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import assignments from "../../Database/assignments.json";
import "./index.css";

function Assignments() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);

    const [clickedButton, setButton] = useState<HTMLButtonElement | null>(null);
    useEffect(() => {grey(1);}, []);

    const grey = (buttonNumber: number) => {
        const button = document.querySelector(`.button-${buttonNumber}`) as HTMLButtonElement;
        if (button === clickedButton) return;

        if (clickedButton !== null) {
            clickedButton.style.backgroundColor = 'white';
            clickedButton.style.borderColor = "white";
            clickedButton.style.color = "grey"
        }

        setButton(button);
        button.style.color = "white"
        button.style.backgroundColor = 'grey';
    };

    return (
        <>
            <div className="input-icons">
                <input type="text" placeholder="Search..." />
                <FaSearch className="search-icon" />

                <button className="button-right button-1" onClick={() => grey(1)}>SHOW BY TYPE</button>
                <button className="button-right button-2 button-default" onClick={() => grey(2)}>SHOW BY DATE</button>
            </div>


            <ul className="list-group wd-modules assignment-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV className="me-2" /> ASSIGNMENTS
                        <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList.map((assignment) => (
                            <li className="list-group-item">
                                <FaEllipsisV className="me-2" />
                                <Link
                                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );}
export default Assignments;