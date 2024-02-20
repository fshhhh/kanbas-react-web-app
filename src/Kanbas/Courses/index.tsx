import { courses } from "../../Kanbas/Database";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "./index.css";
import Home from "./Home";
function Courses() {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);

    const { pathname } = useLocation();
    const currentPage = pathname.split('/').pop();

    return (
        <div>
            <h1 className='avoid-nav course-bar d-none d-md-block'><HiMiniBars3 className={'padding-right'}/> Course {course?.name} <span className={'black'}> &gt; </span> {currentPage}</h1>
            <hr className={'avoid-nav course-bar d-none d-md-block'}/>
            <div className='avoid-nav grey d-none d-md-block'>
                {courses[0].term}
            </div>

            <div className={'d-none d-md-block'}><CourseNavigation /></div>

            <div>
                <div className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{ left: "320px", top: "50px" }} >

                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home/>} />
                        <Route path="Modules" element={<Modules/>} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<h1>Assignments</h1>} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Quizzes" element={<h1>Quizzes</h1>} />
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