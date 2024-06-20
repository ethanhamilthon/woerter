import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/features/home";
import { CreateWordPage } from "@/features/create_card";
import { WordPage } from "@/features/word";
import { EditPage } from "@/features/edit_card";
import { Onboarding } from "@/features/onboarding";
import { AskPage } from "@/features/ask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create/:lang",
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
  {
    path: "/onboard",
    element: <Onboarding />,
  },
  {
    path: "/ask/:lang",
    element: <AskPage />,
  },
]);
