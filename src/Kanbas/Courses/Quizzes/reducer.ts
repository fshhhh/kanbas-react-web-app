import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [] as { _id: string; title: string; questions: { question: string; options: string[]; answer: string }[] }[],
    currentQuiz: {
        title: "New Quiz",
        questions: [
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Madrid"],
                answer: "Paris",
            },
        ],
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
            state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload);
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            });
        },
        setCurrentQuiz: (state, action) => {
            state.currentQuiz = action.payload;
        },
    },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, setCurrentQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;