import ModuleList from "../Modules/List";
import './index.css';
import { FaChartBar, FaCalendar, FaBell} from "react-icons/fa";
import {Link} from "react-router-dom";
import statuses from "../../Database/status.json";
import {useParams} from "react-router";
function Home() {
    const { courseId } = useParams();

    return (
        <div className='d-flex'>
            <div className={'flex-fill fixed'}><ModuleList /></div>

            <div className="flex-grow-0 me-2 d-none d-lg-block button-width">
                <button type="button" className="button-course-status">
                    <FaChartBar /> View Course Stream</button>
                <button type="button" className="button-course-status">
                    <FaChartBar /> New Analytics</button>
                <button type="button" className="button-course-status">
                    <FaCalendar /> View Course Calendar</button>
                <button type="button" className="button-course-status">
                    <FaBell /> View Course Notification</button>

                <h4 className={"margin"}>To Do</h4>
                <hr className={"margin"}/>

                <ul>
                    {statuses.map((status) => (
                        status.type === 'todo' && status.course === courseId ? (
                            <li key={status.course}>
                                <Link to={`/Kanbas/Courses/${status.course}/Modules`}
                                      style={{ color: 'red' }}>{status.name}</Link>
                                <div>{status.due}</div>
                            </li>
                        ) : null
                    ))}
                </ul>


                <h4 className={"margin"}>Recent Feedback</h4>
                <hr className={"margin"}/>

                <ul>
                    {statuses.map((status) => (
                        status.type === 'feedback' && status.course === courseId ? (
                            <li key={status.course}>
                                <Link to={`/Kanbas/Courses/${status.course}/Assignment`}
                                      style={{ color: 'red' }}>{status.name}</Link>
                                <div>{status.number}</div>
                                <p>{status.due}</p>
                            </li>
                        ) : null
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Home;