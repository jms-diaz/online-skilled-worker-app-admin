import React, { useEffect, useMemo, useState } from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import Table from '../components/table';
import { getJobs } from '../api/api';

export default function Jobs() {
	const [ loading, setLoading ] = useState(false);
	const [ jobs, setJobs ] = useState([]);

	useEffect(() => {
		setLoading(true);
		getJobs()
			.then((response) => {
				const allJobs = response.data;
				const data = allJobs.map((d) => ({
					id: d._id,
					jobTitle: d.jobTitle,
					description: d.jobDescription,
					location: d.jobLocation,
					salary: d.salary,
					createdBy: d.name,
					status: d.completed ? 'Completed' : 'Pending'
				}));
				setJobs(data);
			})
			.catch((error) => {
				setJobs([]); // reset the [] here - this is optional and is based on expected behaviour
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id'
			},
			{
				Header: 'Job Title',
				accessor: 'jobTitle'
			},
			{
				Header: 'Description',
				accessor: 'description'
			},
			{
				Header: 'Job Location',
				accessor: 'location'
			},
			{
				Header: 'Salary',
				accessor: 'salary'
			},
			{
				Header: 'Created By',
				accessor: 'createdBy'
			},
			{
				Header: 'Status',
				accessor: 'status'
			}
		],
		[]
	);

	if (jobs.length === 0 && !loading) {
		return <div className="mb-5">No jobs available</div>;
	}

	return (
		<CContainer lg id="jobs" name="jobs">
			<CRow>
				<CCol xs>
					<CCard className="mb-4">
						<CCardBody>
							<h4 id="traffic" className="card-title m-3">
								Jobs
							</h4>
							<div className="mb-5">
								{loading && <span>Fetching data</span>}
								<Table columns={columns} data={jobs} />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</CContainer>
	);
}
