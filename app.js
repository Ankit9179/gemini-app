import express from "express";
const app = express();
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

//.env
dotenv.config();

//middlewares use
app.use(bodyParser.json());

//apis
app.post("/question", async (req, res) => {
  //creaeting api with .env variable
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const question = req.body.question;
  try {
    const result = await model.generateContent(question);
    const anawer = result.response.text();
    if (result) {
      res.status(200).json({
        success: true,
        anawer: anawer,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
});

app.get("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: "bad request",
  });
});

export default app;
