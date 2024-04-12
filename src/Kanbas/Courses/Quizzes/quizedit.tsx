import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";

function QuizEdit() {
    const { pathname } = useLocation();
    return (
        <div>
            <nav className="nav nav-tabs">
                <Link to="/Quizzes/quizdetails"
                      className={`nav-link ${pathname.includes("quizdetails") ? "active" : ""}`}>Details</Link>
                <Link to={"/Quizzes/quizquestions"}
                      className={`nav-link ${pathname.includes("quizquestions") ? "active" : ""}`}>Questions</Link>
            </nav>
        </div>

    );
}

export default QuizEdit;