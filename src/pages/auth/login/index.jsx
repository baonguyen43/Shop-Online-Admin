import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { message } from 'antd';
import { LOCATIONS } from 'constants';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === '12345') {
      message.success('Đăng nhập thành công');
      window.location.href = LOCATIONS.PRODUCTS;
    } else {
      message.error('Đăng nhập thất bại');
    }
  };
  console.log('handleLogin :>> ', handleLogin);
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src={require("assets/images/login.jpeg")} alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0" style={{color:'#AE1A28'}}>Shop Online</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Đăng nhập Admin</h5>

                <MDBInput wrapperClass='mb-4' label='Email ' id='email' type='email' value={email}  onChange={e => setEmail(e.target.value)} size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Mật khẩu'
        id='password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)} size="lg"/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleLogin}>Đăng nhập </MDBBtn>
              <a className="small text-muted" href="#!">Quên mật khẩu?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Không có tài khoản? <a href="#!" style={{color: '#393f81'}}>Đăng ký</a></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;