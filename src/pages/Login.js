import {
	CButton,
	CCard,
	CCardBody,
	CCol,
	CContainer,
	CForm,
	CFormInput,
	CInputGroup,
	CInputGroupText,
	CRow,
	CFormFeedback
} from '@coreui/react';
import { useState, useRef, useContext } from 'react';
import CIcon from '@coreui/icons-react';
import { Context } from '../context/Context';
import axios from 'axios';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [ validated, setValidated ] = useState(false);
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const navigate = useNavigate();

	// handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		setValidated(true);

		dispatch({ type: 'LOGIN_START' });
		try {
			const values = {
				email: userRef.current.value,
				password: passwordRef.current.value
			};
			const res = await axios.post('/users/login-admin', { values });
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
			navigate('/');
		} catch (err) {
			dispatch({ type: 'LOGIN_FAIL' });
		}
	};

	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={8}>
						<CCard className="p-4">
							<CCardBody>
								<CForm
									action=""
									className="needs-validation"
									validated={validated}
									onSubmit={handleSubmit}
								>
									<div className="text-center">
										<h1>OSWL Admin Login</h1>
										<p className="text-medium-emphasis">Sign in to access</p>
									</div>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilUser} />
										</CInputGroupText>
										<CFormInput
											type="text"
											id="username"
											required
											placeholder="Username"
											autoComplete="username"
											ref={userRef}
											minLength="6"
										/>
										<CFormFeedback invalid>Please enter username.</CFormFeedback>
									</CInputGroup>
									<CInputGroup className="mb-4">
										<CInputGroupText>
											<CIcon icon={cilLockLocked} />
										</CInputGroupText>
										<CFormInput
											type="password"
											placeholder="Password"
											autoComplete="current-password"
											id="password"
											required
											minLength="6"
											ref={passwordRef}
										/>
									</CInputGroup>
									<CFormFeedback invalid>Please enter password.</CFormFeedback>
									<CCol className="text-center">
										<CButton color="primary" className="px-4" type="submit" disabled={isFetching}>
											Login
										</CButton>
									</CCol>
								</CForm>
							</CCardBody>
						</CCard>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
}
