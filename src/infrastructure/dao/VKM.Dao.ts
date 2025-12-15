import { IVKMsDomainService } from '../../domain/domain_services/IVKM.DomainService';
import { IVKM } from '../../domain/interfaces/IVKM';
import { VKM } from '../entities/VKM';

export class VKMDao implements IVKMsDomainService {
    async getAll(): Promise<IVKM[]> {
        return VKM.find().exec();
    }

    async getById(id: string): Promise<IVKM | null> {
        return VKM.findById(id).exec();
    }

    async create(vkm: IVKM): Promise<IVKM> {
        const entity = new VKM(vkm);
        return entity.save();
    }

    async update(id: string, vkm: IVKM): Promise<IVKM | null> {
        return VKM.findByIdAndUpdate(id, vkm, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await VKM.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}