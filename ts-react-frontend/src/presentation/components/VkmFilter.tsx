import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../infrastructure/api/courseApi";

interface VkmFilterProps {
    onFilterChange: (filters: Record<string, string>) => void;
}

export default function VkmFilter({ onFilterChange }: VkmFilterProps) {
    const [studies, setCourses] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        course: "",
        location: "",
        period: "",
        language: "",
        level: "",
        search: "",
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getAllCourses().then(setCourses).catch(console.error);
    }, []);

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className="filter-card">
            <div className="filter-header" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                    className="filter-toggle"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? "Filters verbergen" : "Filters tonen"}
                </button>

                <input
                    className="filter-inputfield"
                    type="text"
                    name="search"
                    placeholder="Zoeken..."
                    value={filters.search}
                    onChange={handleChange}
                />
            </div>

            {open && (
                <div className="vkm-filter" style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                    <select name="course" value={filters.course} onChange={handleChange}>
                        <option value="">Alle studies</option>
                        {studies.map((s) => (
                            <option key={s._id} value={s.name}>
                                {s.name}
                            </option>
                        ))}
                    </select>

                    <select name="location" value={filters.location} onChange={handleChange}>
                        <option value="">Alle locaties</option>
                        <option value="Breda">Breda</option>
                        <option value="Tilburg">Tilburg</option>
                        <option value="Den Bosch">Den Bosch</option>
                    </select>

                    <select name="period" value={filters.period} onChange={handleChange}>
                        <option value="">Alle periodes</option>
                        <option value="Periode 1">Periode 1</option>
                        <option value="Periode 2">Periode 2</option>
                        <option value="Periode 3">Periode 3</option>
                        <option value="Periode 4">Periode 4</option>
                    </select>

                    <select name="language" value={filters.language} onChange={handleChange}>
                        <option value="">Alle talen</option>
                        <option value="Nederlands">Nederlands</option>
                        <option value="Engels">Engels</option>
                    </select>

                    <select name="level" value={filters.level} onChange={handleChange}>
                        <option value="">Alle niveaus</option>
                        <option value="NLQF5">NLQF5</option>
                        <option value="NLQF6">NLQF6</option>
                    </select>
                </div>
            )}
        </div>
    );
}
