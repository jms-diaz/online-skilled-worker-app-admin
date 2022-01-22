import Dashboard from './pages/Dashboard';
import React from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';
import Page404 from './pages/Page404';
import './scss/style.scss';

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse" />
	</div>
);

function App() {
	const { user } = useContext(Context);

	return (
		<Router>
			<React.Suspense fallback={loading}>
				<Routes>
					<Route path="*" element={<Page404 />} />
					<Route path="/" element={user ? <Dashboard /> : <Login />} />
					<Route path="/login" element={user ? <Dashboard /> : <Login />} />
				</Routes>
			</React.Suspense>
		</Router>
	);
}

export default App;
