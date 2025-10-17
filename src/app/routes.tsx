import type { RouteObject } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "../presentation/pages/HomePage";
import VkmPage from "../presentation/pages/VkmPage";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "vkms", element: <VkmPage /> },
        ],
    },
];
