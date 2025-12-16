import { Request, Response, NextFunction } from 'express';
import { VKMService } from '../application/services/VKM.Service';
import { VKMDao } from '../infrastructure/dao/VKM.Dao'; 

const vkmDao = new VKMDao();

const vkmService = new VKMService(vkmDao);

export const getAllVKMs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const vkms = await vkmService.getAllVKMs(); 

        if (!vkms || vkms.length === 0) {
            res.status(404).json({ message: 'No VKMs found' }); // 404 JSON message if no VKMs found
            return;
        }

        res.json(vkms); // Respond with JSON array of VKMs
    } catch (error) {
        next(error); // Pass error to Express error handler
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
            res.status(404).json({ message: 'VKM not found' }); // 404 JSON message if VKM not found
            return;
        }

        res.json(vkm);
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

export const createVKM = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newVKM = await vkmService.createVKM(req.body);
        res.status(201).json(newVKM); // 201 JSON message for created VKM
    } catch (error) {
        next(error); // Pass error to Express error handler
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
            res.status(404).json({ message: 'No VKM found to update' }); // 404 JSON message if VKM to update is not found
            return;
        }

        res.json(updatedVKM);
    } catch (error) {
        next(error); // Pass error to Express error handler
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
            res.status(404).json({ message: 'No VKM found to delete' }); // 404 JSOSN message if VKM to delete is not found
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};