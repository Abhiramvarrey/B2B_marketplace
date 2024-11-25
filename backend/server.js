const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require("./routes/postRoutes");
const searchshop = require("./routes/shopRoutes");
const connection = require("./routes/connectionRoutes");
const requirements = require("./routes/quoteRoutes");
const manageconnect = require("./routes/manageConnection");
const updateprofile = require("./routes/profileRoutes");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use("/api", postRoutes);
app.use("/api", searchshop);
app.use("/api",connection);
app.use("/api",requirements);
app.use("/api/connections",manageconnect);
app.use("/api",updateprofile);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
