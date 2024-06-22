import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Items from "./pages/Items/Items";
import Settings from "./pages/Settings/Settings";
import Members from "./pages/Members/Members";
import SignIn from "./pages/SignIn/SignIn";
import AddAdmin from "./pages/AddAdmin/AddAdmin";
import EditMember from "./pages/EditMember/EditMember";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/items",
        element: <Items />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/addadmin",
        element: <AddAdmin />,
      },
      {
        path: "/editmember/:id",
        element: <EditMember />,
      },
    ],
  },
]);

const signinRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "*", element: <SignIn /> },
    ],
  },
]);

function App() {
  const { currentAdmin } = useSelector((state: any) => state.admin);

  return (
    <div className="App">
      <RouterProvider router={currentAdmin ? router : signinRouter} />
    </div>
  );
}

export default App;
