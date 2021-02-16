import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h3>{product.name.slice(0,32)}...</h3>
        </Link>
        <div>{product.countInStock == 0 ? <h3 style={{color:'red',fontSize:'14px'}}>Unavailable</h3>: <h3 style={{color:'green',fontSize:'14px'}}>Available</h3>}</div>
        <div className="row">
          <div className="price">{product.price} TND</div>
          <Link to={`/cart/${product._id}?qty=1`}>
        <i class="fa fa-cart-plus fa-2x" style={{color:'#f0c040'}} aria-hidden="true"></i>
        </Link>
        </div>
        
      </div>
    </div>
  );
}
