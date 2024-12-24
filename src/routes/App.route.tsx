import { FunctionComponent } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/Home.layout";
import SurveyDashboardLayout from "../Layout/Dashboard.layout";
import CreateSurvey from "../pages/CreateSurvey";
import AllResponses from "../pages/AllResponses";
import SurveyDashboardHome from "../components/dashboard/SurveyDashHome";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Allsurveys from "../pages/Allsurveys";
import SingleSurveyPage from "../pages/SingleSurvey";
import SurveyDetailsPage from "../pages/SurveyDetailsPage";

const AppRoutes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/survey-details/:id" element={<SurveyDetailsPage />} />

        </Route>

        <Route
          element={<SurveyDashboardLayout />
          }
        >
          <Route index path="/surveys" element={<SurveyDashboardHome />} />
          <Route path="/surveys/create/blank" element={<CreateSurvey />} />

          <Route path="/surveys/responses/all" element={<AllResponses />} />
          <Route path="/surveys/create/all-survey" element={<Allsurveys />} />
          <Route path="/survey/:id" element={<SingleSurveyPage />} />   
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;