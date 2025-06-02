import React from 'react'
import Layout from '../../Components/Layout/Layout';
import CarouselEffect from '../../components/Carousel/CarouselEffect'
import Product from '../../components/Product/Product'

import CatagoryEffect from '../../components/Catagory/CatagoryEffect'


function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <CatagoryEffect />
      <Product />
    </Layout>
  );
}

export default Landing
