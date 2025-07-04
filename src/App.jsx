import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import UploadPageDetails from "./pages/UploadPageDetails.jsx";
import HomePage from "./pages/HomePage.jsx";
import AnnotatePage from "./pages/AnnotatePage.jsx";
import VoiPage from "./pages/VoiPage.jsx";
import TrainPage from "./pages/TrainPage.jsx";
import ModelsHistoryPage from "./pages/ModelsHistoryPage.jsx";
import ModelReportPage from "./pages/ModelReportPage.jsx";
import ValidateModal from "./pages/ValidateModal.jsx";
import ValidateModalAnnotation from "./pages/ValidateModalAnnotationPage.jsx";
import ModelsRegistry from "./pages/ModelsRegistry.jsx";
import ModelsRegistryListPage from "./pages/ModelsRegistryListPage.jsx";
import PostModelSelectionPage from "./pages/PostModelSelectionPage.jsx";
import { Toaster } from "sonner";
import ValidModelReport from "./pages/ValidModelReport.jsx";
import AnnotationReviewPage from "./pages/AnnotationReviewPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "uploadpage",
          element: <UploadPage />,
        },
        {
          path: "uploadpagedetails",
          element: <UploadPageDetails />,
        },
        {
          path: "voi",
          element: <VoiPage />,
        },
        { path: "modelshistory", element: <ModelsHistoryPage /> },
        {
          path: "modelsreport/:model_id?/:project_name?",
          element: <ModelReportPage />,
        },
        { path: "validatemodel", element: <ValidateModal /> },
        { path: "validationannotation", element: <ValidateModalAnnotation /> },
        { path: "validmodelreport", element: <ValidModelReport /> },
        {
          path: "annotate",
          element: <AnnotatePage />,
        },
        {
          path: "train",
          element: <TrainPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "forgotpassword",
          element: <ForgotPasswordPage />,
        },
        {
          path: "modelsregistry",
          element: <ModelsRegistry />,
        },
        {
          path: "modelsregistrylist",
          element: <ModelsRegistryListPage />,
        },
        {
          path: "postmodelselection",
          element: <PostModelSelectionPage />,
        },
        {
          path: "annotationreview",
          element: <AnnotationReviewPage />,
        },
        {
          path: "report",
          element: <ReportPage />,
        },
        // {
        //   path: "registeruser",
        //   element: <RegisterUser />,
        // },
        // {
        //   path: "registeradmin",
        //   element: <RegisterAdminOnce />,
        // },
      ],
    },
    // {
    //   path: "/scivision",
    //   element: <RootLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <HomePage />,
    //     },
    //     {
    //       path: "uploadpage",
    //       element: <UploadPage />,
    //     },
    //     {
    //       path: "uploadpagedetails",
    //       element: <UploadPageDetails />,
    //     },
    //     {
    //       path: "voi",
    //       element: <VoiPage />,
    //     },
    //   ],
    // },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
