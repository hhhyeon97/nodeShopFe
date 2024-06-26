import React, { useState } from 'react';
import { Offcanvas, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSelectMenu = (url) => {
    setShow(false);
    navigate(url);
  };

  const NavbarContent = () => {
    return (
      <div>
        <div className="nav-logo">
          <Link to="/">
            <h1 className="side-bar-logo">*fuzzy​*</h1>
          </Link>
        </div>
        <div className="sidebar-item">계정 관리</div>
        <ul className="sidebar-area">
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu('/admin/product?page=1')}
          >
            상품 관리
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu('/admin/order?page=1')}
          >
            주문 관리
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu('/admin/notice')}
          >
            공지사항 관리
          </li>
        </ul>
      </div>
    );
  };
  return (
    <>
      <div className="sidebar-toggle">{NavbarContent()}</div>

      <Navbar bg="light" expand={false} className="mobile-sidebar-toggle">
        <Container fluid>
          <h1 className="side-bar-logo">*fuzzy​*</h1>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle
            style={{ marginRight: '15px' }}
            aria-controls={`offcanvasNavbar-expand`}
            onClick={() => setShow(true)}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
            className="sidebar"
            show={show}
          >
            <Offcanvas.Header closeButton onHide={() => setShow(false)} />
            <Offcanvas.Body>{NavbarContent()}</Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
