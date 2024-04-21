import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const api = axios.create({
    withCredentials: true
})

export interface Quiz {
    _id: string;
    description: string;
    title: string;
    quizType: string;
    points: string
    assignmentGroup: string,
    shuffleAnswers: string,
    timeLimit: string,
    multipleAttempts: boolean,
    showCorrectAnswers: boolean,
    accessCode:string,
    oneQuestionAtATime:boolean,
    webcamRequired: boolean,
    lockQuestionsAfterAnswering: boolean,
    dueDate: Date, //may want to change this to Date later on
    availableDate: Date,
    untilDate: Date,
    for: string,
    requireRespondus: boolean,
    requireViewQuizResult: boolean,
    viewResponse: string,
    course: string,
    published: boolean,
    questions: string,
    questionList: [{
        id: string,
        name: string,
        type: string,
        answer: string,
        points: number
    }]
}

export const updateQuiz = async (quiz: any) => {
    // const response = await axios
    //     .put(`${QUIZZES_API}/${quiz._id}`, quiz);
    // return response.data;
    const response = await api.put(`${COURSES_API}/${quiz._id}`, quiz);
    return response.data;
};
export const deleteQuiz = async (quiz: any) => {
    // const response = await axios
    //     .delete(`${QUIZZES_API}/${quizId}`);
    // return response.data;
    const response = await api.delete(`${COURSES_API}/${quiz._id}`);
    return response.data;
};
export const createQuiz = async (quizId: any, quiz: any) => {
    // const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    // return response.data;
    const response = await api.post(`${COURSES_API}/${quizId}/quizzes`, quiz);
    return response.data
};

export const findQuizzesForCourse = async (courseId: any) => {
    // const response = await axios
    //     .get(`${COURSES_API}/${courseId}/quizzes`);
    // return response.data;
    const response = await api.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

