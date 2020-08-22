import React, {Component} from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
  render () {
    const {cartItems} = this.props; // get the cartItems from parent component
    return (
      <div>
        {cartItems.length === 0
          ? <div className="cart cart-header">Cart is empty</div>
          : <div className="cart cart-header">
              You order {cartItems.length} item in the cart {''}
            </div>}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map (item => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency (item.price)} x {item.count}{' '}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart (item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
