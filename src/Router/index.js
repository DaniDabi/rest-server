import React from "react";
import { Routes, Route } from "react-router-dom";
import Students from "../pages/Students";
import StudentCreate from "../pages/StudentCreate.js";
import StudentEdit from "../pages/StudentEdit.js";

function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="students/create" element={<StudentCreate />} />
        <Route path="students/:id/edit" element={<StudentEdit />} />
      </Routes>
    </div>
  );
}

export default MyRouter;
