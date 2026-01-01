const Handicapper = require('../models/Handicapper');

// DASHBOARD
async function getDashboard(req, res) {
  return res.json({
    message: 'Handicapper dashboard',
    user: { id: req.user._id, role: req.user.role }
  });
}

// POST: CREATE OR UPDATE (WITHOUT fullName)
async function upsertHandicapper(req, res) {
  try {
    const userId = req.user._id;

    const {
      username,
      email,
      phoneNumber,
      gender,
      assistanceType
    } = req.body;

    const handicapper = await Handicapper.findOneAndUpdate(
      { userId },
      {
        $set: {
          username,
          email,
          phoneNumber,
          gender,
          assistanceType
        },
        $setOnInsert: {
          userId
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Handicapper profile saved successfully',
      handicapper
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PUT: UPDATE ALL FIELDS (INCLUDING fullName)
async function updateAllHandicapperFields(req, res) {
  try {
    const userId = req.user._id;

    const updatedHandicapper = await Handicapper.findOneAndUpdate(
      { userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          gender: req.body.gender,
          assistanceType: req.body.assistanceType
        }
      },
      { new: true }
    );

    if (!updatedHandicapper) {
      return res.status(404).json({ message: 'Handicapper not found' });
    }

    res.status(200).json({
      message: 'Handicapper updated successfully (all fields)',
      handicapper: updatedHandicapper
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// GET HANDICAPPER DETAILS
async function getHandicapperDetails(req, res) {
  try {
    const userId = req.user._id;

    const handicapper = await Handicapper.findOne({ userId });

    if (!handicapper) {
      return res.status(404).json({ message: 'Handicapper not found' });
    }

    res.status(200).json({
      message: 'Handicapper details fetched successfully',
      handicapper
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getDashboard,
  upsertHandicapper,
  updateAllHandicapperFields,
    getHandicapperDetails
};
