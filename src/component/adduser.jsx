import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddUser = () => {
    const [userRegistration, setUserRegistration] = useState({
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
 
        const response = await fetch("/api/admin/addEmployee", {
            method: "POST",
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

    const handleHome = () => {
        navigate(`/display`);
    }

    return (
        <>
                <header>
                <div >
            <h1> Add User</h1>
        </div>
        <button onClick={handleHome}>Back</button>
        </header>
            <div className="form-container" >
                <form action="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userRegistration.name}
                            onChange={handleInput}
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="salary">Salary: </label>
                        <input
                            type="number"
                            autoComplete="off"
                            value={userRegistration.salary}
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

export default AddUser;