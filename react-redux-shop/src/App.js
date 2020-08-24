import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem ('cartItems')
        ? JSON.parse (localStorage.getItem ('cartItems'))
        : [],
      size: '',
      sort: '',
      name: '',
    };
  }

  createOrder = order => {
    alert ('Need to save order for ' + order.name);
  };

  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice ();
    this.setState ({
      cartItems: cartItems.filter (x => x._id !== product._id),
    });
    localStorage.setItem (
      'cartItems',
      JSON.stringify (cartItems.filter (x => x._id !== product._id))
    );
  };

  addToCart = product => {
    const cartItems = this.state.cartItems.slice ();
    let alreadyInCart = false;
    console.log (cartItems);
    cartItems.forEach (item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push ({...product, count: 1});
    }
    this.setState ({cartItems});
    localStorage.setItem ('cartItems', JSON.stringify (cartItems));
  };

  searchByName = event => {
    console.log (event.target.value);
    if (event.target.value === '') {
      this.setState ({name: event, products: data.products});
    } else {
      this.setState ({
        name: event.target.value,
        products: data.products.filter (
          product => product.title.indexOf (event.target.value) >= 0
        ),
      });
    }
  };

  sortProducts = event => {
    const sort = event.target.value;
    console.log (event.target.value);
    this.setState (state => ({
      sort: sort,
      products: this.state.products
        .slice () //clone products
        .sort (
          (a, b) =>
            sort === 'lowest'
              ? a.price > b.price ? 1 : -1
              : sort === 'highest'
                  ? a.price < b.price ? 1 : -1
                  : a._id < b._id ? 1 : -1
        ),
    }));
  };

  filterProducts = event => {
    console.log (event.target.value);
    if (event.target.value === '') {
      this.setState ({size: event, products: data.products});
    } else {
      this.setState ({
        size: event.target.value,
        products: data.products.filter (
          product => product.availableSizes.indexOf (event.target.value) >= 0
        ),
      });
    }
  };

  render () {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shop</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                name={this.state.name}
                searchByName={this.searchByName}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer> This is reserved</footer>
      </div>
    );
  }
}

export default App;
