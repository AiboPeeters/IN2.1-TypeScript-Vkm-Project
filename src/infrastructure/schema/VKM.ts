import { Schema, model } from "mongoose";
import { IVKM } from "../../domain/interfaces/IVKM";

// Sub-schema for the embedded Course document

const CourseSubSchema = new Schema({
    _id: { type: String, required: true }, 
    name: { type: String, required: true },
    description: { type: String },
    durationYears: { type: Number },
    location: { type: String },
}, { 
    _id: false 
});

const VKMMongooseSchema = new Schema<IVKM>({
    name: { type: String, required: true },
    shortdescription: { type: String },
    description: { type: String },
    content: { type: String },
    studycredit: { type: Number },
    location: { type: String },
    level: { type: String },
    learningoutcomes: { type: String },
    module_tags: { type: String },
    available_spots: { type: Number },
    start_date: { type: Date },
    language: { type: String },
    period: { type: String },

    course: { 
        type: CourseSubSchema, 
        required: true 
    }
    
}, { collection: "VKM", versionKey: false });

export const VKM = model<IVKM>("VKM", VKMMongooseSchema);
