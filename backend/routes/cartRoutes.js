import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc    Get cart items
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // In a real app, you'd fetch cart items from the database
    // For simplicity, we're using a request body
    res.json({ message: 'Cart items would be fetched here' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // In a real app, you'd add the item to the user's cart in the database
    // For simplicity, we're just returning the product with the quantity
    res.status(201).json({
      product: {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty
      },
      message: 'Item added to cart'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    // In a real app, you'd remove the item from the user's cart in the database
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;