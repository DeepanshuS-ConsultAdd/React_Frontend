import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userRegistration, setUserRegistration] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Jsondata=JSON.stringify(userRegistration);

        console.log("The Data:",Jsondata);
 
        const response = await fetch("/api/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: Jsondata
        });

        if (response.ok) {
            console.log("Success!");
            const token = await response.text();
            localStorage.setItem("token", token); 
            console.log("The Token is",token);
           navigate("/display");
        } else {
            console.error("Registration failed");
        }
    }

    const handleHome = () => {
        navigate(`/home`);
    }


    return (
        <>
        <header>
                <div >
            <h1> Signin Portal</h1>
        </div>
        <button onClick={handleHome}>Home</button>
        </header>

            <div className="form-container">
                <form action="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">User Name</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userRegistration.username}
                            onChange={handleInput}
                            name="username"
                            id="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userRegistration.password}
                            onChange={handleInput}
                            name="password"
                            id="password"
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Login;
