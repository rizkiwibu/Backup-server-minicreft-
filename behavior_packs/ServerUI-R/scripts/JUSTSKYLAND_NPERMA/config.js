const config = {
    landSizeMax: 2048, // Land max size, default size is 1024 block size
    ecoScoreboard: "money", // Economy scoreboard for buying land and selling land
    offset: 8, //offset >= 10 = 10, offset < 5 = 5
    liquid_protect: true, //liquid protect (e.g, water,lava)
    perBlockPrice: 20, // Per block size, example i claimed land with size 20x20 and the price is (20x20)x100 = 40.000 money
    landSellTax: 5, // Land sell tax, example i'm gonna sell my land with size 20x20 and i got (20x20)/10 = 4000 money back
    bypassLandTag: "bypass.land", // Player with this tag can break or place block without access
    landpopup: true, //If make to true will visible the popup msg if inside the land
    protect: [
        {
            id: "6129",
            mode: "action",
            msg: "§l§g§oMain Lobby!",
            interact: true
        }
    ] //make object in the array with properties "id" as landID, "msg" as msg when player in land, "mode" as mode sendmsg,"interact" as boolean if set to false player in the land cannot interact, mode has enum : ["action", "text"], example: [{ id: 2973, msg: "welcome to lobby @PNAME", mode: "action", interact: true}]
    //@PNAME AS PLAYERNAME
};

export { config };
