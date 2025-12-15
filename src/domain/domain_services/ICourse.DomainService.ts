import { ICourse } from '../interfaces/ICourse';

export interface ICoursesDomainService {
    getAll(): Promise<ICourse[]>;
    getById(id: string): Promise<ICourse | null>;
}