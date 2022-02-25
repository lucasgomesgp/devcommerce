const  {v4: uuid}  = require("uuid");
const items = [
    {
        "id": uuid(),
        "src": "assets/webcam.png",
        "from": 400,
        "to": 350,
        "name": "Webcam Logitech",
        "quant": 1
    },
    {
        "id": uuid(),
        "src": "assets/headset.png",
        "from": 300,
        "to": 250,
        "name": "Headset Razer",
        "quant": 1
    },
    {
        "id": uuid(),
        "src": "assets/monitor.png",
        "from": 3700,
        "to": 3500,
        "name": "Monitor Acer",
        "quant": 1
    }
];

module.exports = {
    items
};
