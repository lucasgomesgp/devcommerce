const { v4: uuid } = require("uuid");
const items = [
    {
        "id": uuid(),
        "src": "assets/webcam.png",
        "from": 400,
        "to": 350,
        "name": "Webcam Logitech",
    },
    {
        "id": uuid(),
        "src": "assets/headset.png",
        "from": 300,
        "to": 250,
        "name": "Headset Razer",
    },
    {
        "id": uuid(),
        "src": "assets/monitor.png",
        "from": 3700,
        "to": 3500,
        "name": "Monitor Acer",
    }
];

module.exports = {
    items
};
