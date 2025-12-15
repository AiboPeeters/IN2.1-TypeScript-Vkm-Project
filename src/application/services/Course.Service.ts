import { ICoursesDomainService } from "../../domain/domain_services/ICourse.DomainService";
import { ICourse } from "../../domain/interfaces/ICourse";

export class CourseService {
    private readonly dao: ICoursesDomainService;

    constructor(dao: ICoursesDomainService) {
        this.dao = dao;
    }

    async getAll(): Promise<ICourse[]> {
        return await this.dao.getAll();
    }

    async getById(id: string): Promise<ICourse | null> {
        return await this.dao.getById(id);
    }
}