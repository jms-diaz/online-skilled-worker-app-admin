import React, { useEffect, useMemo, useState } from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import { getWorkers } from '../api/api';
import WorkerTable from '../components/workerTable';

export default function Workers() {
	const [ loading, setLoading ] = useState(false);
	const [ workers, setWorkers ] = useState([]);

	useEffect(() => {
		setLoading(true);
		getWorkers()
			.then((response) => {
				console.log(response.data);
				const allCustomers = response.data;
				const data = allCustomers.map((d) => ({
					id: d._id,
					name: d.fullName,
					address: d.address,
					gender: d.gender,
					contactNumber: '0' + d.contactNumber,
					occupation: d.occupation,
					status: d.verified ? 'Verified' : 'Not verified'
				}));
				setWorkers(data);
			})
			.catch((error) => {
				setWorkers([]); // reset the [] here - this is optional and is based on expected behaviour
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
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: 'Occupation',
				accessor: 'occupation'
			},
			{
				Header: 'Address',
				accessor: 'address'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'Contact Number',
				accessor: 'contactNumber'
			},
			{
				Header: 'Status',
				accessor: 'status'
			}
		],
		[]
	);

	if (workers.length === 0 && !loading) {
		return <div className="mb-5">No workers available</div>;
	}

	return (
		<CContainer lg>
			<CRow>
				<CCol xs>
					<CCard className="mb-4">
						<CCardBody>
							<h4 id="traffic" className="card-title m-3">
								Workers
							</h4>
							<div className="mb-5">
								{loading && <span>Fetching data</span>}
								<WorkerTable columns={columns} data={workers} />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</CContainer>
	);
}
