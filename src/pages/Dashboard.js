import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Customers from './Customers';
import Jobs from './Jobs';
import Workers from './Workers';

export default function Dashboard() {
	const location = useLocation();
	console.log(location.pathname);
	return (
		<div>
			<Sidebar />
			<div className="wrapper d-flex flex-column min-vh-100 bg-light">
				<Header />
				<div className="body flex-grow-1 px-3">
					<Customers />
					<Workers />
					<Jobs />
				</div>
			</div>
		</div>
	);
}
