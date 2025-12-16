import { IVKM } from '../../domain/interfaces/IVKM';
import { IVKMsDomainService } from '../../domain/domain_services/IVKM.DomainService';

export class VKMService {
    private readonly vkmDao: IVKMsDomainService;

    constructor(vkmDao: IVKMsDomainService) {
        this.vkmDao = vkmDao;
    }

    async getAllVKMs(): Promise<IVKM[]> {
        return await this.vkmDao.getAll();
    }

    async getVKMById(id: string): Promise<IVKM | null> {
        return await this.vkmDao.getById(id);
    }

    async createVKM(data: IVKM): Promise<IVKM> {
        if (!data.course || !data.course._id) {
            throw new Error("Invalid input: The complete 'course' object is missing.");
        }

        return await this.vkmDao.create(data); 
    }

    async updateVKM(id: string, data: IVKM): Promise<IVKM | null> {
        return await this.vkmDao.update(id, data);
    }

    async deleteVKM(id: string): Promise<boolean> { 
        return await this.vkmDao.delete(id);
    }
}