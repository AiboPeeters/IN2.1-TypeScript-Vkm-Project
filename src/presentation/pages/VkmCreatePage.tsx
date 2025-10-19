import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import type { IVKMCreate } from "../../domain/interfaces/IVkmCreate";
import type { ICourse } from "../../domain/interfaces/ICourse";
import { getAllCourses } from "../../infrastructure/api/courseApi";
import { createVkm } from "../../infrastructure/api/vkmApi";

export default function VkmCreatePage() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState<ICourse[]>([]);
    const [form, setForm] = useState<any>({
        name: "",
        shortdescription: "",
        description: "",
        content: "",
        studycredit: "",
        location: "",
        level: "",
        learningoutcomes: "",
        module_tags: "",
        available_spots: "",
        start_date: "",
        courseName: "",
        language: "",
        period: "",
    });
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllCourses()
            .then(setCourses)
            .catch((err) => {
                console.error("Fout bij ophalen courses:", err);
                setError("Kon opleidingen niet laden");
            })
            .finally(() => setLoading(false));
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
        setValidationErrors((prev) => ({ ...prev, [name]: "" })); // veld-fout resetten
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // 🔍 Basis frontend validatie
        const errors: { [key: string]: string } = {};
        if (!form.name) errors.name = "Naam is verplicht";
        if (!form.shortdescription) errors.shortdescription = "Korte beschrijving is verplicht";
        if (!form.description) errors.description = "Beschrijving is verplicht";
        if (!form.content) errors.content = "Content is verplicht";
        if (!form.studycredit || Number(form.studycredit) <= 0) errors.studycredit = "Studiepunten moeten > 0 zijn";
        if (!form.location) errors.location = "Selecteer een locatie";
        if (!form.level) errors.level = "Selecteer een niveau";
        if (!form.language) errors.language = "Selecteer een taal";
        if (!form.period) errors.period = "Selecteer een periode";
        if (!form.learningoutcomes) errors.learningoutcomes = "Leerdoelen zijn verplicht";
        if (!form.module_tags) errors.module_tags = "Module tags zijn verplicht";
        if (!form.available_spots || Number(form.available_spots) < 0)
            errors.available_spots = "Beschikbare plekken moeten 0 of meer zijn";
        if (!form.start_date) errors.start_date = "Startdatum is verplicht";
        if (!form.courseName) errors.courseName = "Selecteer een opleiding";

        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const selectedCourse = courses.find((c) => c.name === form.courseName);
        if (!selectedCourse) {
            setError("Selecteer een geldige opleiding");
            return;
        }

        const newVkm: IVKMCreate = {
            name: form.name,
            shortdescription: form.shortdescription,
            description: form.description,
            content: form.content,
            studycredit: Number(form.studycredit),
            location: form.location,
            level: form.level,
            learningoutcomes: form.learningoutcomes,
            module_tags: form.module_tags,
            available_spots: Number(form.available_spots),
            start_date: form.start_date ? new Date(form.start_date) : undefined,
            language: form.language,
            period: form.period,
            course: selectedCourse,
        };

        try {
            await createVkm(newVkm);
            navigate("/vkms");
        } catch (err) {
            console.error(err);
            setError("Kon VKM niet aanmaken");
        }
    }

    if (loading) return <Spinner animation="border" />;

    return (
        <div className="page page-vkms">
            <h1 className="mb-4">Nieuwe VKM Aanmaken</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form noValidate onSubmit={handleSubmit} className="filter-card vkm-filter">
                <Form.Group className="mb-3">
                    <Form.Label>Naam</Form.Label>
                    <Form.Control
                        className="filter-inputfield"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Korte beschrijving</Form.Label>
                    <Form.Control
                        className="filter-inputfield"
                        type="text"
                        name="shortdescription"
                        value={form.shortdescription}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.shortdescription}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.shortdescription}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Beschrijving</Form.Label>
                    <Form.Control
                        as="textarea"
                        className="filter-inputfield"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.description}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        className="filter-inputfield"
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.content}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.content}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Studiepunten</Form.Label>
                    <Form.Control
                        className="filter-inputfield"
                        type="number"
                        name="studycredit"
                        value={form.studycredit}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.studycredit}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.studycredit}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Locatie</Form.Label>
                    <Form.Select
                        className="filter-inputfield"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.location}
                    >
                        <option value="">Selecteer een locatie</option>
                        <option value="Breda">Breda</option>
                        <option value="Den Bosch">Den Bosch</option>
                        <option value="Tilburg">Tilburg</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{validationErrors.location}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Opleiding</Form.Label>
                    <Form.Select
                        className="filter-inputfield"
                        name="courseName"
                        value={form.courseName}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.courseName}
                    >
                        <option value="">Selecteer een opleiding</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{validationErrors.courseName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Niveau</Form.Label>
                    <Form.Select
                        className="filter-inputfield"
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.level}
                    >
                        <option value="">Selecteer niveau</option>
                        <option value="NLQF5">NLQF5</option>
                        <option value="NLQF6">NLQF6</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{validationErrors.level}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Taal</Form.Label>
                    <Form.Select
                        className="filter-inputfield"
                        name="language"
                        value={form.language}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.language}
                    >
                        <option value="">Selecteer Taal</option>
                        <option value="Nederlands">Nederlands</option>
                        <option value="Engels">Engels</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{validationErrors.language}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Periode</Form.Label>
                    <Form.Select
                        className="filter-inputfield"
                        name="period"
                        value={form.period}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.period}
                    >
                        <option value="">Selecteer periode</option>
                        <option value="Periode 1">Periode 1</option>
                        <option value="Periode 2">Periode 2</option>
                        <option value="Periode 3">Periode 3</option>
                        <option value="Periode 4">Periode 4</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{validationErrors.period}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Leerdoelen</Form.Label>
                    <Form.Control
                        as="textarea"
                        className="filter-inputfield"
                        name="learningoutcomes"
                        value={form.learningoutcomes}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.learningoutcomes}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.learningoutcomes}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Module tags</Form.Label>
                    <Form.Control
                        className="filter-inputfield"
                        type="text"
                        name="module_tags"
                        value={form.module_tags}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.module_tags}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.module_tags}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Beschikbare plekken</Form.Label>
                    <Form.Control
                        className="filter-inputfield"
                        type="number"
                        name="available_spots"
                        value={form.available_spots}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.available_spots}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.available_spots}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Startdatum</Form.Label>
                    <Form.Control
                        className="filter-inputfield"
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.start_date}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.start_date}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="detail-btn">
                    Aanmaken
                </Button>
            </Form>
        </div>
    );
}
