import { useParams } from "react-router";

export function GameDetail({ games }) {
    const { id } = useParams();
    const game = games.find((g) => g.id.toString() === id);

    if (!game) {
        return (
            <h2 className="text-white text-center mt-10">
                Game không tồn tại!
            </h2>
        );
    }

    return (
        <div className="h-[497px] w-screen p-5 bg-slate-900 flex justify-center items-center text-white">
            <div
                name="id"
                className="bg-[#1e293b] p-4 mb-9 rounded-lg shadow-lg w-[400px] hover:scale-102 transition-all duration-300 hover:drop-shadow-[0_0_2px_white]"
            >
                <img
                    name="img"
                    src={require(`../assets/images/${game.img}`)}
                    alt=""
                    className="w-full h-[150px] object-contain rounded-md"
                />
                <h2 className="text-white mt-3 text-lg font-bold duration-200 hover:drop-shadow-[0_0_10px_white]">
                    {game.name}
                </h2>
                <p className="text-gray-300 text-sm mt-1">
                    ReleaseDate: {game.releaseDate}
                </p>
                <p className="text-gray-400 mt-2">Description: </p>
                <p className="text-gray-400 text-sm line-clamp-5 max-h-[300px] duration-100 hover:overflow-y-auto">
                    {game.description}
                </p>
                <div className="flex justify-center mt-3">
                    <button
                        onClick={() => {
                            window.history.back();
                        }}
                        className="w-[90px] h-[30px] bg-[#151d2a] text-white rounded-sm drop-shadow-[0_0_1px_white] duration-300 hover:drop-shadow-[0_0_3px_white] active:scale-95 active:drop-shadow-[0_0_5px_white]"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
