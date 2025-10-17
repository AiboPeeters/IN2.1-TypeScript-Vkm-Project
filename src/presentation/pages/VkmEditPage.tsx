import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { IVKM } from "../../domain/interfaces/IVkm";
import type { ICourse } from "../../domain/interfaces/ICourse";
import { getVkmById, updateVkm, deleteVkm } from "../../infrastructure/api/vkmApi";
import { getAllCourses } from "../../infrastructure/api/courseApi";

export default function VkmEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [vkm, setVkm] = useState<IVKM | null>(null);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [form, setForm] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        getVkmById(id)
            .then((data) => {
                setVkm(data);
                setForm({
                    ...data,
                    courseName: data.course?.name || "",
                    level: data.level || "",
                    language: data.language || "NL",
                    period: data.period || "",
                    start_date: data.start_date ? new Date(data.start_date).toISOString().split("T")[0] : "",
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("VKM kon niet geladen worden");
                setLoading(false);
            });

        getAllCourses()
            .then(setCourses)
            .catch((err) => console.error("Fout bij ophalen courses:", err));
    }, [id]);

    async function handleDelete() {
        if (!vkm) return;
        const confirm1 = window.confirm("Weet je zeker dat je deze VKM wilt verwijderen?");
        if (!confirm1) return;
        const confirm2 = window.confirm("Dit kan niet ongedaan gemaakt worden. Wil je doorgaan?");
        if (!confirm2) return;

        try {
            await deleteVkm(vkm._id);
            navigate("/vkms", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Kon VKM niet verwijderen");
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!vkm) return;

        const selectedCourse = courses.find(c => c.name === form.courseName);
        if (!selectedCourse) {
            setError("Selecteer een geldige opleiding");
            return;
        }

        const updatedVkm: IVKM = {
            ...vkm,
            name: form.name,
            shortdescription: form.shortdescription,
            description: form.description,
            content: form.content,
            studycredit: Number(form.studycredit) || undefined,
            location: form.location,
            level: form.level,
            language: form.language,
            period: form.period,
            learningoutcomes: form.learningoutcomes,
            module_tags: form.module_tags,
            available_spots: Number(form.available_spots) || undefined,
            start_date: form.start_date ? new Date(form.start_date) : undefined,
            course: selectedCourse,
        };

        try {
            await updateVkm(vkm._id, updatedVkm);
            navigate("/vkms");
        } catch (err) {
            console.error(err);
            setError("Kon VKM niet opslaan");
        }
    }

    if (loading) return <p>VKM laden...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="page page-vkms">
            <h1>VKM Bewerken</h1>
            <form onSubmit={handleSubmit} className="filter-card vkm-filter">
                <label>
                    Naam:
                    <input className="filter-inputfield" type="text" name="name" value={form.name || ""} onChange={handleChange} />
                </label>

                <label>
                    Korte beschrijving:
                    <input className="filter-inputfield" type="text" name="shortdescription" value={form.shortdescription || ""} onChange={handleChange} />
                </label>

                <label>
                    Beschrijving:
                    <textarea className="filter-inputfield" name="description" value={form.description || ""} onChange={handleChange} />
                </label>

                <label>
                    Content:
                    <textarea className="filter-inputfield" name="content" value={form.content || ""} onChange={handleChange} />
                </label>

                <label>
                    Studiepunten:
                    <input className="filter-inputfield" type="number" name="studycredit" value={form.studycredit || ""} onChange={handleChange} />
                </label>

                <label>
                    Locatie:
                    <select name="location" value={form.location || ""} onChange={handleChange}>
                        <option value="">Selecteer een locatie</option>
                        <option value="Breda">Breda</option>
                        <option value="Den Bosch">Den Bosch</option>
                        <option value="Tilburg">Tilburg</option>
                    </select>
                </label>

                <label>
                    Opleiding:
                    <select name="courseName" value={form.courseName || ""} onChange={handleChange}>
                        <option value="">Selecteer een opleiding</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Niveau:
                    <select name="level" value={form.level || ""} onChange={handleChange}>
                        <option value="">Selecteer niveau</option>
                        <option value="NLQF5">NLQF5</option>
                        <option value="NLQF6">NLQF6</option>
                    </select>
                </label>

                <label>
                    Leerdoelen:
                    <textarea className="filter-inputfield" name="learningoutcomes" value={form.learningoutcomes || ""} onChange={handleChange} />
                </label>

                <label>
                    Module tags:
                    <input className="filter-inputfield" type="text" name="module_tags" value={form.module_tags || ""} onChange={handleChange} />
                </label>

                <label>
                    Beschikbare plekken:
                    <input className="filter-inputfield" type="number" name="available_spots" value={form.available_spots || ""} onChange={handleChange} />
                </label>

                <label>
                    Startdatum:
                    <input className="filter-inputfield" type="date" name="start_date" value={form.start_date || ""} onChange={handleChange} />
                </label>

                <label>
                    Taal:
                    <select name="language" value={form.language || "NL"} onChange={handleChange}>
                        <option value="Nederlands">Nederlands</option>
                        <option value="Engels">Engels</option>
                    </select>
                </label>

                <label>
                    Periode:
                    <select name="period" value={form.period || ""} onChange={handleChange}>
                        <option value="">Selecteer periode</option>
                        <option value="Periode 1">Periode 1</option>
                        <option value="Periode 2">Periode 2</option>
                        <option value="Periode 3">Periode 3</option>
                        <option value="Periode 4">Periode 4</option>
                    </select>
                </label>

                <button type="submit" className="detail-btn">Opslaan</button>
                <button type="button" className="filter-toggle" style={{ backgroundColor: "#ff4d4f", marginTop: "1rem" }} onClick={handleDelete}>
                    Verwijderen
                </button>
            </form>
        </div>
    );
}
