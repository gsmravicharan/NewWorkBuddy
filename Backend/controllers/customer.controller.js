const Customer = require('../models/Customer');

// already exists
async function getDashboard(req, res) {
  return res.json({
    message: 'Customer dashboard',
    user: { id: req.user._id, role: req.user.role }
  });
}

// ✅ SINGLE POST API (no fullName)
async function upsertCustomer(req, res) {
  try {
    const userId = req.user._id;

    const { username, email, phoneNumber, gender, address } = req.body;

    const customer = await Customer.findOneAndUpdate(
      { userId },
      {
        $set: {
          username,
          email,
          phoneNumber,
          gender,
          address
        },
        $setOnInsert: {
          userId,
          totalRequests: 0,
          ongoingRequests: 0,
          completedRequests: 0
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Customer profile saved successfully',
      customer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function updateAllCustomerFields(req, res) {
  try {
    const userId = req.user._id;

    const updatedCustomer = await Customer.findOneAndUpdate(
      { userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          gender: req.body.gender,
          address: req.body.address,
          totalRequests: req.body.totalRequests,
          ongoingRequests: req.body.ongoingRequests,
          completedRequests: req.body.completedRequests
        }
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({
      message: 'Customer updated successfully (all fields)',
      customer: updatedCustomer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getCustomerDetails(req, res) {
  try {
    const userId = req.user._id;

    const customer = await Customer.findOne({ userId });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({
      message: 'Customer details fetched successfully',
      customer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getDashboard,
  upsertCustomer,
   updateAllCustomerFields,
   getCustomerDetails
};
