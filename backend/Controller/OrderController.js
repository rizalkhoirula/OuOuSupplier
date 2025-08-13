const Order = require('../Models/Order');
const Product = require('../Models/Product');
const User = require('../Models/User');

// @desc    Create new order
// @route   POST /api/orders
exports.addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user.userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Decrease stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock -= item.qty;
        await product.save();
      }
    }

    // Clear cart
    const user = await User.findById(req.user.userId);
    user.cart = [];
    await user.save();


    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.json(orders);
};
