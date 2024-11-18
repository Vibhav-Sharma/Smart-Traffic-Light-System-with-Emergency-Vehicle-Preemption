let currentGreenDirection = "north";
let emergencyMode = false;

// Simulated lanes with car counts
let lanes = {
    north: 3,
    east: 2,
    south: 4,
    west: 1, // Emergency lane
};

// Update traffic light colors
function updateTrafficLights(direction) {
    const lights = ["north", "east", "south", "west"];
    lights.forEach(light => {
        document.querySelector(`#${light}-light`).style.backgroundColor = "#444";
    });
    document.querySelector(`#${direction}-light`).style.backgroundColor = "green";
}

// Move cars along their lanes
function moveCars(direction) {
    const car = document.getElementById(`${direction}-car`);
    if (lanes[direction] > 0) {
        car.style.transform =
            direction === "north"
                ? "translateY(-200px)"
                : direction === "south"
                ? "translateY(200px)"
                : direction === "east"
                ? "translateX(200px)"
                : "translateX(-200px)";
        lanes[direction] -= 1;
    }

    setTimeout(() => {
        car.style.transform = "translate(0)";
    }, 2000);
}

// Trigger emergency priority
function triggerEmergency() {
    emergencyMode = true;
    const emergencyLane = "west"; // Emergency lane
    updateTrafficLights(emergencyLane);

    const emergencyCar = document.getElementById(`${emergencyLane}-car`);
    emergencyCar.style.transform = "translateX(-200px)";  // Move to the left

    setTimeout(() => {
        emergencyCar.style.transform = "translateX(0)";
        emergencyMode = false;
    }, 3000);
}
// Start simulation with adaptive timing
function startSimulation() {
    const directions = ["north", "east", "south", "west"];
    let index = 0;

    setInterval(() => {
        if (!emergencyMode) {
            const currentDirection = directions[index];
            if (lanes[currentDirection] > 0) {
                updateTrafficLights(currentDirection);
                moveCars(currentDirection);
            }
            index = (index + 1) % directions.length;
        }
    }, 5000);
}
