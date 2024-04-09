import ModuleList from "../Modules/List";
import './index.css';
import { FaChartBar, FaCalendar, FaBell} from "react-icons/fa";
import {Link} from "react-router-dom";
import statuses from "../../Database/status.json";
import {useParams} from "react-router";
import {setModule} from "../Modules/reducer";
import React from "react";
function Quizzes() {
    const { courseId } = useParams();

    return (
        <div>
            <h1>jello</h1>
        </div>
    );
}
export default Quizzes;