import { courses } from "../Database";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "./index.css";
import Home from "./Home";
import Assignments from "./Assignments";
import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetail from "./Quizzes/quizdetail";
function Courses() {
    const { courseId } = useParams();
    const COURSES_API = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}`
        );
        setCourse(response.data);
    };

    const { pathname } = useLocation();
    const currentPage = pathname.split('/').pop();
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);


    return (
        <div>
            <div className={'d-none d-md-block'}>
                <div className={'breadcrumb'}>
                    <h1 className='breadcrumb-bar breadcrumb-bar-red'>
                        <HiMiniBars3 className={'padding-right'}/> Course {course?.name}
                        <span className={'black'}> &gt; </span> {currentPage}</h1>
                </div>
                <div className={'breadcrumb-hr'}><hr /></div>
                <div className='grey breadcrumb-hr'>{courses[0].term}</div>
            </div>



            <div className={'d-none d-md-block'}><CourseNavigation /></div>

            <div>
                <div className="overflow-y-scroll position-fixed bottom-0 end-0 module-position">

                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home/>} />
                        <Route path="Modules" element={<Modules/>} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments/>} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Quizzes" element={<Quizzes/>} />
                        <Route path="Quizzes/quizdetail" element={<QuizDetail/>} />
                        <Route path="Announcements" element={<h1>Announcements</h1>} />
                        <Route path="People" element={<h1>People</h1>} />
                        <Route path="Files" element={<h1>Files</h1>} />
                    </Routes>
                </div>

            </div>
        </div>
    );
}
export default Courses;