import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./UseContext/UserContext";
import Home from "./Pages/Home/Home";
import RFQs from "./Pages/RFQs/RFQs";
import POs from "./POs/POs";
// import Myprofile from "./Pages/Myprofile";
import RFQForm from "./subpage/RFQForm";
import PosForm from "./subpage/PosForm";
import Login from "./Pages/Login";
import CompletedRFQsForm from "./subpage/CompletedRFQsForm";
import Loading from "./Loading/Loading";
import ErrorHandling from "./ErrorHandling/ErrorHandling";
import LogWithOTP from "./LoginPages/LogWithOTP";
import LogWithEmailPass from "./LoginPages/LogWithEmailPass";
import SetPassword from "./LoginPages/SetPassword";
import Vendors from "./Pages/Vendors/Vendors";
import VendorDetailsPage from "./Pages/Vendors/VendorsDetail/VendorDetailsPage";
import MaterialDetailsPage from "./Pages/Vendors/MaterialDetail/MaterialDetailsPage";
import RFQDetails from "./Pages/RFQs/RFQDetails/RFQDetails";
import POsDetail from "./POs/POsDetails/POsDetail";
import Prospects from "./Pages/Prospects/Prospects";
import Parent from "./Pages/Prospects/ProspectsDetails/Parent";
import PowerBI from "./Pages/Powerbi";
import UserModule from "./Pages/UserModule/UserModule";
import Revaluation from "./Pages/Revaluation/Revaluation";
import ParentReevaluation from "./Pages/Revaluation/RevaluationDetails/ParentReevaluation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogWithEmailPass />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/Vendors" element={<Vendors />} />
        <Route path="/VendorDetailsPage" element={<VendorDetailsPage />} />
        <Route path="/MaterialDetailsPage" element={<MaterialDetailsPage />} />
        <Route path="/Prospects" element={<Prospects />} />
        <Route path="/Revaluation" element={<Revaluation />} />

        <Route path="/RFQs" element={<RFQs />} />
        <Route path="/RFQDetails" element={<RFQDetails />} />

        <Route path="/POs" element={<POs />} />
        <Route path="/POsDetail" element={<POsDetail />} />
        <Route path="/ParentReevaluation" element={<ParentReevaluation />} />

        <Route path="/UserModule" element={<UserModule />} />
        <Route path="/RFQForm" element={<RFQForm />} />
        <Route path="/PosForm" element={<PosForm />} />
        <Route path="/CompletedRFQsForm" element={<CompletedRFQsForm />} />
        <Route path="/ProspectDetails" element={<Parent />} />
        <Route path="/PowerBI" element={<PowerBI />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/ErrorHandling" element={<ErrorHandling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
