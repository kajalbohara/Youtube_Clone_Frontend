import React ,{ StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";  // ✅ Import Redux Provider
import store from "./components/utils/Store.js";  // ✅ Import Redux store
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import VideoView from "./components/VideoView.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import ChannelDetail from "./components/ChannelDetail.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import SearchVideos from "./components/SearchVideos.jsx";
import UserAccount from "./components/UserAccount.jsx";
import CreateChannel from "./components/CreateChannel.jsx";
import UpdateVideoForm from "./components/UpdateVideoForm.jsx";
import UploadVideo from "./components/UploadVideo.jsx";
import UpdateChannel from "./components/UpdateChannel.jsx";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/logIn", element: <Login /> },
     { path: "/signup", element: <SignUp /> },

      { path: "/video/:id", element: <VideoView /> },
      { path: "/channel/:id", element: <ChannelDetail /> },
      { path: "/search/:searchItem", element: <SearchVideos /> },
      { path: "/userAccount", element: <UserAccount /> },
      { path: "/createChannel", element: <CreateChannel /> },
      { path: "/updateVideo/:id", element: <UpdateVideoForm /> },
      { path: "/uploadVideo", element: <UploadVideo /> },
      { path: "/updateChannel", element: <UpdateChannel /> },


    

      
    ]
    
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> 
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);

