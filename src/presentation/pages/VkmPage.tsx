import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IVKM } from "../../domain/interfaces/IVkm";
import { getAllVkms } from "../../infrastructure/api/vkmApi";
import VkmFilter from "../components/VkmFilter";

export default function VkmPage() {
    const navigate = useNavigate();
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

    if (loading)
        return (
            <div className="alert alert-info text-center" role="alert">
                VKM’s worden geladen...
            </div>
        );

    if (error)
        return (
            <div className="alert alert-danger text-center" role="alert">
                {error}
            </div>
        );

    if (vkms.length === 0)
        return (
            <div className="alert alert-warning text-center" role="alert">
                Geen VKM's gevonden.
            </div>
        );

    const filteredVkms = vkms.filter((vkm) => {
        if (filters.course && vkm.course?.name !== filters.course) return false;
        if (filters.location && vkm.location !== filters.location) return false;
        if (filters.level && vkm.level !== filters.level) return false;
        if (filters.language && vkm.language !== filters.language) return false;
        if (filters.period && vkm.period !== filters.period) return false;

        if (filters.search && !vkm.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        return true;
    });

    return (
        <div className="page page-vkms">
            <h1>VKM Overzicht</h1>

            <div style={{ position: "relative", marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ minWidth: "400px", maxWidth: "800px", width: "100%" }}>
                        <VkmFilter onFilterChange={handleFilterChange} />
                    </div>
                </div>

                <button
                    className="detail-btn"
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "fit-content",
                    }}
                    onClick={() => navigate("/vkms/create")}
                >
                    Create VKM
                </button>
            </div>



            {filteredVkms.length === 0 ? (
                <div className="alert alert-warning text-center">Geen VKM's gevonden met de huidige filters.</div>
            ) : (
                <div className="vkm-grid">
                    {filteredVkms.map((vkm, index) => (
                        <div key={index} className="vkm-card">
                            <h2>{vkm.name}</h2>
                            <p>{vkm.shortdescription || "Geen beschrijving beschikbaar"}</p>

                            <div className="vkm-meta">
                                <span>{vkm.course?.name || "Onbekende opleiding"}</span>
                                <span>{vkm.location ? vkm.location : "?"}</span>
                            </div>

                            <button
                                className="detail-btn"
                                onClick={() => navigate(`/vkms/${vkm._id}/edit`)}
                            >
                                Bewerken
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}