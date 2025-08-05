import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const games = [
  { name: "Minecraft", image: "/minecraft.jpg", path: "/games/MinecraftPage" },
  { name: "Fortnite", image: "/Fortnite.jpg", path: "/games/FortnitePage" },
  { name: "PUBG", image: "/PUBG.jpg", path: "/games/PubgPage" },
  { name: "GTA V", image: "/GTA V.jpg", path: "/games/GtaVPage" },
  { name: "CS 1.6", image: "/CS 1.6.jpg", path: "/games/Cs16Page" },
  { name: "CS 2", image: "/CS 2.jpg", path: "/games/Cs2Page" },
  { name: "Valorant", image: "/Valorant.jpg", path: "/games/ValorantPage" },
  { name: "Roblox", image: "Roblox.jpg", path: "/games/RobloxPage" },
  { name: "Call of Duty", image: "Call of Duty.jpg", path: "/games/CallOfDutyPage" },
  { name: "League of Legends", image: "League of Legends.jpg", path: "/games/LeagueOfLegendsPage" },
  { name: "Dota 2", image: "/Dota 2.jpg", path: "/games/Dota2Page" },
  { name: "Apex Legends", image: "/Apex Legends.jpg", path: "/games/ApexLegendsPage" },
  { name: "Overwatch", image: "/Overwatch.jpg", path: "/games/OverwatchPage" },
  { name: "Free Fire", image: "/Free Fire.jpg", path: "/games/FreeFirePage" },
  { name: "Brawl Stars", image: "/Brawl Stars.jpg", path: "/games/BrawlStarsPage" },
  { name: "Mobile Legends", image: "/Mobile Legends.jpg", path: "/games/MobileLegendsPage" },
  { name: "Among Us", image: "/Among Us.jpg", path: "/games/AmongUsPage" },
  { name: "Rust", image: "/Rust.jpg", path: "/games/RustPage" },
  { name: "FIFA 23", image: "/FIFA 23.jpg", path: "/games/FIFA23Page" },
  { name: "Rocket League", image: "/Rocket League.jpg", path: "/games/RocketLeaguePage" },
];

const GamesPage = () => {
  const navigate = useNavigate();

  const handleGameClick = (path) => {
  navigate(path);
};

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 py-8 text-white">
      <h2 className="text-3xl md:text-5xl text-center font-extrabold text-cyan-400 mb-12 drop-shadow-lg">
        Выбери игру, в которой хочешь стать кибер-чемпионом
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {games.map((game) => (
          <button
            key={game.path}
            onClick={() => handleGameClick(game.path)}
            className="rounded-xl overflow-hidden bg-[#1f1f24] hover:scale-105 hover:ring-2 hover:ring-cyan-400 transition transform duration-200 shadow-md"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-32 sm:h-36 object-cover"
            />
            <div className="py-3 text-center font-medium text-sm sm:text-base">
              {game.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
