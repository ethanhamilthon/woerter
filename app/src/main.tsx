import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { AuthProvider } from "@/features/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { I8Provider } from "./features/international";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I8Provider>
        <RouterProvider router={router} />
      </I8Provider>
    </AuthProvider>
  </QueryClientProvider>
);
