import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function StudentEdit() {
  let { id } = useParams();

  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/students/${id}/edit`).then((res) => {
      console.log(res);
      setStudent(res.data.student);
    });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const updateStudent = (e) => {
    e.preventDefault();
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      password: student.password,
    };

    axios
      .put(`http://127.0.0.1:8000/api/students/${id}/update`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 404) {
            setInputErrorList(error.response.data.message);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Student
                <Link to="/" className="btn btn-danger float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateStudent}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={student.email}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.email}</span>
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={student.phone}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.phone}</span>
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="text"
                    name="password"
                    value={student.password}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.password}</span>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Edit Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEdit;
