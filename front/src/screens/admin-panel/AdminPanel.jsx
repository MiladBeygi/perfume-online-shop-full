import { Button } from "flowbite-react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminButtonGroups from "../../layout/button-groups/AdminButtonGroups";

function AdminPanel(props) {

    return <>
        <AdminButtonGroups />
        <Navigate to='products-list' />
    </>
}
export default AdminPanel;