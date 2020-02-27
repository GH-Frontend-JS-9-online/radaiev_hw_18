import * as React from "react";
import { useHistory } from 'react-router-dom';

export const AboutPage: React.FC = () => {
	const history = useHistory();
	return (
		<>
			<h1>Страница информации</h1>
			<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam illum sequi a magnam. Dolorem illum reprehenderit minima molestias iusto voluptas!
			</p>
			<button className="btn" onClick={() => history.push('/')}>Обратно к списку дел</button>
		</>
	);
}