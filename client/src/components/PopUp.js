import Popup from 'reactjs-popup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../actions/noteActions';

const PopUp = () => {
	const [name, setName] = useState(null);
	const [desc, setDesc] = useState(null);
	const [image, setImage] = useState(null);
	const [err, setErr] = useState(null);
	const dispatch = useDispatch();

	const add = (close) => {
		if (!name || !desc)
			return setErr('You forget to specify name or description...');
		dispatch(addNote(name, desc, image));
		return close();
	};

	return (
		<Popup trigger={<button>Create note</button>} modal className="new">
			{(close) => (
				<div className="new">
					<input
						type="text"
						placeholder="Note name"
						onChange={(e) => setName(e.target.value)}
					/>
					<textarea
						placeholder="Note description"
						onChange={(e) => setDesc(e.target.value)}></textarea>
					<input
						type="file"
						accept=".gif,.jpg,.jpeg,.png"
						onChange={(e) => setImage(e.target.files[0])}
						// onChange={(e) => setImage(e.target.value)}
					/>
					<button onClick={() => add(close)}>Create</button>
					<h3 className="err">{err}</h3>
				</div>
			)}
		</Popup>
	);
};

export default PopUp;
