export interface IVKM {
    name: string;
    shortdescription?: string;
    description?: string;
    content?: string;
    studycredit?: number;
    location?: string;
    contact_id?: number;
    level?: string;
    learningoutcomes?: string;
    module_tags?: string;
    available_spots?: number;
    start_date?: Date;
    course: {
        _id: string;
        name: string;
        description?: string;
        durationYears?: number;
        location?: string;
    };
}
