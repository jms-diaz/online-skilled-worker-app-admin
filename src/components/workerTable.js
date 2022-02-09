import { useTable } from 'react-table';
import { useMemo } from 'react';
import BTable from 'react-bootstrap/Table';
import React from 'react';
import { verifyWorker } from '../api/api';

export default function WorkerTable({ data }) {
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
			},
			{
				Header: 'Action',
				accessor: 'action',
				Cell: (value) => (
					<button
						className="button"
						onClick={() => handleEdit(value.row.original)}
						disabled={value.row.original.status === 'Verified' && true}
					>
						Approve
					</button>
				)
			}
		],
		[]
	);
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data
	});

	const handleEdit = (row) => {
		verifyWorker(row.name).then((r) => window.location.reload());
	};

	// Render the UI for your table
	return (
		<BTable striped bordered hover {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</BTable>
	);
}
