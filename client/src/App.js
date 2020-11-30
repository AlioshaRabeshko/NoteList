import './App.scss';
import List from './components/List';
import PopUp from './components/PopUp';
import Pagination from './components/Pagination';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPages } from './actions/noteActions';

const App = () => {
	const count = useSelector((state) => state.notes.count);
	console.log(count);
	const dispatch = useDispatch();
	useEffect(() => dispatch(getPages()), [dispatch]);
	return (
		<div className="App">
			<PopUp />
			<Route exact path="/:page?">
				<List />
			</Route>
			<Pagination count={count} />
		</div>
	);
};

export default App;
