import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from "./Register";
import memoryDatabase from "./MemoryDatabase";

const database = memoryDatabase();

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Alo mundo</h1>
    },
    {
        path: "/Register",
        element: <Register database={database} />,
    },
]);

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;