import { useState } from "react";

export function Login({ setIsLogin }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div className="h-screen grid justify-center items-center">
            <form className="bg-[#1B2838] p-3 shadow-xl w-[900px] h-auto rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white]">
                <h1 className="text-[#C7D5E0]  text-[30px] text-center font-bold block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                    Akuy
                </h1>
                <div className="flex h-[350px] w-[100%] p-3">
                    <div className="flex justify-center items-center w-[100%] border-r-[1px]">
                        <h1 className="text-[90px] drop-shadow-[0_0_2px_white] duration-300 hover:drop-shadow-[0_0_20px_white]">
                            🎮
                        </h1>
                    </div>
                    <div className="w-[100%]">
                        <h1 className="text-[#C7D5E0] text-[20px] text-center font-bold block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Login
                        </h1>
                        <div className="grid">
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
