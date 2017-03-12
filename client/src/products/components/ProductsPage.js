import React, { Component } from 'react'
import ProductList from './ProductList'
import ProductSearch from './ProductSearch'

class ProductsPage extends Component {
  render() {
    return (
      <div className="android-more-section">
        <div className="android-section-title mdl-typography--display-1-color-contrast">Products</div>
        <ProductSearch/>
        <ProductList />
      </div>
    )
  }
}

export default ProductsPage