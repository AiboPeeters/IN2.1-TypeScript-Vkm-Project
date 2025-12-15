import { Request, Response, NextFunction } from 'express';
import { VKMService } from '../application/services/VKM.Service';
import { CourseDao } from '../infrastructure/dao/Course.Dao';
import { VKMDao } from '../infrastructure/dao/VKM.Dao'; 

const vkmDao = new VKMDao();
const courseDao = new CourseDao();

const vkmService = new VKMService(vkmDao, courseDao);

export const getAllVKMs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const vkms = await vkmService.getAllVKMs(); 
        res.json(vkms);
    } catch (error) {
        next(error);
    }
};

export const getVKMById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const vkm = await vkmService.getVKMById(req.params.id);

        if (!vkm) {
            res.status(404).json({ message: 'VKM niet gevonden' });
            return;
        }

        res.json(vkm);
    } catch (error) {
        next(error);
    }
};

export const createVKM = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newVKM = await vkmService.createVKM(req.body);
        res.status(201).json(newVKM);
    } catch (error) {
        next(error);
    }
};

export const updateVKM = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedVKM = await vkmService.updateVKM(req.params.id, req.body);

        if (!updatedVKM) {
            res.status(404).json({ message: 'VKM niet gevonden' });
            return;
        }

        res.json(updatedVKM);
    } catch (error) {
        next(error);
    }
};

export const deleteVKM = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await vkmService.deleteVKM(req.params.id); 

        if (!deleted) {
            res.status(404).json({ message: 'VKM niet gevonden' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};