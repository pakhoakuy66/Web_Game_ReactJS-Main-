import { useState } from "react";
import { Link } from "react-router";

export function Register() {
    return (
        <div className="h-screen grid justify-center items-center">
            <form className="bg-[#1B2838] p-3 shadow-xl w-[900px] h-auto rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white]">
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
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Username"
                            />
                            <input
                                type="text"
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="Password"
                            />
                            <input
                                type="text"
                                className="w-[320px] h-[35px] my-3 p-1 rounded-sm bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                                placeholder="xác nhận Password"
                            />
                        </div>
                        <div className="grid justify-center mt-2.5">
                            <button className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white]">
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
