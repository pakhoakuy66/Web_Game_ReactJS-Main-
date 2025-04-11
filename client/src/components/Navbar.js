import { Link } from "react-router";

export function Navbar() {
    return (
        <div className="flex items-center justify-evenly h-[70px] w-[100%] bg-[#1B2838] shadow-xl">
            <Link
                to="/"
                className="drop-shadow-[0_0_1px_white] text-[#C7D5E0] font-bold duration-300 hover:drop-shadow-[0_0_10px_white]"
            >
                Home
            </Link>
            <Link
                to="/games/about"
                className="drop-shadow-[0_0_1px_white] text-[#C7D5E0] font-bold duration-300 hover:drop-shadow-[0_0_10px_white]"
            >
                About
            </Link>
            <Link
                to="/games/Contact"
                className="drop-shadow-[0_0_1px_white] text-[#C7D5E0] font-bold duration-300 hover:drop-shadow-[0_0_10px_white]"
            >
                Contact
            </Link>
        </div>
    );
}
