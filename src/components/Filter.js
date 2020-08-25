import React, {Component} from 'react';
import data from '../data.json';
// import Products from './Products';

export default class Filter extends Component {
  constructor (props) {
    super (props);
    this.state = {
      products: data.products,
    };
  }

  render () {
    console.log (this.props.title);
    let showTitle = null;
    if (this.state.products !== null) {
      this.state.products.map (
        product =>
          (showTitle = (
            <select value={product.title} onChange={this.props.searchByName}>
              <option value={product.title}>{product.title}</option>
            </select>
          ))
      );
    }

    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-searchByName">
          Name{''}<select
            value={this.props.tittle}
            onChange={this.props.searchByName}
          >
            <option value="">ALL</option>
            <option value={this.state.products.title}>{showTitle}</option>
          </select>

        </div>
        <div className="filter-sort">
          Order{''}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option value="">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{''}<select
            value={this.props.size}
            onChange={this.props.filterProducts}
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}