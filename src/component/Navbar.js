import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
// todo : 토큰 삭제 시 여전히 네브바에는 로그아웃으로 남아 있음 ! 바로 반영되게 하려면 ?!
// todo : ++ 토큰이 사라지거나 이상하게 바뀌면 뭔가 알림창으로든 토스트메세지로든 세션 만료 됐다는 메세지 띄워주면 어때?
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf('Mobile') !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const menuList = [
    '여성',
    'Divided',
    '남성',
    '신생아/유아',
    '아동',
    'H&M HOME',
    'Sale',
    '지속가능성',
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  let location = useLocation();

  const onCheckEnter = (event) => {
    if (event.key === 'Enter') {
      const keyword = event.target.value.trim();
      if (event.target.value === '') {
        return navigate('/');
      }
      navigate(`?name=${keyword}`);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchKeyword(''); // 홈으로 이동할 때 검색 키워드 초기화
    }
  }, [location.pathname]);

  const logout = () => {
    dispatch(userActions.logout());
    dispatch({ type: 'CART_RESET' });
  };
  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      {user && user.level === 'admin' && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: 'pointer' }}>로그아웃</span>
                )}
              </div>
            ) : (
              <div onClick={() => navigate('/login')} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: 'pointer' }}>로그인</span>}
              </div>
            )}
            <div onClick={() => navigate('/cart')} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: 'pointer' }}>{`쇼핑백(${
                  user ? cartItemCount : 0
                })`}</span>
              )}
            </div>
            <div
              onClick={() => navigate('/account/purchase')}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: 'pointer' }}>내 주문</span>}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu}</a>
            </li>
          ))}
        </ul>
        {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="제품검색"
              value={searchKeyword} // 상태 변수와 동기화
              onChange={(e) => setSearchKeyword(e.target.value)} // 입력 값 상태 업데이트
              onKeyPress={onCheckEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
