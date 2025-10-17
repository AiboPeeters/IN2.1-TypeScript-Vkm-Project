const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function apiGet(endpoint: string) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("API GET:", url);
    const response = await fetch(url);
    console.log("Response status:", response.status);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("API data:", data);
    return data;
}
