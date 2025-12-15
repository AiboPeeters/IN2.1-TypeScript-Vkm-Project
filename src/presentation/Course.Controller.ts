import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../application/services/Course.Service';
import { CourseDao } from '../infrastructure/dao/Course.Dao';

const courseDao = new CourseDao();

const courseService = new CourseService(courseDao);

export const getAllCourses = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const courses = await courseService.getAll();
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

export const getCourseById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const course = await courseService.getById(req.params.id);

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        res.json(course);
    } catch (error) {
        next(error);
    }
};