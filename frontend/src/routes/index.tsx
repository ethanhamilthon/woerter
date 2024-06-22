import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/features/home";
import { CreateWordPage } from "@/features/create_card";
import { WordPage } from "@/features/word";
import { EditPage } from "@/features/edit_card";
import { Onboarding } from "@/features/onboarding";
import { AskPage } from "@/features/ask";
import { Landing } from "@/features/landing";
import { GoPlayPage, PlayPage } from "@/features/play";
import { ProfilePage } from "@/features/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/app",
    element: <Home />,
  },
  {
    path: "/play",
    element: <PlayPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/goplay",
    element: <GoPlayPage />,
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
