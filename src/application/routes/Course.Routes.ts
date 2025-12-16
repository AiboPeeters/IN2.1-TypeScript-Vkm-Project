import { Router } from 'express';
import * as CourseController from '../../presentation/Course.Controller';

const router = Router();

// READ
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);

export default router;
