import { SET_SETTINGS } from '../actionTypes';

const initialState = {
	currentAddress: '',
	showOlderThanMonth: true,
}

export default (state = initialState, action = {}) => {
	switch(action.type){
		case SET_SETTINGS:
			return {
				...state,
				...action.settings
			};
		default: return state;
	}
}