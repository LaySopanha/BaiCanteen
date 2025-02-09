const { User } = require('../models');

const userController = {
  async getVendors(req, res) {
    try {
      // Query all users with the role 'vendor'
      const vendors = await User.findAll({
        where: { role: 'vendor' },
        attributes: { exclude: ['password'] } // Exclude sensitive fields
      });
      res.json({ success: true, vendors });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching vendors', 
        error: error.message 
      });
    }
  }
};

module.exports = userController;