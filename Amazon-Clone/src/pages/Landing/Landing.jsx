import React from 'react'
import Layout from '../../Components/Layout/Layout';
import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Product from '../../Components/Product/Product'

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
