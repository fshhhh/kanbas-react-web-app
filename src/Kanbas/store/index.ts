import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import quizzesReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
    quizzesReducer: {
        quizzes: any[];
        currentQuiz: any;
    }; // Define the shape of the quizzesReducer state
    modulesReducer: {
        modules: any[];
        module: any;
    };
}

const store = configureStore({
    reducer: {
        modulesReducer,
        quizzesReducer, // Add the quizzesReducer to the reducer object
    },
});

export default store;