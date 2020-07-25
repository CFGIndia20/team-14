import { Students } from '../../model/studentProfile';
import { successResponse, errorResponse } from '../../helpers';

export const registration = async (req, res) => {
  try {
    const studentProfile = await Students.find();
    return successResponse(req, res, { studentProfile });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};