import Modal from 'react-modal';

const CartModal = ({ isOpen, closeModal, cart, removeFromCart }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>Cart Items</h2>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.title} - ${item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
        </div>
      ))}
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};