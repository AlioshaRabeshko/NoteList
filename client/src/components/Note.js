import Popup from 'reactjs-popup';
import { deleteNote } from '../actions/noteActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Note = ({ el }) => {
	const { page } = useParams();
	const dispatch = useDispatch();

	const del = (close) => {
		dispatch(deleteNote(el._id, page));
		close();
	};

	return (
		<li className="note">
			<div className="desc">
				<h3>{el.name}</h3>
				<p>{el.desc}</p>
				<Popup trigger={<button>Remove</button>} modal>
					{(close) => (
						<div className="remove">
							<h3>Are you sured you want to delete this note?</h3>
							<h4>{el.name}</h4>
							<button onClick={() => del(close)}>Delete</button>
						</div>
					)}
				</Popup>
			</div>
			{el.image ? (
				<div className="img">
					<img src={`http://localhost:5000/api/image/${el.image}`} alt="" />
				</div>
			) : null}
		</li>
	);
};

export default Note;
