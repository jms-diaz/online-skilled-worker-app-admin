import axios from 'axios';

export const getCustomers = async () => {
	return await axios.get('/customers/all');
};

export const getJobs = async () => {
	try {
		return await axios.get('jobs/all');
	} catch (err) {
		console.log(err);
	}
};

export const getWorkers = async () => {
	return await axios.get('/workers/all');
};

export const verifyWorker = async (name) => {
	try {
		await axios.get('workers/verify', { params: { name: name } });
	} catch (err) {
		console.log(err);
	}
};
