import type { ICourse } from "./ICourse";

export interface IVKM {
  _id?: string;
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
  course: ICourse;
}