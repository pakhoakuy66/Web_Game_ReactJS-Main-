import { useState } from "react";
import { Link } from "react-router";

const apiUrl = process.env.REACT_APP_API_URL;

export function Register() {
    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
    });

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (register.password !== register.confirmPass) {
            alert("Mật khẩu không khớp");
            return;
        }

        try {
            const res = await fetch(`${apiUrl}/register/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: register.username,
                    email: register.email,
                    password: register.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Đăng ký thất bại");
            }

            alert(data.message || "Đăng ký thành công");

            setRegister({
                username: "",
                email: "",
                password: "",
                confirmPass: "",
            });
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
                <div className="flex w-[100%] p-3">
                    <div className="flex justify-center items-center w-[100%] border-r-[1px]">
                        <h1 className="text-[90px] drop-shadow-[0_0_2px_white] duration-300 hover:drop-shadow-[0_0_20px_white]">
                            🎮
                        </h1>
                    </div>
                    <div className="w-[100%]">
                        <h1 className="text-[#C7D5E0] mt-4 text-[30px] text-center font-bold block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Register
                        </h1>
                        <div className="grid justify-center mt-3 px-3 text-[#C7D5E0]">
                            <input
                                type="text"
                                name="username"
                                value={register.username}
                                onChange={handleChange}
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Username"
                            />
                            <input
                                type="email"
                                name="email"
                                value={register.email}
                                onChange={handleChange}
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Password"
                            />

                            <input
                                type="password"
                                name="confirmPass"
                                value={register.confirmPass}
                                onChange={handleChange}
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="xác nhận Password"
                            />
                        </div>
                        <div className="grid justify-center mt-2.5">
                            <button
                                type="submit"
                                className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white]"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-[#C7D5E0] text-center">
                    Bạn đã có tài khoản?
                    <Link
                        to="*"
                        className="underline drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]"
                    >
                        {" "}
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
}
