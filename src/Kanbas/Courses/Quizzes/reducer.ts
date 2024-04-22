import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [] as { id: string; title: string; }[],
    quiz: {
        id: 1,
        title: 1,
        quizType: 'Graded Quiz',
        published: false,
        points: 0,
        assignmentGroup: 'QUIZZES',
        shuffleAnswers: "Yes",
        timeLimit: "20 Minutes",
        multipleAttempts: "No",
        showCorrectAnswers: "Immediately",
        accessCode: '',
        oneQuestionAtATime: "Yes",
        webcamRequired: "No",
        lockQuestionsAfterAnswering: "No",
        dueDate: "Sep 21 at 1pm",
        availableDate: "Sep 21 at 11:40am",
        untilDate: "Sep 21 at 1pm",
        for: "Everyone",
        requireRespondus: "No",
        requireViewQuizResult: "No",
        viewResponse: "Always",
        questions: 0,
        questionList: [
            {
                _id: "Q101",
                name: "This is the first question?",
                type: "truefalse",
                answer: "true",
                point: 1
            },
            {
                _id: "Q102",
                name: "This is the last question?",
                type: "Fill in the Blank",
                answer: "false",
                point: 100
            },
            {
                _id: "Q103",
                name: "This is the not question?",
                type: "MCQ",
                correctAnswer: "correct Answer",
                options: [
                    {op: "option 1"},
                    {op: "option 2"},
                    {op: "option 3"}
                ],
                point: 4
            }
        ]
    },
};

export const toggleQuizPublished = (quizId: any) => ({
    type: 'UPDATE_QUIZ_LIST',
    payload: quizId,
});

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter((quiz) =>
                quiz.id !== action.payload);
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
                if (quiz.id === action.payload.id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            });
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
    },
});

export const { setQuizzes, addQuiz,
    deleteQuiz, updateQuiz,
    setQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;