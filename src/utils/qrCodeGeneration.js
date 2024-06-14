const qrcode = require("qrcode");

export default async function generateQRCode(text) {
  console.log("Generating QR Code", text);
  const qrCode = await qrcode.toDataURL(text);
  return qrCode;
}
