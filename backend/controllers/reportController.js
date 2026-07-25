import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';
import Product from '../models/Product.js';

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private (Buyer only)
const createReport = asyncHandler(async (req, res) => {
  const { productId, reason, description, evidenceImages } = req.body;

  if (req.user.role !== 'buyer') {
    res.status(403);
    throw new Error('Only buyers can submit reports');
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if buyer already reported this product and it's not resolved/rejected
  const existingReport = await Report.findOne({
    product: productId,
    buyer: req.user._id,
    status: { $in: ['Pending Review', 'Under Investigation'] }
  });

  if (existingReport) {
    res.status(400);
    throw new Error('You have already reported this product and it is under review');
  }

  const report = new Report({
    product: productId,
    buyer: req.user._id,
    reason,
    description,
    evidenceImages,
  });

  const createdReport = await report.save();

  // Check total active reports for this product
  const activeReportsCount = await Report.countDocuments({
    product: productId,
    status: { $in: ['Pending Review', 'Under Investigation'] }
  });

  if (activeReportsCount >= 5 && !product.isUnderReview) {
    product.isUnderReview = true;
    await product.save();
  }

  res.status(201).json(createdReport);
});

// @desc    Get all reports (Admin)
// @route   GET /api/reports
// @access  Private/Admin
const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({})
    .populate('buyer', 'name email')
    .populate('product', 'name imageUrl artisanName price isUnderReview')
    .sort({ createdAt: -1 });

  res.json(reports);
});

// @desc    Update report status and/or hide product (Admin)
// @route   PUT /api/reports/:id
// @access  Private/Admin
const updateReport = asyncHandler(async (req, res) => {
  const { status, adminNotes, hideProduct } = req.body;

  const report = await Report.findById(req.params.id).populate('product');

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  if (status) report.status = status;
  if (adminNotes) report.adminNotes = adminNotes;

  await report.save();

  if (hideProduct !== undefined && report.product) {
    const product = await Product.findById(report.product._id);
    if (product) {
      product.isUnderReview = hideProduct;
      await product.save();
    }
  }

  res.json(report);
});

// @desc    Get buyer's own reports
// @route   GET /api/reports/myreports
// @access  Private (Buyer)
const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ buyer: req.user._id })
    .populate('product', 'name imageUrl')
    .sort({ createdAt: -1 });
    
  res.json(reports);
});

export { createReport, getReports, updateReport, getMyReports };
