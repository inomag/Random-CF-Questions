import {combineReducers} from 'redux';
import problemsReducer from './problemsReducer';

const DEFAULT_REDUCER = (initstate, action) => {
    return { key: "" };
};
const rootReducer = combineReducers({
    DEFAULT: DEFAULT_REDUCER,
    problems: problemsReducer,
});

export default rootReducer;