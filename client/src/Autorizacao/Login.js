import React, { useState } from "react";
import "./Autorizacao.css";
import apiceLogo from "../imagens/apice_logo.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario_email: username,
                    usuario_senha: password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                const token = data.token;

                // Make a GET request to the authorization endpoint with the token
                const authResponse = await fetch("http://localhost:8081/api/autoriza", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const authData = await authResponse.json();

                if (authData.success) {
                    console.log("Usuário autenticado e autorizado!");
                } else {
                    console.log("Usuário autenticado mas não autorizado!");
                }
            } else {
                console.log("Login falhou: ", data.message);
            }
        } catch (error) {
            console.error("Erro durante o login: ", error);
        }
    };

    return (
        <div>
            <div className="login-container">
                <img src={apiceLogo} alt={"Logo Ápice sistemas"} style={{ marginTop: "-250px", marginBottom: "100px" }} />
                <h2 className="login-lable">Login</h2>
                <section>
                    <form>
                        <label className="username-label" style={{ paddingRight: "40px", margin: "10px" }}>
                            Nome:
                            <input
                                style={{ marginLeft: "10px" }}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <label className="password-label" style={{ paddingRight: "40px", margin: "10px" }}>
                            Senha:
                            <input
                                style={{ marginLeft: "10px" }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Login;
