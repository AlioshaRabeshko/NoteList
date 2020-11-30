import { GET_NOTES, ADD_NOTE, DELETE_NOTE, GET_PAGES } from '../actions/types';
import axios from 'axios';

export const getNotes = (page = 0) => (dispatch) => {
	axios.get(`/api/notes/${page}`).then((res) =>
		dispatch({
			type: GET_NOTES,
			payload: res.data,
		})
	);
};

export const addNote = (name, desc, image) => (dispatch) => {
	let data = new FormData();
	console.log(image);
	data.append('image', image);
	data.append('name', name);
	data.append('desc', desc);
	axios.post('/api/notes/add', data).then((res) =>
		dispatch({
			type: ADD_NOTE,
			payload: res.data,
		})
	);
};

export const deleteNote = (id, page = 0) => (dispatch) => {
	axios.delete(`/api/notes/${page}/${id}`).then((res) =>
		dispatch({
			type: DELETE_NOTE,
			payload: res.data,
		})
	);
};

export const getPages = () => (dispatch) => {
	axios.get(`/api/notes/pages`).then((res) =>
		dispatch({
			type: GET_PAGES,
			payload: res.data,
		})
	);
};
