import { query } from "../../config/db";

export default async function handler(req, res) {
    try {
        console.log("Incoming request:", req.method, req.body); // Log request data
        const result = await query("SELECT NOW()"); // Sample DB query

        console.log("DB Response:", result.rows);
        res.status(200).json({ message: "Success", data: result.rows });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}
