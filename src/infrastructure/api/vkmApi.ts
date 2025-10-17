import { apiGet } from "./apiClient";

export async function getAllVkms() {
    console.log("Fetching VKMs...");
    try {
        const data = await apiGet("/vkms");
        console.log("VKMs ontvangen:", data);
        return data;
    } catch (err) {
        console.error("Fout bij ophalen VKMs:", err);
        throw err;
    }
}
