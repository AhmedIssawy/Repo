import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  next();
};

const validateStudentId = (req, res, next) => {
  const { studentId } = req.params;
  if (!studentId || studentId.length < 5) {
    return res.status(400).json({
      message: "Invalid student ID format",
    });
  }
  next();
};

const validateUniversityId = (req, res, next) => {
  const { universityId } = req.params;
  if (!universityId || universityId.length < 5) {
    return res.status(400).json({
      message: "Invalid university ID format",
    });
  }
  next();
};

const validateStudentLoginData = (req, res, next) => {
  const { studentId, password } = req.body;
  if (studentId || !password) {
    return res.status(400).json({
      message: "studentId and password are required",
    });
  }
  next();
};

const validateStudentUpdateData = (req, res, next) => {
  const { name, password, phone, role } = req.body;

  if (!name && !password && !phone && !role) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  next();
};

const validateDateParameter = (req, res, next) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ error: "Missing date parameter" });
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    return res.status(400).json({
      error: "Invalid date format please ree write it unsing YYYY-MM-DD",
    });
  }

  next();
};

export {
  validateObjectId,
  validateStudentId,
  validateStudentLoginData,
  validateUniversityId,
  validateStudentUpdateData,
  validateDateParameter,
};
