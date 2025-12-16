import { ICoursesDomainService } from '../../domain/domain_services/ICourse.DomainService';
import { ICourse } from '../../domain/interfaces/ICourse';
import { Course } from '../schema/Course';

export class CourseDao implements ICoursesDomainService {
    async getAll(): Promise<ICourse[]> {
        return Course.find().exec();
    }

    async getById(id: string): Promise<ICourse | null> {
        return Course.findById(id).exec();
    }
}
