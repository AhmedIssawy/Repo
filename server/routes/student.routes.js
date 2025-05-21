import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentsPage,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentRegistrationCountByDate,
} from "../controllers/student.controller.js";

// Validators
import {
  validateObjectId,
  validateStudentId,
  validateStudentUpdateData,
  validateUniversityId,
  validateDateParameter,
} from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/").get(getStudentsPage);
router.route("/:universityId").post(validateUniversityId, createStudent);

router.route("/all").get(getAllStudents);

router
  .route("/registered/count/:date")
  .get(validateDateParameter, getStudentRegistrationCountByDate);

router
  .route("/:id")
  .get(validateObjectId, getStudentById)
  .patch(validateObjectId, validateStudentUpdateData, updateStudent)
  .delete(deleteStudent);

export default router;
