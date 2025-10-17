export interface IVKMCreate {
    name: string;
    shortdescription?: string;
    description?: string;
    content?: string;
    studycredit?: number;
    location?: string;
    level?: string;
    learningoutcomes?: string;
    module_tags?: string;
    available_spots?: number;
    start_date?: Date;
    language: string;
    period: string;
    course: {
        _id: string;
        name: string;
        description?: string;
        durationYears?: number;
        location?: string;
    };
}
