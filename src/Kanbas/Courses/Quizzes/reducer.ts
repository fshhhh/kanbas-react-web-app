import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [] as { id: string; title: string; }[],
    quiz: {
        id: 1,
        quizType: 'Graded Quiz',
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
        questions: 0
    },
};

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