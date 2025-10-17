import type { RouteObject } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "../presentation/pages/HomePage";
import VkmPage from "../presentation/pages/VkmPage";
import VkmEditPage from "../presentation/pages/VkmEditPage";
import VkmCreatePage from "../presentation/pages/VkmCreatePage";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "vkms", element: <VkmPage /> },
            { path: "vkms/:id/edit", element: <VkmEditPage /> },
            { path: "vkms/create", element: <VkmCreatePage /> },
        ],
    },
];
