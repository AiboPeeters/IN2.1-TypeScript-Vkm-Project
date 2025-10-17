import { useEffect, useState } from "react";
import type { IVKM } from "../../domain/interfaces/IVkm";
import { getAllVkms } from "../../infrastructure/api/vkmApi";
import VkmFilter from "../components/VkmFilter";

export default function VkmPage() {
    const [vkms, setVkms] = useState<IVKM[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});

    useEffect(() => {
        getAllVkms()
            .then((data) => {
                setVkms(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Er ging iets mis bij het ophalen van VKM's");
                setLoading(false);
            });
    }, []);

    function handleFilterChange(newFilters: Record<string, string>) {
        setFilters(newFilters);
    }

    if (loading) return <p>VKM’s laden...</p>;
    if (error) return <p>{error}</p>;
    if (vkms.length === 0) return <p>Geen VKM’s gevonden.</p>;

    const filteredVkms = vkms.filter((vkm) => {
        if (filters.course && vkm.course?.name !== filters.course) return false;
        if (filters.location && vkm.location !== filters.location) return false;
        if (filters.level && vkm.level !== filters.level) return false;
        return true;
    });

    return (
        <div className="page page-vkms">
            <h1>VKM Overzicht</h1>

            <VkmFilter onFilterChange={handleFilterChange} />

            <div className="vkm-grid">
                {filteredVkms.map((vkm, index) => (
                    <div key={index} className="vkm-card">
                        <h2>{vkm.name}</h2>
                        <p>{vkm.shortdescription || "Geen beschrijving beschikbaar"}</p>

                        <div className="vkm-meta">
                            <span>{vkm.course?.name || "Onbekende opleiding"}</span>
                            <span>{vkm.location ? `${vkm.location}` : "?"}</span>
                        </div>

                        <button className="detail-btn">Bewerken</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
