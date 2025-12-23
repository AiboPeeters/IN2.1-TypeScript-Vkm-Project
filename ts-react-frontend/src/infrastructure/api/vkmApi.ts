import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient"; // veronderstel dat je deze helpers hebt

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

export async function getVkmById(id: string) {
    console.log(`Fetching VKM ${id}...`);
    try {
        const data = await apiGet(`/vkms/${id}`);
        console.log("VKM ontvangen:", data);
        return data;
    } catch (err) {
        console.error(`Fout bij ophalen VKM ${id}:`, err);
        throw err;
    }
}

export async function createVkm(vkm: any) {
    console.log("Aanmaken VKM...", vkm);
    try {
        const data = await apiPost("/vkms", vkm);
        console.log("VKM aangemaakt:", data);
        return data;
    } catch (err) {
        console.error("Fout bij aanmaken VKM:", err);
        throw err;
    }
}

export async function updateVkm(id: string, vkm: any) {
    console.log(`Updaten VKM ${id}...`, vkm);
    try {
        const data = await apiPut(`/vkms/${id}`, vkm);
        console.log("VKM geüpdatet:", data);
        return data;
    } catch (err) {
        console.error(`Fout bij updaten VKM ${id}:`, err);
        throw err;
    }
}

export async function deleteVkm(id: string) {
    console.log(`Verwijderen VKM ${id}...`);
    try {
        const data = await apiDelete(`/vkms/${id}`);
        console.log("VKM verwijderd:", data);
        return data;
    } catch (err) {
        console.error(`Fout bij verwijderen VKM ${id}:`, err);
        throw err;
    }
}
