import { Students } from '../../model/studentProfile';
import { Admins } from '../../model/admin';
import { Teachers } from '../../model/teacher';
import { successResponse, errorResponse } from '../../helpers';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const studentProfile = await Students.findOne({ email: username }).exec();
    if (!studentProfile) {
      return errorResponse(req, res, 'Wrong Username', 400);
    }
    if (studentProfile.password !== password) {
      return errorResponse(req, res, 'Wrong Password', 400);
    }
    return successResponse(req, res, { studentProfile });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { username, password,dob,dateOfJoining,qualification,gradYear,phone,email,password,experience,quizLink,apptScore,skillScore,avgTestScore,poll_engagement,poll_Total,present,attendance } = req.body
    const student = new Students({ email: username, password,dob,dateOfJoining,qualification,gradYear,phone,email,password,experience,quizLink,apptScore,skillScore,avgTestScore,poll_engagement,poll_Total,present,attendance });
    const data = await student.save();
    return successResponse(req, res, { data });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};