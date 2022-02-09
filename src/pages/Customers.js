import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { getCustomers } from '../api/api';
import Table from '../components/table';

export default function Customers() {
	const [ loading, setLoading ] = useState(false);
	const [ customers, setCustomers ] = useState([]);

	useEffect(() => {
		setLoading(true);
		getCustomers()
			.then((response) => {
				const allCustomers = response.data;
				const data = allCustomers.map((d) => ({
					id: d._id,
					name: d.name,
					address: d.address,
					gender: d.gender,
					contactNumber: '0' + d.contactNumber,
					bio: d.bio
				}));
				setCustomers(data);
			})
			.catch((error) => {
				setCustomers([]); // reset the [] here - this is optional and is based on expected behaviour
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
				Header: 'Bio',
				accessor: 'bio'
			}
		],
		[]
	);

	if (customers.length === 0 && !loading) {
		return <div className="mb-5">No customers available</div>;
	}

	return (
		<CContainer lg id="customers" name="customers">
			<CRow>
				<CCol xs>
					<CCard className="mb-4">
						<CCardBody>
							<h4 id="traffic" className="card-title m-3">
								Customers
							</h4>
							<div className="mb-5">
								{loading && <span>Fetching data</span>}
								<Table columns={columns} data={customers} className="mb-0 border" />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</CContainer>
	);
}
