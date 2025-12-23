import { IVKM } from '../interfaces/IVKM';

export interface IVKMsDomainService {
    getAll(): Promise<IVKM[]>;
    getById(id: string): Promise<IVKM | null>;
    create(vkm: IVKM): Promise<IVKM>;
    update(id: string, vkm: IVKM): Promise<IVKM | null>;
    delete(id: string): Promise<boolean>;
}
