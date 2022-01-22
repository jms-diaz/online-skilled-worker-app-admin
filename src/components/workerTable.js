import { useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';
import React from 'react';
import { verifyWorker } from '../api/api';

export default function WorkerTable({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data
	});

	const handleEdit = (row) => {
		verifyWorker(row.values.name).then(prepareRow(row));
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
						<th>Action</th>
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
							<td>
								<button className="button" onClick={() => handleEdit(row)}>
									Approve
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</BTable>
	);
}
