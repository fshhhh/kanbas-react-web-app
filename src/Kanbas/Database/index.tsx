import courses from "./courses.json";
import modules from "./modules.json";
import statuses from "./status.json";
import assignments from "./assignments.json";

const db = {
    courses,
    modules,
    statuses,
    assignments
};

export default db;
export { courses, modules, statuses, assignments };