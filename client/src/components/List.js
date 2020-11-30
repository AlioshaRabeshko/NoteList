import Note from './Note';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNotes } from '../actions/noteActions';

const List = () => {
	const { notes } = useSelector((state) => state.notes);
	const { page } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotes(page));
		for (let i = window.scrollY; i > 0; i--)
			window.setTimeout(() => window.scrollTo(0, i), 100);
	}, [page, dispatch]);

	return (
		<ul className="noteList">
			{notes.map((el, id) => (
				<Note el={el} key={id} />
			))}
		</ul>
	);
};

export default List;
