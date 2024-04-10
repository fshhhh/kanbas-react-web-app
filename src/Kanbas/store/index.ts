import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import quizzesReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
    quizzesReducer: {
        quizzes: any[];
        quiz: any;
    };

    modulesReducer: {
        modules: any[];
        module: any;
    };
}

const store = configureStore({
    reducer: {
        modulesReducer,
        quizzesReducer,
    },
});

export default store;