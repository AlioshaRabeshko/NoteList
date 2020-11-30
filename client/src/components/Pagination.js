import { Link } from 'react-router-dom';

const Pagination = ({ count }) => {
	const pages = Math.ceil(count / 5);
	const links = new Array(pages).fill(0);
	return pages <= 1 ? (
		<ul className="pagination" />
	) : (
		<ul className="pagination">
			{links.map((el, id) => (
				<li key={id}>
					<Link as="a" to={`${id}`}>
						{id + 1}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default Pagination;
