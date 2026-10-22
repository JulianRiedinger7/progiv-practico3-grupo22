import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const { createApp } = await import("./app");
const port = Number(process.env.PORT ?? 3000);
const app = createApp();

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});

