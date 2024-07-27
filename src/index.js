import "dotenv/config";
import { Telegraf } from "telegraf";
import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import path from "path";
import { createImage } from "./createimage.js";
import express from "express";
// const { createCanvas, loadImage } = require( "canvas" );
// const fs = require("fs");
const bot_token = process.env.BOT_TOKEN;
const bot = new Telegraf(bot_token);

const app = express();
app.use(express.json());

app.get("/cron", (req, res) => {
  const now = new Date();
  const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  res.send(dateTime);
});

app.post("/webhook", async (req, res) => {
  bot.handleUpdate(req.body, res);
});

const url = process.env.RENDER_EXTERNAL_URL || process.env.WEBHOOK;
bot.telegram.setWebhook(url + "/webhook");

bot.start((ctx) => {
  ctx.reply(
    "Assalomu alaykum taklifnomani yaratish uchun ismni yuboring yoki ismlarni , bilan ajratib yuboring"
  );
});

bot.on("text", async (ctx) => {
  const taklifnoma = ctx.message.text.split(",");
  let text = "";
  if (taklifnoma.length > 1) {
    text = taklifnoma.join(",");
  } else {
    text = taklifnoma[0];
  }
  ctx.reply("Taklifnoma yaratish boshlandi \n" + text);
  taklifnoma.forEach(async (el) => {
    await createImage(el, ctx);
  });
  //   const userName = ctx.message.text;
  //   const templateImage = await loadImage(
  //     path.join(process.cwd(), "template.png")
  //   );
  //   const canvas = createCanvas(templateImage.width, templateImage.height);
  //   const ctx2d = canvas.getContext("2d");
  //   ctx2d.drawImage(templateImage, 0, 0);
  //   ctx2d.font = "30px mvboli";
  //   ctx2d.fillStyle = "#666666";
  //   ctx2d.fillText(userName, 740, 348); // Pozitsiyani kerakli joyga sozlang
  //   const finalImageBuffer = canvas.toBuffer();
  //   await ctx.replyWithPhoto({
  //     source: finalImageBuffer,
  //   });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// bot.launch((ctx) => {
//   console.log("bot running");
// });
