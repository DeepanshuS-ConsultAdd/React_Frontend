import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
    const { id1 } = useParams();
    const [userRegistration, setUserRegistration] = useState({
        id: 0,
        name: "",
        salary: 0
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            return;
        }
        console.log(token);

        const Jsondata=JSON.stringify(userRegistration);

        console.log("The Data:",Jsondata);
 
        const response = await fetch("/api/admin/changeEmployee", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: Jsondata
        });

        if (response.ok) {
            console.log("Success!");
            navigate("/display");
        } else {
            console.error("Registration failed");
        }
    }

    const handleAdding = () => {
        navigate(`/display`);
    }

    return (
        <>
                <header>
                <h1>Employee Update</h1>
                <div>
                <button onClick={handleAdding}>Back</button>
                </div>
            </header>
            <div className="form-container">
                
                <form action="POST" onSubmit={handleSubmit}>
                <div>
                        <label htmlFor="id">ID</label>
                        <input
                            type="number"
                            autoComplete="off"
                            value={id1}
                            placeholder={id1}
                            onChange={handleInput}
                            name="id"
                            id="id"
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Employee Name</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userRegistration.username}
                            onChange={handleInput}
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="number"
                            autoComplete="off"
                            value={userRegistration.password}
                            onChange={handleInput}
                            name="salary"
                            id="salary"
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
} 

export default UpdateUser;