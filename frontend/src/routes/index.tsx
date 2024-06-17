import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/features/home";
import { CreateWordPage } from "@/features/create_card";
import { WordPage } from "@/features/word";
import { EditPage } from "@/features/edit_card";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreateWordPage />,
  },
  {
    path: "/dic/:id",
    element: <WordPage />,
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
  },
]);
