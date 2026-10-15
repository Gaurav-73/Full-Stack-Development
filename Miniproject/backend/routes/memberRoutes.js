const express = require("express");
const mongoose = require("mongoose");
const Member = require("../models/Member");

const router = express.Router();

// GET: Get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: members.length,
      members: members
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch members",
      error: error.message
    });
  }
});

// POST: Create a new member
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      phone,
      email,
      membershipPlan,
      membershipStartDate,
      status
    } = req.body;

    // Check required fields
    if (
      !fullName ||
      age === undefined ||
      !gender ||
      !phone ||
      !email ||
      !membershipPlan ||
      !membershipStartDate
    ) {
      return res.status(400).json({
        message: "Please provide all required member details"
      });
    }

    const member = new Member({
      fullName,
      age,
      gender,
      phone,
      email,
      membershipPlan,
      membershipStartDate,
      status
    });

    const savedMember = await member.save();

    res.status(201).json({
      message: "Member created successfully",
      member: savedMember
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A member with this email already exists"
      });
    }

    res.status(400).json({
      message: "Failed to create member",
      error: error.message
    });
  }
});

// GET: Get a single member by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid member ID"
      });
    }

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch member",
      error: error.message
    });
  }
});

// PUT: Update a member by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid member ID"
      });
    }

    // Only allow these fields to be updated
    const allowedFields = [
      "fullName",
      "age",
      "gender",
      "phone",
      "email",
      "membershipPlan",
      "membershipStartDate",
      "status"
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update"
      });
    }

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedMember) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json({
      message: "Member updated successfully",
      member: updatedMember
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A member with this email already exists"
      });
    }

    res.status(400).json({
      message: "Failed to update member",
      error: error.message
    });
  }
});

// DELETE: Delete a member by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid member ID"
      });
    }

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json({
      message: "Member deleted successfully",
      memberId: id
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete member",
      error: error.message
    });
  }
});

module.exports = router;
