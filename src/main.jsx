import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/utils/Store.js";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

// Lazy-loaded components
const Home = lazy(() => import("./components/Home.jsx"));
const VideoView = lazy(() => import("./components/VideoView.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const SignUp = lazy(() => import("./components/SignUp.jsx"));
const ChannelDetail = lazy(() => import("./components/ChannelDetail.jsx"));
const SearchVideos = lazy(() => import("./components/SearchVideos.jsx"));
const UserAccount = lazy(() => import("./components/UserAccount.jsx"));
const CreateChannel = lazy(() => import("./components/CreateChannel.jsx"));
const UpdateVideoForm = lazy(() => import("./components/UpdateVideoForm.jsx"));
const UploadVideo = lazy(() => import("./components/UploadVideo.jsx"));
const UpdateChannel = lazy(() => import("./components/UpdateChannel.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
      { path: "/logIn", element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
      { path: "/signup", element: <Suspense fallback={<div>Loading...</div>}><SignUp /></Suspense> },
      { path: "/video/:id", element: <Suspense fallback={<div>Loading...</div>}><VideoView /></Suspense> },
      { path: "/channel/:id", element: <Suspense fallback={<div>Loading...</div>}><ChannelDetail /></Suspense> },
      { path: "/search/:searchItem", element: <Suspense fallback={<div>Loading...</div>}><SearchVideos /></Suspense> },
      { path: "/userAccount", element: <Suspense fallback={<div>Loading...</div>}><UserAccount /></Suspense> },
      { path: "/createChannel", element: <Suspense fallback={<div>Loading...</div>}><CreateChannel /></Suspense> },
      { path: "/updateVideo/:id", element: <Suspense fallback={<div>Loading...</div>}><UpdateVideoForm /></Suspense> },
      { path: "/uploadVideo", element: <Suspense fallback={<div>Loading...</div>}><UploadVideo /></Suspense> },
      { path: "/updateChannel", element: <Suspense fallback={<div>Loading...</div>}><UpdateChannel /></Suspense> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
