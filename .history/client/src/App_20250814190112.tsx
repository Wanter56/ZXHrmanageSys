import { RouterProvider } from "react-router";
import { router } from "./router";

function App() {
  return (
    <div className="app dark">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
