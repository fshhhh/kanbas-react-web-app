import React, {useEffect, useState} from 'react';
import {FaMagnifyingGlass} from "react-icons/fa6";

function QuizQuestions() {

    return (
        <div>
            <button className={"button"}>
                <button>+ New Question</button>
                <button>+ New Question Group</button>
                <button><FaMagnifyingGlass/>Find Questions</button>
            </button>
        </div>

    );
}

export default QuizQuestions;