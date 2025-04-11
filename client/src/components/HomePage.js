import { useState } from "react";
import { Listgames } from "./ListG";

export function HomePage({ games, setGames }) {
    const [sortOrder, setsortOrder] = useState("");
    const [search, setSearch] = useState("");

    console.log("HomePage - setGames:", setGames); // Debug xem có undefined không

    return (
        <div>
            <Listgames
                sortOrder={sortOrder}
                setsortOrder={setsortOrder}
                search={search}
                setSearch={setSearch}
                games={games}
                setGames={setGames}
            />
        </div>
    );
}
