// Worker-specific controllers
async function getDashboard(req, res) {
  return res.json({ message: 'Worker dashboard', user: { id: req.user._id, role: req.user.role } });
}

const Worker = require('../models/Worker');

// POST: Create or Update Worker (without fullName)
async function upsertWorker(req, res) {
  try {
    const userId = req.user._id;

    const {
      username,
      email,
      phoneNumber,
      gender,
      skills,
      location
    } = req.body;

    const worker = await Worker.findOneAndUpdate(
      { userId },
      {
        $set: {
          username,
          email,
          phoneNumber,
          gender,
          skills,
          location
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
      message: 'Worker profile saved successfully',
      worker
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



// UPDATE ALL WORKER FIELDS
async function updateAllWorkerFields(req, res) {
  try {
    const userId = req.user._id;

    const updatedWorker = await Worker.findOneAndUpdate(
      { userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          gender: req.body.gender,
          skills: req.body.skills,
          location: req.body.location,
          totalRequests: req.body.totalRequests,
          ongoingRequests: req.body.ongoingRequests,
          completedRequests: req.body.completedRequests
        }
      },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({
      message: 'Worker updated successfully (all fields)',
      worker: updatedWorker
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET WORKER DETAILS
async function getWorkerDetails(req, res) {
  try {
    const userId = req.user._id;

    const worker = await Worker.findOne({ userId });

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({
      message: 'Worker details fetched successfully',
      worker
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { getDashboard , upsertWorker,updateAllWorkerFields,getWorkerDetails  };
