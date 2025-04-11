import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export function FormUpdate({ setGames, games }) {
    const { id } = useParams();
    const gameToUpdate = games.find((g) => g.id.toString() === id);

    if (!gameToUpdate) {
        return (
            <h2 className="text-white text-center">
                Không tìm thấy game để cập nhật!
            </h2>
        );
    }

    const [name, setName] = useState(gameToUpdate.name);
    const [date, setDate] = useState(gameToUpdate.releaseDate);
    const [description, setDescription] = useState(gameToUpdate.description);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(gameToUpdate.imagePath);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name || !date || !description) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const updatedGame = {
            name,
            releaseDate: date
                ? date.split("-").reverse().join("/")
                : gameToUpdate.releaseDate,
            description,
            img: image ? image.name : gameToUpdate.img,
        };

        try {
            const response = await fetch(
                `http://localhost:5000/games/update/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedGame),
                }
            );

            const data = await response.json();
            if (response.ok) {
                alert(data.message);

                const updated_Game = games.map((g) => {
                    return g.id === gameToUpdate.id
                        ? { ...g, ...updatedGame }
                        : g;
                });

                setGames(updated_Game);
                navigate("/games");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Lỗi cập nhật game", error);
        }
    };

    return (
        <div className="grid py-5 place-items-center ">
            <form className="bg-[#1B2838] max-h-[570px] overflow-auto p-3 shadow-xl w-[500px] h-auto rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white]">
                <h1 className="text-[#C7D5E0] text-[20px] font-bold text-center drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                    Akuy
                </h1>
                <div className="">
                    <nav className="my-1">
                        <label className="text-[#C7D5E0] block drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                            Name:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={handleImageChange}
                            className="my-3 h-[30px] duration-300 drop-shadow-[0_0_1px_white] hover:drop-shadow-[0_0_2px_white] hover:text-[#C7D5E0]"
                        />
                    </nav>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="..."
                            className="w-32 h-32 object-cover mt-2 rounded"
                        />
                    )}
                </div>
                <div className="flex w-[100%] justify-around my-5">
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/games");
                        }}
                        className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white] hover:text-red-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white] hover:text-green-400"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
