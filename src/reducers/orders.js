import { SET_ORDERS } from '../actionTypes';

const initialState = {
	total: 0,
	limit: 10,
	page: 1,
	results:[]
}

export default (state = initialState, action = {}) => {
	switch(action.type){
		case SET_ORDERS:
			return action.orders;
		default: return state;
	}
}