import { SET_ORDER } from '../actionTypes';

const initialState = {}

export default (state = initialState, action = {}) => {
	switch(action.type){
		case SET_ORDER:
			return action.order;
		default: return state;
	}
}