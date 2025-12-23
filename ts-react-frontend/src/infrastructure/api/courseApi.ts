import { apiGet } from "./apiClient";

export async function getAllCourses() {
    return await apiGet("/courses");
}
