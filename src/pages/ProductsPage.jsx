import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsAsync } from '../redux/reducers/products';

import Card from '../components/Card';
import { Grid } from '@material-ui/core';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { isLoading, products, errorMessage } = useSelector(state => state.products);

  useEffect(() => {
      dispatch(loadProductsAsync())
  }, [])

  const productItems = useSelector(state => state.products.products.items);
  // console.log("produc item : ", productItems);

  return (
    <div>
      <h1>Products Listing</h1>
      {isLoading && <h3>Loading...</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
      {products && Object.entries(products.items).map(item => {
        console.log("item : ", item);
        <Grid item key={item.address}>
          <Card {...item} />
        </Grid>
      })}



      {/* { 
        products && productItems.map((item, index) => {
          console.log("item : ", item);
          // return (
          //   <div key={index}>
          //     <h3> {item.name}</h3>
          //     <p>{item.address}</p>
          //   </div>
          // )
        })
      } */}



    </div>
  )
}

export default ProductsPage;