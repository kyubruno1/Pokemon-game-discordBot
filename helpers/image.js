const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

async function createImage(pokemon) {
  //Context é utilizado para modificar o canvas
  const canvas = Canvas.createCanvas(200, 200);
  const context = canvas.getContext('2d');

  const background = await Canvas.loadImage(`./assets/images/${pokemon}.png`);

  //Isso usa as dimensões da tela para esticar a imagem em toda a tela
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  const attachment = new AttachmentBuilder(await canvas.encode('png'), {
    name: 'profile-image.png',
  });
  return attachment;
}

module.exports = { createImage };
