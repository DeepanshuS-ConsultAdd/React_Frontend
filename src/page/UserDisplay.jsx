import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowEmployee = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const tokenn = localStorage.getItem("token");

    useEffect(() => {
        const fetchEmployeeData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found. Please log in.");
                return;
            }

            try {
                const response = await fetch("/api/admin/showEmployee", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmployeeData(data);
                } else {
                    setError("Failed to fetch employee data.");
                }
            } catch (error) {
                console.log("Catch Part!!");
                navigate('/simpledisplay');
                setError("An error occurred while fetching employee data.");
            }
        };

        fetchEmployeeData();
    }, [navigate]);

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return value.join(', ');
        } else if (typeof value === 'object' && value !== null) {
            return Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                    <strong>{subKey}:</strong> {renderValue(subValue)}
                </div>
            ));
        }
        return value;
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = (id) => {
        navigate(`/DeleteDisplay/${id}`);
    };

    const handleAdding = () => {
        navigate(`/adduser`);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate(`/signin`);
    }

    return (
        <>
            <header>
                <h1>Employee Management System (ADMIN) </h1>
                <div>
                <button onClick={handleAdding}>Add Employee</button>
                <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className="main-container">
                <h1>Employee Details.</h1>
                {error && <p>{error}</p>}
                {employeeData ? (
                    employeeData.map((employee) => (
                        <div className="EmployeeData" key={employee.id}>
                            {Object.entries(employee).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong> {renderValue(value)}
                                </div>
                            ))}
                            <div className="EmployeeButtons">
                                <button onClick={() => handleUpdate(employee.id)}>Update</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Error 404...</p>
                )}
            </div>
        </>
    );
};

export default ShowEmployee;
