import { SET_FILTERS } from '../actionTypes';

const initialState = {
	page: 1, 
	sortBy: 'date', 
	order: 'desc',
	textQuery: '',
}

export default (state = initialState, action = {}) => {
	switch(action.type){
		case SET_FILTERS:
			return {
				...state,
				...action.filters
			};
		default: return state;
	}
}