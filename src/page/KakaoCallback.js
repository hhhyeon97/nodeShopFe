import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { ColorRing } from 'react-loader-spinner';

const KakaoCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loginSuccess = useSelector((state) => state.user.loading);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      dispatch(userActions.loginWithKakao2(code));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (!loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="center-spinner">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#779fe0', '#6d7787', '#e1e6ed']}
      />
    </div>
  );
};

export default KakaoCallback;
