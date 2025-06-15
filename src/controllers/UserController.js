const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
  // Register new user
  static async register(req, res) {
    try {
      const { nama, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      // Create new user with admin role for the first user
      const userCount = await User.countDocuments();
      const role = userCount === 0 ? 'admin' : 'user';
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ 
        nama, 
        email, 
        password: hashedPassword,
        role 
      });
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { id: newUser._id, nama: newUser.nama, email: newUser.email, role: newUser.role }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Debug: Log JWT_SECRET
      console.log('JWT_SECRET in login:', process.env.JWT_SECRET ? 'Set' : 'Not set');
      
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { nama, email, password } = req.body;
      const updates = {};
      if (nama) updates.nama = nama;
      if (email) updates.email = email;
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');

      if (!updatedUser) {
        return res.status(400).json({
          success: false,
          message: 'Failed to update profile'
        });
      }

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update user role (admin only)
  static async updateRole(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role'
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User role updated successfully',
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete user account
  static async deleteAccount(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user.id);
      
      if (!deletedUser) {
        return res.status(400).json({
          success: false,
          message: 'Failed to delete account'
        });
      }

      res.json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = UserController; 