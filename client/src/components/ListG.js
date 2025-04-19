import { useState, useEffect } from "react";
import { data, Link } from "react-router";
import { Button } from "react-bootstrap";

export function Listgames({
    sortOrder,
    setsortOrder,
    search,
    setSearch,
    games = [],
    setGames,
}) {
    const [filterCategory, setFilterCategory] = useState("");
    const [page, setPage] = useState(1); // Trang hiện tại
    const [totalGames, setTotalGames] = useState(0); // Tổng số game
    const limit = 8; // Số game mỗi trang

    // Hàm tải game từ API
    const fetchGames = async (pageNum) => {
        try {
            const response = await fetch(
                `http://localhost:5000/games?page=${pageNum}&limit=${limit}`
            );
            const data = await response.json();
            if (pageNum === 1) {
                setGames(data.games); // Trang đầu tiên, thay thế danh sách
            } else {
                setGames((prevGames) => [...prevGames, ...data.games]); // Thêm vào danh sách
            }
            setTotalGames(data.totalGames); // Cập nhật tổng số game
        } catch (error) {
            console.error("Lỗi", error);
            setGames([]);
        }
    };

    // Tải game khi vào trang hoặc khi page thay đổi
    useEffect(() => {
        fetchGames(page);
    }, [page]);

    // Tải game khi tìm kiếm
    useEffect(() => {
        if (search) {
            fetch(`http://localhost:5000/games/search_Game?search=${search}`)
                .then((res) => res.json())
                .then((data) => setGames(data))
                .catch((error) => {
                    console.error("Lỗi", error);
                    setGames([]);
                });
        } else {
            fetchGames(1); // Reset về trang 1 khi không tìm kiếm
            setPage(1);
        }
    }, [search]);

    // Tải game khi lọc thể loại
    useEffect(() => {
        if (!filterCategory) {
            fetchGames(1); // Reset về trang 1 khi không lọc
            setPage(1);
            return;
        }

        fetch(
            `http://localhost:5000/games/filterCategory?category=${filterCategory}`
        )
            .then((res) => res.json())
            .then((data) => setGames(data))
            .catch((error) => {
                console.error("Lỗi", error);
                setGames([]);
            });
    }, [filterCategory]);

    const handleDeleteGame = async (id, name) => {
        if (!window.confirm(`Bạn có muốn xóa game ${name}`)) return;

        try {
            const response = await fetch(
                `http://localhost:5000/games/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setGames((prevGames) =>
                    prevGames.filter((game) => game.id !== id)
                );
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Lỗi khi xóa game", error);
        }
    };

    // Xử lý nút "Tải thêm"
    const handleLoadMore = () => {
        if (games.length >= totalGames) {
            alert("Đã tải hết game!");
            return;
        }
        setPage((prevPage) => prevPage + 1); // Tăng trang để tải thêm
    };

    return (
        <div className="h-auto">
            <header className="flex items-center mt-7 h-[50px]">
                <h1 className="text-[#C7D5E0] ml-[60px] text-[25px] font-bold ">
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        L
                    </span>
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        i
                    </span>
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        s
                    </span>
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        t
                    </span>{" "}
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        G
                    </span>
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        a
                    </span>
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        m
                    </span>
                    <span className="drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_10px_white]">
                        e
                    </span>{" "}
                    <span className="drop-shadow-[0_0_2px_white] duration-300 hover:drop-shadow-[0_0_20px_white]">
                        🎮
                    </span>
                </h1>
                <input
                    type="text"
                    placeholder="Tìm game nào"
                    defaultValue={search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearch(e.target.value);
                        }
                    }}
                    className="text-[#C7D5E0] pl-2 w-[230px] h-[30px] ml-[120px] bg-[#0a0e1a] duration-300 hover:bg-[#12182d]  hover:drop-shadow-[0_0_5px_white]"
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="rounded-sm h-[30px] w-[190px] ml-[230px] bg-[#0a0e1a] text-white hover:bg-[#12182d] hover:drop-shadow-[0_0_5px_white]"
                >
                    <option value="">Lọc game</option>
                    <option value="HR">Horror(HR)</option>
                    <option value="AA">Action-Adventure(AA)</option>
                    <option value="RP">Role-Playing Game(RP)</option>
                    <option value="AT">Action(AT)</option>
                    <option value="OW">Open World(OW)</option>
                    <option value="ME">Metroidvania(ME)</option>
                    <option value="FT">Fighting(FT)</option>
                    <option value="ST">Shooter(ST)</option>
                    <option value="SB">Sandbox(SB)</option>
                    <option value="RC">Racing(RC)</option>
                    <option value="PZ">Puzzle(PZ)</option>
                </select>
                <Link to="/games/create" className="ml-[150px]">
                    <button
                        className="w-[30px] h-[30px] bg-[#151d2a] text-white rounded-sm 
                    drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] 
                    active:scale-95 active:drop-shadow-[0_0_5px_white]"
                    >
                        <i className="fa-solid fa-plus duration-300 hover:drop-shadow-[0_0_3px_white]"></i>
                    </button>
                </Link>
            </header>
            <main className="p-3">
                <div className="p-5 mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.isArray(games) && games.length > 0 ? (
                            games.map((game) => {
                                let imagePath;
                                try {
                                    imagePath = require(`../assets/images/${game.img}`);
                                } catch (error) {
                                    console.error(
                                        `Không tìm thấy ảnh: ${game.img}`
                                    );
                                    imagePath = "";
                                }
                                return (
                                    <Link
                                        to={`/games/${game.id}`}
                                        key={game.id}
                                    >
                                        <div
                                            name="id"
                                            className="bg-[#1e293b] max-h-[430px] min-h-[430px] p-4 rounded-lg shadow-lg hover:scale-102 transition-all duration-300 hover:drop-shadow-[0_0_2px_white]"
                                        >
                                            <img
                                                name="img"
                                                src={imagePath}
                                                alt=""
                                                className="w-full h-[150px] bg-[#000] object-contain rounded-md"
                                            />
                                            <h2 className="text-white mt-3 text-lg font-bold duration-200 hover:drop-shadow-[0_0_10px_white]">
                                                {game.name}
                                            </h2>
                                            <p className="text-gray-300 text-sm mt-1">
                                                Release Date: {game.releaseDate}
                                            </p>
                                            <p className="text-gray-400 mt-2">
                                                Description:{" "}
                                            </p>
                                            <p className="text-gray-400 text-sm line-clamp-3 max-h-[300px] duration-100 hover:overflow-y-auto">
                                                {game.description}
                                            </p>
                                            <div className="flex justify-around mt-3">
                                                <Link
                                                    to={`/games/update/${game.id}`}
                                                >
                                                    <button className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white]">
                                                        Update
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteGame(
                                                            game.id,
                                                            game.name
                                                        );
                                                    }}
                                                    className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white]"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="col-span-4 text-center text-white text-lg">
                                Không tìm thấy game nào.
                            </div>
                        )}
                    </div>
                    {Array.isArray(games) && games.length > 0 && (
                        <div className="flex justify-center mt-5">
                            <Button onClick={handleLoadMore} variant="primary">
                                Tải thêm
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
