import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

export function Login({ setIsLogin }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password: pass }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Đăng nhập thất bại");
            }

            sessionStorage.setItem("token", data.token);

            navigate("/games");
            alert(data.message || "Đăng nhập thành công");

            if (setIsLogin) {
                setIsLogin(true);
            }

            setEmail("");
            setPass("");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="h-screen grid justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1B2838] p-3 shadow-xl w-[900px] h-auto rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white]"
            >
                <h1 className="text-[#C7D5E0] text-[30px] text-center font-bold block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                    Akuy
                </h1>
                <div className="flex h-[350px] w-[100%] p-3">
                    <div className="flex justify-center items-center w-[100%] border-r-[1px]">
                        <h1 className="text-[90px] drop-shadow-[0_0_2px_white] duration-300 hover:drop-shadow-[0_0_20px_white]">
                            🎮
                        </h1>
                    </div>
                    <div className="w-[100%]">
                        <h1 className="text-[#C7D5E0] mt-4 text-[30px] text-center font-bold block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Login
                        </h1>
                        <div className="grid justify-center mt-5 px-3 text-[#C7D5E0]">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Password"
                            />
                        </div>
                        <div className="grid justify-center mt-3">
                            <button
                                type="submit"
                                className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white]"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-[#C7D5E0] text-center">
                    Bạn đã có tài khoản?
                    <Link
                        to="/register"
                        className="underline drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]"
                    >
                        {" "}
                        Đăng ký
                    </Link>
                </p>
            </form>
        </div>
    );
}
