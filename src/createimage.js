import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import sharp from "sharp";

import path from "path";

export const createImage = async (from, ctx) => {
  try {
    registerFont(path.join(process.cwd(), "fonts", "mvboli.ttf"), {
      family: "mvboli",
    });
    const templateImage = await loadImage(
      path.join(process.cwd(), "template.png")
    );
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx2d = canvas.getContext("2d");

    // Shablon rasmni koordinatalari to'g'ri bo'lishi uchun (0, 0) ga joylashtiramiz
    ctx2d.drawImage(templateImage, 0, 0);

    // Rasmga matn qo'shish
    ctx2d.font = "30px mvboli";
    ctx2d.fillStyle = "#666666";

    // Matnni kerakli joyga sozlash
    ctx2d.fillText(from, 740, 348); // Pozitsiyani kerakli joyga sozlang

    // Canvas ni buffer ga qaytarish
    const finalImageBuffer = canvas.toBuffer();

    // Rasmni vaqtinchalik faylga saqlash
    //   const outputPath = "output.png";
    //   fs.writeFileSync(outputPath, finalImageBuffer);

    // Rasmni foydalanuvchiga yuborish
    await ctx.replyWithPhoto(
      {
        source: finalImageBuffer,
      },
      {
        caption: from,
      }
    );
  } catch (error) {
    ctx.reply("Xatolik yuz berdi ", error.message);
  }
  // Vaqtinchalik faylni o'chirish
  //   fs.unlinkSync(outputPath);
};
