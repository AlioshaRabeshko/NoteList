import { GET_NOTES, ADD_NOTE, DELETE_NOTE, GET_PAGES } from '../actions/types';

const initialState = {
	notes: [],
	count: 0,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_NOTES:
			return {
				...state,
				notes: action.payload,
			};
		case ADD_NOTE: {
			return {
				...state,
				notes: [action.payload, ...state.notes.slice(0, 4)],
				count: state.count + 1,
			};
		}
		case DELETE_NOTE:
			return {
				...state,
				notes: action.payload,
				count: state.count - 1,
			};
		case GET_PAGES:
			return {
				...state,
				count: action.payload.count,
			};
		default:
			return state;
	}
}
