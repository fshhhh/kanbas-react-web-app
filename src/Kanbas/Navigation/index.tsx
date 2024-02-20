import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook,
    FaRegCalendarAlt, FaInbox, FaClock, FaChalkboardTeacher,
    FaUserFriends, FaQuestionCircle} from "react-icons/fa";

function KanbasNavigation() {
    const links = [
        { label: "Account",   icon: <FaRegUserCircle className="fs-2" />, path: "/Kanbas/Account/Profile/screen.html"},
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" style={{ color: 'red' }}/>  },
        { label: "Courses",   icon: <FaBook className="fs-2" style={{ color: 'red' }}/>           },
        { label: "Calendar",  icon: <FaRegCalendarAlt className="fs-2" style={{ color: 'red' }} /> },

        { label: "Inbox",  icon: <FaInbox className="fs-2" style={{ color: 'red' }} /> },
        { label: "History",  icon: <FaClock className="fs-2" style={{ color: 'red' }} /> },
        { label: "Studio",  icon: <FaChalkboardTeacher className="fs-2" style={{ color: 'red' }} /> },
        { label: "Commons",  icon: <FaUserFriends className="fs-2" style={{ color: 'red' }} /> },
        { label: "Help",  icon: <FaQuestionCircle className="fs-2" style={{ color: 'red' }} /> },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li><img src="/images/neu.jpg" width="60px"/></li>
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;