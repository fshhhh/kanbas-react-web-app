import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void; })
{
    return (
        <div className="p-4 avoid-nav" >
            <h1>Dashboard</h1>              <hr />

            <h5>Course</h5>
            <input value={course.name} className="form-control wd-margin-bottom"
                   onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
            <input value={course.number} className="form-control wd-margin-bottom"
                   onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
            <input value={course.startDate} className="form-control wd-margin-bottom" type="date"
                   onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
            <input value={course.endDate} className="form-control wd-margin-bottom" type="date"
                   onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

            <button className="button-dash" onClick={addNewCourse} >
                Add
            </button>

            <button className="button-dash" onClick={updateCourse} >
                Update
            </button>

            <div className={"wd-margin-bottom"}></div>


            <h2>Published Courses ({courses.length})</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{ width: 300 }}>

                            <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                                <div className="card">
                                    <img src={`/images/${course.image}`} className="card-img-top"
                                         style={{ height: 150 }}/>
                                    <div className="card-body">
                                        <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                                              style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                            {course.name}
                                        </Link>
                                        <p className="card-text">{course.name}</p>
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary button-course">
                                            Go </Link>

                                        <button className="btn btn-primary button-course"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);}}> Edit </button>

                                        <button className="btn btn-primary button-course"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);}}> Delete </button>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;