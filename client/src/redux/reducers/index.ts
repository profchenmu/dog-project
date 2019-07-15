import { combineReducers } from 'redux';
import dogImagesReducer from './dogImagesReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
	dogImagesReducer,
	homeReducer,
});

export default rootReducer
