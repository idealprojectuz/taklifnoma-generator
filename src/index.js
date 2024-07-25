import { Telegraf } from "telegraf";
import sharp from "sharp";
import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import path from "path";
import { createImage } from "./createimage.js";

// const { createCanvas, loadImage } = require( "canvas" );
// const fs = require("fs");
const bot = new Telegraf("6757884333:AAEoyhCrTs-RPQY2Kfjl8UBGrx-YJGHfuWw");

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

bot.launch((ctx) => {
  console.log("bot running");
});
