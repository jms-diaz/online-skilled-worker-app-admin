import { CHeader, CContainer, CHeaderToggler, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout, cilMenu } from '@coreui/icons';

import React, { useContext } from 'react';
import { Context } from '../context/Context';

export default function Header() {
	const dispatchUse = useDispatch();
	const navigate = useNavigate();
	const { user, dispatch } = useContext(Context);
	const sidebarShow = useSelector((state) => state.sidebarShow);

	const handleClick = () => {
		dispatch({ type: 'LOGOUT' });
		localStorage.clear();
		navigate('/login');
	};

	return (
		<CHeader position="sticky" className="mb-4">
			<CContainer fluid>
				<CHeaderToggler
					className="ps-1"
					onClick={() => dispatchUse({ type: 'set', sidebarShow: !sidebarShow })}
				>
					<CIcon icon={cilMenu} size="lg" />
				</CHeaderToggler>
				<CHeaderNav className="d-none d-md-flex me-auto">
					<CNavItem>
						<CNavLink to="/" component={NavLink} activeClassName="active">
							Dashboard
						</CNavLink>
					</CNavItem>
				</CHeaderNav>
				<CHeaderNav>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilAccountLogout} size="lg" onClick={handleClick} />
						</CNavLink>
					</CNavItem>
				</CHeaderNav>
			</CContainer>
		</CHeader>
	);
}
