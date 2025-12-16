import { ICoursesDomainService } from "../../domain/domain_services/ICourse.DomainService";
import { ICourse } from "../../domain/interfaces/ICourse";

export class CourseService {
    private readonly courseDao: ICoursesDomainService;

    constructor(courseDao: ICoursesDomainService) {
        this.courseDao = courseDao;
    }

    async getAll(): Promise<ICourse[]> {
        return await this.courseDao.getAll();
    }

    async getById(id: string): Promise<ICourse | null> {
        return await this.courseDao.getById(id);
    }
}