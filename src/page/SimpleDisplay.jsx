import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SimpleDisplay = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found. Please log in.");
                return;
            }

            try {
                const response = await fetch("/api/user/showEmployee", {
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
                setError("An error occurred while fetching employee data.");
            }
        };

        fetchEmployeeData();
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate(`/signin`);
    }

    return (
        <>
            <header>
                <h1>Employee Management System (USER) </h1>
                <div>
                <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className="main-container" >
                {error && <p>{error}</p>}
                {employeeData ? (
                    employeeData.map((employee) => (
                        <div className="EmployeeData" key={employee.id}>
                            {Object.entries(employee).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong> {renderValue(value)}
                                </div>
                            ))}
                        </div>
                    )
                )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};


export default SimpleDisplay;