import { useState } from "react";
import { useNavigate } from "react-router";

export function FormAdd({ setGames, games }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    console.log("setGames:", setGames);

    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const handleImageAdd = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm thời nha. Chủ yếu để xem ảnh tạm thời
        }
    };

    // const generateGameId = () => {
    //     if (!games || games.length === 0) {
    //         return "GAME001";
    //     }

    //     // Lấy ID cuối cùng và trích xuất số
    //     const lastGame = games[games.length - 1];
    //     const lastId = lastGame.id.replace("GAME", ""); // Lấy phần số
    //     const newId = String(parseInt(lastId) + 1).padStart(3, "0"); // Tăng số và giữ 3 chữ số

    //     return `GAME${newId}`; // Sửa lỗi template string
    // };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!name || !date || !description || !image) {
            alert("Vui lòng nhập hết tất cả các trường!");
            return;
        }

        const newGame = {
            name,
            releaseDate: formattedDate,
            description,
            img: image.name,
        };

        try {
            const response = await fetch("http://localhost:5000/games/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGame),
            });

            const result = await response.json();
            if (response.ok) {
                setGames((prevGames) => [...prevGames, result.game]);
                alert(`Đã thêm thành công game: "${name}"`);
                navigate("/games");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Có lỗi xảy ra khi thêm game!");
        }
    };

    return (
        <div className="grid py-5 place-items-center">
            <form className="bg-[#1B2838] max-h-[570px] overflow-auto p-3 shadow-xl w-[500px] h-auto rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white]">
                <h1 className="text-[#C7D5E0] text-[20px] font-bold text-center drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                    Akuy
                </h1>
                <div>
                    <nav className="my-1">
                        <label className="text-[#C7D5E0] block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Name:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="my-3 w-[100%] pl-2 h-[30px] duration-300 hover:bg-red-100  hover:drop-shadow-[0_0_2px_white]"
                        />
                    </nav>
                    <nav className="my-1">
                        <label className="text-[#C7D5E0] block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Release Date:
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                            className="my-3 w-[100%] pl-2 h-[30px] duration-300 hover:bg-red-100  hover:drop-shadow-[0_0_2px_white]"
                        />
                    </nav>
                    <nav className="my-1">
                        <label className="text-[#C7D5E0] block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Description:
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            className="my-3 w-[100%] pl-2 h-[30px] duration-300 hover:bg-red-100  hover:drop-shadow-[0_0_2px_white]"
                        />
                    </nav>
                    <nav className="my-1">
                        <label className="text-[#C7D5E0] block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Choose Image:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageAdd}
                            className="my-3 h-[30px] duration-300 drop-shadow-[0_0_1px_white] hover:drop-shadow-[0_0_2px_white] hover:text-[#C7D5E0]"
                        />
                    </nav>
                </div>
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover mt-2 rounded"
                    />
                )}
                <div className="flex w-[100%] justify-around my-5">
                    <button
                        type="button"
                        onClick={() => navigate("/games")}
                        className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white] hover:text-red-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white] hover:text-green-400"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
