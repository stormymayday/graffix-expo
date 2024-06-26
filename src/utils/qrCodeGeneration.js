const qrcode = require("qrcode");

export default async function generateQRCode(text) {
  console.log("Generating QR Code", text);
  const qrCode = await qrcode.toDataURL(text);
  console.log("QR Code Generated", qrCode);
  if (!qrCode) {
    console.log("Error generating QR Code");
    return null;
  }
  return qrCode;
}
