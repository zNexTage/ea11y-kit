import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RegisterOrEdit from "./RegisterOrEdit";
import memoryDatabase from "./MemoryDatabase";
import List from "./List";

const database = memoryDatabase();

const router = createBrowserRouter([
    {
        path: "/",
        element: <List database={database} />
    },
    {
        path: "/Register",
        element: <RegisterOrEdit database={database} />,
    },
    {
        path: "/Edit/:albumId",
        element: <RegisterOrEdit database={database} />,
    },
]);

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;