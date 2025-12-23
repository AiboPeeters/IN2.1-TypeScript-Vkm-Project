const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function apiGet(endpoint: string) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("API GET:", url);

    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text();
        console.error("API GET Error:", response.status, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API GET data:", data);
    return data;
}

export async function apiPost(endpoint: string, body: any) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("API POST:", url, body);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API POST Error:", response.status, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API POST data:", data);
    return data;
}

export async function apiPut(endpoint: string, body: any) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("API PUT:", url, body);

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API PUT Error:", response.status, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API PUT data:", data);
    return data;
}

export async function apiDelete(endpoint: string) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("API DELETE:", url);

    const response = await fetch(url, { method: "DELETE" });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API DELETE Error:", response.status, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        console.log("API DELETE succesvol, geen content");
        return null;
    }

    const data = await response.json();
    console.log("API DELETE data:", data);
    return data;
}

