import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Index";
import DashboardIndex from "./pages/Dashboard/Home";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Index from "./pages/Dashboard/Index";
import Account from "./pages/Dashboard/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/dashboard",
        element: <Index />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardIndex />,
          },
          {
            path: "/dashboard/account",
            element: <Account />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
