import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import University from "../models/univirsity.model.js";
import Teacher from "../models/teacher.model.js";

const createUniversity = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    location,
    description,
    website,
    establishedYear,
    logo,
  } = req.body;

  if (
    !name ||
    !address ||
    !phone ||
    !email ||
    !location ||
    !description ||
    !establishedYear ||
    !logo
  ) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email address",
    });
  }

  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      message: "Name must be between 2 and 50 characters",
    });
  }

  // Validate GeoJSON location
  if (
    typeof location !== "object" ||
    location.type !== "Point" ||
    !Array.isArray(location.coordinates) ||
    location.coordinates.length !== 2 ||
    typeof location.coordinates[0] !== "number" ||
    typeof location.coordinates[1] !== "number"
  ) {
    return res.status(400).json({
      message:
        "Invalid GeoJSON location. Must include type 'Point' and coordinates [lng, lat]",
    });
  }

  const existingUniversity = await University.findOne({ email });
  if (existingUniversity) {
    return res.status(400).json({
      message: "University already exists, please use a different email",
    });
  }

  const university = await University.create({
    name,
    address,
    phone,
    email,
    location,
    description,
    website,
    establishedYear,
    logo,
  });

  res.status(201).json(university);
});

const getAllUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find()
    .select("-createdAt -updatedAt")
    .lean();

  if (!universities) {
    return res.status(404).json({
      message: "No universities found",
    });
  }

  res.status(200).json(universities);
});

const getUniversityById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const university = await University.findById(id)
    .select("-createdAt -updatedAt")
    .lean();

  if (!university) {
    return res.status(404).json({
      message: "University not found",
    });
  }

  res.status(200).json(university);
});

const getUniversitiesPage = asyncHandler(async (req, res) => {
  const { page = 1, limit = 40 } = req.query;

  const universities = await University.find()
    .select("-createdAt -updatedAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  if (!universities) {
    return res.status(404).json({
      message: "No universities found",
    });
  }

  res.status(200).json(universities);
});

const getStudentsPageOfUniversity = asyncHandler(async (req, res) => {
  const { universityId } = req.params;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 40, 1);

  const students = await Student.find({ universityId })
    .limit(limit)
    .skip((page - 1) * limit)
    .skip((page - 1) * limit)
    .lean();

  if (!students || students.length === 0) {
    return res.status(404).json({
      message: "No students found",
    });
  }

  res.status(200).json(students);
});

const getTeachersPageOfUniversity = asyncHandler(async (req, res) => {
  const { universityId } = req.params;
  const { page = 1, limit = 40 } = req.query;

  const university = await University.findById(universityId)
    .populate({
      path: "teachers",
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    })
    .select("teachers")
    .lean();

  if (!university || university.length === 0) {
    return res
      .status(404)
      .json({ message: "No teachers found", total: 0, teachers: [] });
  }

  res
    .status(200)
    .json({ total: result.teachers.length, teachers: result.teachers });
});

export {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  getUniversitiesPage,
  getStudentsPageOfUniversity,
  getTeachersPageOfUniversity,
};
