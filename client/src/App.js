import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './redux/actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './components/CartScreen';
import HomeScreen from './components/HomeScreen';
import PaymentMethodScreen from './components/PaymentMethodScreen';
import ProductListScreen from './components/ProductListScreen';
import ProductScreen from './components/ProductScreen';
import ProfileScreen from './components/ProfileScreen';
import RegisterScreen from './components/RegisterScreen';
import ShippingAddressScreen from './components/ShippingAddressScreen';
import SigninScreen from './components/SigninScreen';
import ProductCreateScreen from './components/ProductCreateScreen';
import ProductEditScreen from './components/ProductEditScreen';
import UserListScreen from './components/UserListScreen';
import UserEditScreen from './components/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './components/SearchScreen';
import { listProductCategories } from './redux/actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';


function App() {
  const cart = useSelector((state) => state.cart);
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="nav">
          <div>
            <Link className="brand" to="/">
              <img src='./tech-geek.png' style={{ width: '150px', height: '50px', backgroundImage: 'none', marginTop: '10px' }} ></img>
            </Link>
          </div>
          <div className='dropdown2'>
            <Link style={{ marginTop: '30px', fontSize: '18px', fontWeight: '600' }} to="#">
              Categories <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown2-content">
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                    categories.map((c) => (
                      <li key={c}>
                        <Link
                          to={`/search/category/${c}`}
                        >
                          {c}
                        </Link>
                      </li>
                    ))
                  )}
            </ul>
          </div>
          <Route
            render={({ history }) => (
              <SearchBox history={history}></SearchBox>
            )}
          ></Route>
          <div className='nav-link'>
            <Link style={{ padding: '0px', marginRight: '20px' }} to="/cart">
              <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i>
              {cartItems.length >= 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link style={{ padding: '0px', fontSize: '17px', fontWeight: '600' }} to="#">
                  <i style={{ paddingRight: '10px', paddingLeft: '10px' }} class="fa fa-user fa-2x" aria-hidden="true"></i>{userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"> <i class="fa fa-user" aria-hidden="true"></i> User Profile</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler} >
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
                <Link style={{ paddingRight: '30px' }} to="/signin" style={{ paddingRight: '30px', fontSize: '17px', fontWeight: '600' }}><i style={{ paddingRight: '5px', paddingLeft: '10px' }} class="fa fa-sign-in fa-2x" aria-hidden="true"></i> Sign In</Link>
              )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link style={{ paddingRight: '30px', fontSize: '17px', fontWeight: '600' }} to="#admin">
                  <i style={{ paddingRight: '10px', paddingLeft: '10px' }} class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist"> <i class="fa fa-th-list" aria-hidden="true"></i> Products</Link>
                  </li>
                  <li>
                    <Link to="/userlist"> <i class="fa fa-users" aria-hidden="true"></i> Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* <div >
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
                  categories.map((c) => (
                    <li key={c}>
                      <Link
                        to={`/search/category/${c}`}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        {c}
                      </Link>
                    </li>
                  ))
                )}
          </ul>
        </div> */}
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route
            path="/products/create"
            component={ProductCreateScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/about"
          >

          </Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="footer">
          <div className="footer-middle border-0">
            <div className="container">
              <div className="container-row">
                <div className="col-sm-6 col-lg-3">
                  <div className="widget widget-about">
                    <img src="/tech-geek.png" className="footer-logo" alt="Footer Logo" width={105} height={25} />
                    <p>Tech-Geek is the specialist in online sales in Tunisia. We have the largest choice and the best prices in Tunisia. Tech-Geek works with the biggest brands who trust it completely. </p>
                    <div className="social-icons">
                      <a href="#" className="social-icon" target="_blank" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                      <a href="#" className="social-icon" target="_blank" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                      <a href="#" className="social-icon" target="_blank" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                      <a href="#" className="social-icon" target="_blank" title="Youtube"><i class="fa fa-youtube" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="widget">
                    <h4 className="widget-title">Useful Links</h4>
                    <ul className="widget-list">
                      <li><Link to="/about">About</Link></li>
                      <li><a href="#">How to shop on TECH GEEK</a></li>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="contact.html">Contact us</a></li>
                      <li><a> <Link to="/signin">Sign In</Link></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="widget">
                    <h4 className="widget-title">Customer Service</h4>
                    <ul className="widget-list">
                      <li><a href="#">Payment Methods</a></li>
                      <li><a href="#">Money-back guarantee!</a></li>
                      <li><a href="#">Returns</a></li>
                      <li><a href="#">Shipping</a></li>
                      <li><a href="#">Terms and conditions</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="widget">
                    <h4 className="widget-title">My Account</h4>
                    <ul className="widget-list">
                      <li><a><Link to="/signin">Sign In</Link></a></li>
                      <li><a ><Link to="/cart">View Cart</Link></a></li>
                      <li><a href="#">My Wishlist</a></li>
                      <li><a href="#">Track My Order</a></li>
                      <li><a href="#">Help</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <p className="footer-copyright">Copyright © 2021 Tech-Geek. All Rights Reserved.</p>
              <figure className="footer-payments">
                <img src="/payments.png" alt="Payment methods" width={272} height={20} />
              </figure>{/* End .footer-payments */}
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;