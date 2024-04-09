import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const API = `${API_BASE}/a5/welcome`;
function Assignment5() {
    return (
        <div>
            <h1>Assignment 5 </h1>

            <WorkingWithArrays />
            <WorkingWithObjects />
            <EncodingParametersInURLs />
            <div className="list-group">
                <a href={API} className="list-group-item">
                    Welcome
                </a>
            </div>
        </div>
);
}
export default Assignment5;