import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { 
    name, email, password, role,
    phone, district, craftCategory, experience, bio,
    citizenshipDocument, profilePhoto, workshopPhoto, craftPhotos, video
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const isArtisan = role === 'artisan';

  const user = await User.create({
    name,
    email,
    password,
    role: isArtisan ? 'artisan' : 'buyer',
    phone: isArtisan ? phone : undefined,
    district: isArtisan ? district : undefined,
    craftCategory: isArtisan ? craftCategory : undefined,
    experience: isArtisan ? experience : undefined,
    bio: isArtisan ? bio : undefined,
    citizenshipDocument: isArtisan ? citizenshipDocument : undefined,
    profilePhoto: isArtisan ? profilePhoto : undefined,
    workshopPhoto: isArtisan ? workshopPhoto : undefined,
    craftPhotos: isArtisan ? craftPhotos : undefined,
    video: isArtisan ? video : undefined,
    verificationStatus: isArtisan ? 'pending' : 'none',
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get pending artisans
// @route   GET /api/users/artisans/pending
// @access  Private/Admin
const getPendingArtisans = asyncHandler(async (req, res) => {
  const artisans = await User.find({ role: 'artisan', verificationStatus: 'pending' }).select('-password');
  res.json(artisans);
});

// @desc    Verify/Reject artisan
// @route   PUT /api/users/:id/verify
// @access  Private/Admin
const verifyArtisan = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'verified' or 'rejected'
  
  const user = await User.findById(req.params.id);

  if (user && user.role === 'artisan') {
    user.verificationStatus = status;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      verificationStatus: updatedUser.verificationStatus,
    });
  } else {
    res.status(404);
    throw new Error('Artisan not found');
  }
});

export { authUser, registerUser, getUserProfile, getPendingArtisans, verifyArtisan };
