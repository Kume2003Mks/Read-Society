const Banner = document.getElementById("bannerCanvas") as HTMLCanvasElement;
const ctx = Banner.getContext("2d");

if (ctx) {
    // Set background color
    ctx.fillStyle = "#3498db"; // You can change the color as needed
    ctx.fillRect(0, 0, Banner.width, Banner.height);

    // Add text to the banner
    ctx.fillStyle = "#ffffff"; // Text color
    ctx.font = "48px Arial"; // Font style and size
    ctx.fillText("Your Banner Text", 100, 100); // Text content and position

    // You can add more shapes, images, or other elements as needed
} else {
    console.error("Canvas context not supported.");
}