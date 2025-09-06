// src/App.tsx（修改后）
import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="app bg-body text-heading-2 min-h-screen">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;