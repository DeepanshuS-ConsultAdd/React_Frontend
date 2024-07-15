import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const deleteEmployee = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            return;
        }
        console.log(token);

        try {
            const response = await fetch(`/api/admin/deleteEmployee?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                navigate("/display"); // Redirect to the ShowEmployee page
            } else {
                setError("Failed to delete the employee record.");
            }
        } catch (error) {
            setError("An error occurred while deleting the employee record.");
        }
    };

    useEffect(() => {
        deleteEmployee();
    }, [id, navigate]);

    return (
        <div>
            <h1>helloo!!</h1>
            <button onClick={deleteEmployee}>Delete {id}</button>
            {error && <p>{error}</p>}
            {!error && <p>Deleting record...</p>}
        </div>
    );
};

export default DeleteDisplay;
