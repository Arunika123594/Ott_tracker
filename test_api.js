const http = require("http");

function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: "localhost",
      port: 5000,
      path: `/api${path}`,
      method,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log("\n--- Step 1: Login as admin ---");
  const login = await request("POST", "/auth/login", {
    email: "admin@ott.com",
    password: "Admin1234",
  });
  console.log("Status:", login.status);
  console.log("Response:", JSON.stringify(login.body, null, 2));

  if (!login.body.token) {
    console.log("\n❌ Login failed. Cannot proceed.");
    return;
  }

  const token = login.body.token;
  console.log("\n✅ Token received:", token.slice(0, 30) + "...");

  console.log("\n--- Step 2: Add Movie ---");
  const movie = await request("POST", "/movies", {
    title: "Test Movie",
    platform: "Netflix",
    image: "https://via.placeholder.com/300",
    status: "planned",
  }, token);
  console.log("Status:", movie.status);
  console.log("Response:", JSON.stringify(movie.body, null, 2));

  console.log("\n--- Step 3: Add Show ---");
  const show = await request("POST", "/shows", {
    title: "Test Show",
    platform: "Amazon Prime",
    image: "https://via.placeholder.com/300",
    episode: "S1 E1",
    status: "watching",
  }, token);
  console.log("Status:", show.status);
  console.log("Response:", JSON.stringify(show.body, null, 2));

  console.log("\n--- Step 4: Fetch all movies (admin) ---");
  const movies = await request("GET", "/admin/movies", {}, token);
  console.log("Status:", movies.status);
  console.log("Total movies:", Array.isArray(movies.body) ? movies.body.length : movies.body);
}

main().catch((err) => console.error("Connection error — is the server running?\n", err.message));
