import { CSidebar, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CSidebarToggler, CImage } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { cilUser, cilList, cilGroup } from '@coreui/icons';
import React from 'react';
import logo from '../assets/oswa-logo.png';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// TODO: fix nav items

export default function Sidebar() {
	const dispatch = useDispatch();
	const unfoldable = useSelector((state) => state.sidebarUnfoldable);
	const sidebarShow = useSelector((state) => state.sidebarShow);

	return (
		<CSidebar
			position="fixed"
			unfoldable={unfoldable}
			visible={sidebarShow}
			onVisibleChange={(visible) => {
				dispatch({ type: 'set', sidebarShow: visible });
			}}
		>
			<CSidebarBrand className="d-none d-md-flex" to="/dashboard">
				<CImage className="sidebar-brand-full me-2" src={logo} height={35} />
				OSWL Dashboard
			</CSidebarBrand>
			<CSidebarNav>
				<SimpleBar>
					<CNavTitle>Users</CNavTitle>
					<CNavItem href="#customers">
						<CIcon customClassName="nav-icon" icon={cilUser} />
						Customers
					</CNavItem>
					<CNavItem href="#workers">
						<CIcon customClassName="nav-icon" icon={cilGroup} />
						Workers
					</CNavItem>
					<CNavItem href="#jobs">
						<CIcon customClassName="nav-icon" icon={cilList} />
						Jobs
					</CNavItem>
				</SimpleBar>
			</CSidebarNav>
			<CSidebarToggler
				className="d-none d-lg-flex"
				onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
			/>
		</CSidebar>
	);
}
