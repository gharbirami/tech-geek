import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  deleteProduct,
  listProducts,
} from '../redux/actions/productActions';
import { Button } from 'reactstrap'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_DELETE_RESET,
} from '../redux/constants/productConstants';

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();
  const adminMode = props.match.path.indexOf('/admin') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {

    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ admin: adminMode ? userInfo._id : '', pageNumber })
    );
  }, [
    dispatch,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);
  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>

        <Link to={`/products/create`}>
          <button className="primary block" >Create Product</button>
        </Link>

      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th style={{ textAlign: 'center' }}>IMAGE</th>
                    <th style={{ textAlign: 'center' }}>NAME</th>
                    <th style={{ textAlign: 'center' }}>STOCK</th>
                    <th style={{ textAlign: 'center' }}>PRICE</th>
                    <th style={{ textAlign: 'center' }}>CATEGORY</th>
                    <th style={{ textAlign: 'center' }}>BRAND</th>
                    <th style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      {/* <td>{product._id}</td> */}
                      <td style={{ textAlign: 'center' }}><img src={product.image} alt={product.name} className="small"></img></td>
                      <td>{product.name}</td>
                      <td style={{ textAlign: 'center' }}>{product.countInStock}</td>
                      <td style={{ textAlign: 'center' }}>{product.price} TND</td>
                      <td style={{ textAlign: 'center' }}>{product.category}</td>
                      <td style={{ textAlign: 'center' }}>{product.brand}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          style={{ padding: '5px 15px' }}
                          type="button"
                          className="small edit"
                          onClick={() =>
                            props.history.push(`/product/${product._id}/edit`)
                          }
                        >
                          <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                        </button>
                        <button
                          style={{ padding: '5px 15px' }}
                          type="button"
                          className="small delet"
                          onClick={() => deleteHandler(product)}
                        >
                          <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={`/productlist/pageNumber/${x + 1}`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
    </div>
  );
}
