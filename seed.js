const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const Movie = require("./models/Movie");
const Show = require("./models/Show");

const movies = [
  { title: "The Godfather", platform: "Amazon Prime", image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDmni69.jpg", status: "completed" },
  { title: "Pulp Fiction", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", status: "completed" },
  { title: "The Shawshank Redemption", platform: "JioCinema", image: "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg", status: "completed" },
  { title: "Spider-Man: No Way Home", platform: "Disney+", image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", status: "planned" },
  { title: "Joker", platform: "Amazon Prime", image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", status: "completed" },
  { title: "Guardians of the Galaxy", platform: "Disney+", image: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg", status: "planned" },
  { title: "Inception", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", status: "completed" },
  { title: "Interstellar", platform: "Amazon Prime", image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", status: "completed" },
  { title: "The Dark Knight", platform: "JioCinema", image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", status: "completed" },
  { title: "Avengers: Endgame", platform: "Disney+", image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", status: "completed" },
  { title: "Parasite", platform: "Amazon Prime", image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", status: "planned" },
  { title: "Dune", platform: "Netflix", image: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg4YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", status: "planned" },
];

const shows = [
  { title: "Game of Thrones", platform: "JioCinema", image: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg", episode: "S8 E6", status: "completed" },
  { title: "Money Heist", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", episode: "S5 E10", status: "completed" },
  { title: "The Witcher", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg", episode: "S3 E8", status: "watching" },
  { title: "Peaky Blinders", platform: "Netflix", image: "https://m.media-amazon.com/images/M/MV5BMTkxNTk3NDQ4Ml5BMl5BanBnXkFtZTgwMTQ4NTk0OTE@._V1_SX300.jpg", episode: "S6 E6", status: "completed" },
  { title: "Mirzapur", platform: "Amazon Prime", image: "https://m.media-amazon.com/images/M/MV5BYjQ3ZWIwMTYtNjFjNi00ZjM4LWI3ZGYtZGM3ZGU4ZGM3ZGUyXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg", episode: "S3 E10", status: "watching" },
  { title: "Sacred Games", platform: "Netflix", image: "https://m.media-amazon.com/images/M/MV5BNDc4NTU4NTYtYTMwZi00ZjZlLWEwN2ItYjU1MDQ3NTIxMDVhXkEyXkFqcGdeQXVyODY3NjM0NTg@._V1_SX300.jpg", episode: "S2 E8", status: "completed" },
  { title: "Wednesday", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg", episode: "S1 E8", status: "watching" },
  { title: "Breaking Bad", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", episode: "S5 E16", status: "completed" },
  { title: "Stranger Things", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", episode: "S4 E9", status: "watching" },
  { title: "The Crown", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg", episode: "S6 E10", status: "completed" },
  { title: "Squid Game", platform: "Netflix", image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg", episode: "S1 E9", status: "completed" },
  { title: "The Boys", platform: "Amazon Prime", image: "https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg", episode: "S4 E8", status: "watching" },
  { title: "House of the Dragon", platform: "JioCinema", image: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg", episode: "S2 E8", status: "watching" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  let admin = await User.findOne({ role: "admin" });
  if (!admin) {
    const hashed = await bcrypt.hash("Admin1234", 10);
    admin = await User.create({ name: "Admin", email: "admin@ott.com", password: hashed, role: "admin" });
    console.log("✅ Admin created");
  } else {
    console.log(`Using existing admin: ${admin.email}`);
  }

  const movieDocs = movies.map((m) => ({ ...m, user: admin._id }));
  const showDocs = shows.map((s) => ({ ...s, user: admin._id, history: [{ episode: s.episode }] }));

  await Movie.insertMany(movieDocs);
  await Show.insertMany(showDocs);

  console.log(`✅ Inserted ${movies.length} movies and ${shows.length} shows`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed error:", err.message); process.exit(1); });
