import Layout  from "./layouts/layout";
import { Navigate, Routes,Route } from "react-router-dom"

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout>HOME PAGE</Layout>}/>
            <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>}/>
            <Route path="*" element={<Navigate to="/"></Navigate>}/>
        </Routes>
    );
};
export default AppRoutes;