import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/features/home";
import { CreateWordPage } from "@/features/create_card";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreateWordPage />,
  },
]);
