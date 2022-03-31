import React, { Fragment, useEffect } from 'react'
import Metadata from './layout/Metadata'
import {useDispatch,useSelector} from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import { useAlert } from 'react-alert';

const Home = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const {loading,products,error,products_count } = useSelector(state => state.products)



  useEffect(()=>{
    if(error){
      return alert.error(error);
    }

    dispatch(getProducts());
    
  },[dispatch,alert,error]);


  return (
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
          <Metadata title={'Buy best products online'} />
          <div className='container-fluid'>
          <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
            <div className="row">

                {products && products.map(product => (

                  <Product key={product._id} product={product} />
                ))}

          
            </div>
            </section>

          </div>
        </Fragment>
      )
      }
        
        

      
    </Fragment>
  )
}

export default Home