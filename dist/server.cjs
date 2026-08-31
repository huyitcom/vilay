"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  app: () => app,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var dotenv = __toESM(require("dotenv"), 1);
var import_cloudinary = require("cloudinary");
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_nodemailer = __toESM(require("nodemailer"), 1);
dotenv.config();
var UPLOADS_DIR = import_path.default.join(process.cwd(), "uploads");
try {
  if (!process.env.VERCEL && !import_fs.default.existsSync(UPLOADS_DIR)) {
    import_fs.default.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("Could not create uploads directory (expected on Vercel):", e);
}
var SMTP_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true,
  user: process.env.SMTP_USER || "photobookvietnam.net@gmail.com",
  pass: process.env.SMTP_PASS || "pmgy mera pmts gfgp"
};
var TARGET_EMAILS = [
  process.env.ADMIN_EMAIL || "huyitcom@gmail.com",
  "photobookvietnam.net@gmail.com"
];
function generateOrderEmailHtml(order, savedSpreads, serverFolderPath) {
  const customerName = order.customerDetails?.fullName || order.customerName || "Kh\xE1ch h\xE0ng";
  const phone = order.customerDetails?.phone || order.customerPhone || "Ch\u01B0a cung c\u1EA5p";
  const email = order.customerDetails?.email || order.customerEmail || "Kh\xF4ng c\xF3";
  const address = order.customerDetails?.address || order.customerAddress || "T\u01B0 v\u1EA5n giao h\xE0ng t\u1EADn n\u01A1i";
  const groom = order.groomName || "Ch\xFA r\u1EC3";
  const bride = order.brideName || "C\xF4 d\xE2u";
  const weddingDate = order.weddingDate || "Ch\u01B0a r\xF5";
  const size = order.albumSize || order.size || "50 x 35 cm";
  const pageCount = order.pageCount || savedSpreads.length || 1;
  const material = order.materialName || "Album Ru\u1ED9t D\xE0y Si\xEAu S\u1EAFc N\xE9t";
  const notes = order.notes || "Kh\xF4ng c\xF3";
  const now = /* @__PURE__ */ new Date();
  const timeString = now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  const subject = `New Photobook Order Received: ${customerName} (${groom} & ${bride}) - S\u0110T: ${phone}`;
  const spreadsHtml = savedSpreads.map((spread, idx) => `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <strong style="color: #0369a1; font-size: 14px;">\u{1F4C4} Trang ${spread.pageNumber || idx + 1}: ${spread.name}</strong>
        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Chu\u1EA9n in 300 DPI \u0111\u1ED9 n\xE9t cao</div>
      </div>
      <a href="${spread.downloadUrl}" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 600;" target="_blank">
        \u{1F4E5} T\u1EA3i Trang ${spread.pageNumber || idx + 1}
      </a>
    </div>
  `).join("");
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1c1917; background-color: #f5f5f4; margin: 0; padding: 20px; }
    .card { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e7e5e4; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #0284c7, #0ea5e9); padding: 24px 28px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; color: #e0f2fe; }
    .body { padding: 24px 28px; }
    .section-title { font-size: 13px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 10px 0; border-bottom: 2px solid #e0f2fe; padding-bottom: 4px; }
    .section-title:first-child { margin-top: 0; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 14px; }
    .table td { padding: 8px 0; border-bottom: 1px solid #f5f5f4; vertical-align: top; }
    .table td.label { width: 160px; color: #78716c; font-weight: 500; }
    .table td.value { color: #1c1917; font-weight: 600; }
    .highlight { color: #0284c7; font-weight: 700; }
    .btn-container { margin: 22px 0 10px 0; text-align: center; }
    .btn-zalo { display: inline-block; background: #0068ff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; box-shadow: 0 2px 6px rgba(0,104,255,0.3); }
    .folder-box { background: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 12px 16px; font-family: monospace; font-size: 13px; color: #334155; margin: 12px 0; word-break: break-all; }
    .footer { background: #fafaf9; padding: 16px 28px; font-size: 12px; color: #a8a29e; text-align: center; border-top: 1px solid #f5f5f4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>\u{1F514} C\xD3 \u0110\u01A0N \u0110\u1EB6T IN ALBUM M\u1EDAI</h1>
      <p>H\u1EC7 th\u1ED1ng Thi\u1EBFt K\u1EBF & \u0110\u1EB7t In Photobook Vietnam (Ghi nh\u1EADn t\u1EF1 \u0111\u1ED9ng)</p>
    </div>
    <div class="body">
      <div class="section-title">TH\xD4NG TIN KH\xC1CH H\xC0NG & GIAO H\xC0NG</div>
      <table class="table">
        <tr>
          <td class="label">H\u1ECD & T\xEAn kh\xE1ch:</td>
          <td class="value highlight">${customerName}</td>
        </tr>
        <tr>
          <td class="label">S\u1ED1 \u0111i\u1EC7n tho\u1EA1i / Zalo:</td>
          <td class="value"><a href="tel:${phone}" style="color:#0284c7; text-decoration:none; font-size:15px; font-weight:700;">${phone}</a></td>
        </tr>
        <tr>
          <td class="label">Email kh\xE1ch:</td>
          <td class="value">${email}</td>
        </tr>
        <tr>
          <td class="label">\u0110\u1ECBa ch\u1EC9 nh\u1EADn h\xE0ng:</td>
          <td class="value">${address}</td>
        </tr>
        <tr>
          <td class="label">Ghi ch\xFA t\u1EEB kh\xE1ch:</td>
          <td class="value">${notes}</td>
        </tr>
        <tr>
          <td class="label">Th\u1EDDi gian \u0111\u1EB7t:</td>
          <td class="value" style="font-size:12px; color:#78716c;">${timeString}</td>
        </tr>
      </table>

      <div class="section-title">QUY C\xC1CH ALBUM & IN \u1EA4N</div>
      <table class="table">
        <tr>
          <td class="label">D\xE2u R\u1EC3:</td>
          <td class="value highlight">${groom} & ${bride}</td>
        </tr>
        <tr>
          <td class="label">Ng\xE0y c\u01B0\u1EDBi:</td>
          <td class="value">${weddingDate}</td>
        </tr>
        <tr>
          <td class="label">K\xEDch th\u01B0\u1EDBc Album:</td>
          <td class="value">${size}</td>
        </tr>
        <tr>
          <td class="label">T\u1ED5ng s\u1ED1 trang:</td>
          <td class="value">${pageCount} trang</td>
        </tr>
        <tr>
          <td class="label">Ch\u1EA5t li\u1EC7u ru\u1ED9t/b\xECa:</td>
          <td class="value highlight">${material}</td>
        </tr>
      </table>

      <div class="section-title">\u{1F4C1} V\u1ECA TR\xCD L\u01AFU FILE TR\xCAN SERVER</div>
      <p style="font-size: 13px; color: #64748b; margin-top: 4px;">To\xE0n b\u1ED9 file in g\u1ED1c 300 DPI v\xE0 d\u1EEF li\u1EC7u order_details.json \u0111\xE3 \u0111\u01B0\u1EE3c l\u01B0u t\u1EA1i:</p>
      <div class="folder-box">
        \u{1F4C2} <b>${serverFolderPath}</b>
      </div>

      <div class="section-title">\u{1F5BC} DANH S\xC1CH FILE IN T\u1EEANG TRANG (${savedSpreads.length} FILE)</div>
      ${spreadsHtml}

      <div class="btn-container">
        <a href="https://zalo.me/${phone.replace(/[^0-9]/g, "")}" class="btn-zalo" target="_blank">
          \u{1F4AC} B\u1EA5m \u0110\u1EC3 M\u1EDF Chat Zalo V\u1EDBi Kh\xE1ch H\xE0ng (${phone})
        </a>
      </div>
    </div>
    <div class="footer">
      Email th\xF4ng b\xE1o \u0111\u01A1n h\xE0ng t\u1EF1 \u0111\u1ED9ng t\u1EEB PTBVN Album Builder.<br>
      G\u1EEDi t\u1EDBi qu\u1EA3n tr\u1ECB vi\xEAn: <b>${TARGET_EMAILS.join(", ")}</b>.
    </div>
  </div>
</body>
</html>
  `.trim();
  const text = `
NEW PHOTOBOOK ORDER RECEIVED
==============================================
Kh\xE1ch h\xE0ng: ${customerName}
S\u1ED1 \u0111i\u1EC7n tho\u1EA1i: ${phone}
Email: ${email}
\u0110\u1ECBa ch\u1EC9: ${address}
Ghi ch\xFA: ${notes}

QUY C\xC1CH S\u1EA2N PH\u1EA8M:
- D\xE2u R\u1EC3: ${groom} & ${bride}
- Ng\xE0y c\u01B0\u1EDBi: ${weddingDate}
- K\xEDch th\u01B0\u1EDBc: ${size}
- S\u1ED1 trang: ${pageCount} trang
- Ch\u1EA5t li\u1EC7u: ${material}

V\u1ECA TR\xCD L\u01AFU SERVER:
${serverFolderPath}

DANH S\xC1CH FILE IN:
${savedSpreads.map((s) => `- Trang ${s.pageNumber}: ${s.downloadUrl}`).join("\n")}
==============================================
Chat Zalo: https://zalo.me/${phone.replace(/[^0-9]/g, "")}
  `.trim();
  return { subject, html, text };
}
async function handleOrderSubmission(order, baseUrl) {
  const customerName = order.customerDetails?.fullName || order.customerName || "Khach-hang";
  const sanitizedName = customerName.toLowerCase().replace(/[^a-z0-9]/gi, "-").replace(/-+/g, "-");
  const now = /* @__PURE__ */ new Date();
  const dateFolder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
  const timestamp = `${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
  const relativeProjectFolder = `uploads/${dateFolder}/${sanitizedName}_${timestamp}`;
  const absoluteProjectFolder = import_path.default.join(process.cwd(), relativeProjectFolder);
  if (!process.env.VERCEL) {
    try {
      import_fs.default.mkdirSync(absoluteProjectFolder, { recursive: true });
    } catch (e) {
      console.warn("Could not create project folder", e);
    }
  }
  const orderDetails = {
    customerDetails: {
      fullName: customerName,
      phone: order.customerDetails?.phone || order.customerPhone || "",
      email: order.customerDetails?.email || order.customerEmail || "",
      address: order.customerDetails?.address || order.customerAddress || ""
    },
    groomName: order.groomName || "",
    brideName: order.brideName || "",
    weddingDate: order.weddingDate || "",
    albumSize: order.albumSize || order.size || "50x35",
    pageCount: order.pageCount || (order.spreads ? order.spreads.length : 1),
    materialId: order.materialId || "",
    materialName: order.materialName || "",
    notes: order.notes || "",
    createdAt: now.toISOString()
  };
  if (!process.env.VERCEL) {
    try {
      import_fs.default.writeFileSync(
        import_path.default.join(absoluteProjectFolder, "order_details.json"),
        JSON.stringify(orderDetails, null, 2),
        "utf8"
      );
    } catch (e) {
    }
  }
  const savedSpreads = [];
  if (order.spreads && Array.isArray(order.spreads) && order.spreads.length > 0) {
    for (let i = 0; i < order.spreads.length; i++) {
      const spread = order.spreads[i];
      const pageNum = spread.pageNumber || i + 1;
      const fileName = spread.name || `Trang_${String(pageNum).padStart(2, "0")}.jpg`;
      if (spread.dataUrl && spread.dataUrl.startsWith("data:image")) {
        const base64Data = spread.dataUrl.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const filePath = import_path.default.join(absoluteProjectFolder, fileName);
        if (!process.env.VERCEL) {
          try {
            import_fs.default.writeFileSync(filePath, buffer);
          } catch (e) {
          }
        }
        savedSpreads.push({
          name: fileName,
          pageNumber: pageNum,
          downloadUrl: `${baseUrl}/${relativeProjectFolder}/${fileName}`
        });
      }
    }
  } else if (order.designImageData && order.designImageData.startsWith("data:image")) {
    const fileName = `Trang_01.jpg`;
    const base64Data = order.designImageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const filePath = import_path.default.join(absoluteProjectFolder, fileName);
    if (!process.env.VERCEL) {
      try {
        import_fs.default.writeFileSync(filePath, buffer);
      } catch (e) {
      }
    }
    savedSpreads.push({
      name: fileName,
      pageNumber: 1,
      downloadUrl: `${baseUrl}/${relativeProjectFolder}/${fileName}`
    });
  }
  const { subject, html, text } = generateOrderEmailHtml(order, savedSpreads, relativeProjectFolder);
  const targetEmailStr = TARGET_EMAILS.join(", ");
  try {
    const transporter = import_nodemailer.default.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.secure,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
      }
    });
    const mailOptions = {
      from: `"PTBVN Album Builder" <${SMTP_CONFIG.user}>`,
      to: TARGET_EMAILS,
      replyTo: order.customerDetails?.email || order.customerEmail || void 0,
      subject,
      text,
      html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("[SMTP Gmail Success] Order email sent! MessageId:", info.messageId);
    return {
      success: true,
      targetEmail: targetEmailStr,
      projectFolder: relativeProjectFolder,
      savedFiles: savedSpreads
    };
  } catch (err) {
    console.error("[SMTP Gmail Error]", err);
    return {
      success: false,
      targetEmail: targetEmailStr,
      projectFolder: relativeProjectFolder,
      savedFiles: savedSpreads,
      error: err.message
    };
  }
}
var app = (0, import_express.default)();
var PORT = 3e3;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(import_express.default.json({ limit: "150mb" }));
app.use(import_express.default.urlencoded({ limit: "150mb", extended: true }));
app.use("/uploads", import_express.default.static(UPLOADS_DIR));
function getCloudinary() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("B\u1EA1n c\u1EA7n c\u1EA5u h\xECnh CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET trong bi\u1EBFn m\xF4i tr\u01B0\u1EDDng (Environment Variables) tr\xEAn Vercel \u0111\u1EC3 l\u01B0u file \u1EA3nh.");
  }
  import_cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  return import_cloudinary.v2;
}
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    smtpUser: SMTP_CONFIG.user,
    targetEmails: TARGET_EMAILS,
    uploadsDir: UPLOADS_DIR,
    cloudinaryConfigured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
  });
});
app.post("/api/order/init", (req, res) => {
  try {
    const { customerName = "Khach" } = req.body || {};
    const sanitizedName = String(customerName).toLowerCase().replace(/[^a-z0-9]/gi, "-").replace(/-+/g, "-");
    const timestamp = Date.now();
    const orderId = `${sanitizedName}_${timestamp}`;
    res.json({ success: true, projectFolder: orderId });
  } catch (err) {
    console.error("[Order Init Error]", err);
    res.status(500).json({ success: false, error: err.message || "L\u1ED7i kh\u1EDFi t\u1EA1o \u0111\u01A1n h\xE0ng" });
  }
});
app.post("/api/order/sign-upload", (req, res) => {
  try {
    const { folder, public_id } = req.body || {};
    const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(400).json({
        success: false,
        error: "Ch\u01B0a c\u1EA5u h\xECnh bi\u1EBFn m\xF4i tr\u01B0\u1EDDng CLOUDINARY tr\xEAn Vercel (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)."
      });
    }
    const cld = getCloudinary();
    const paramsToSign = {
      timestamp
    };
    if (folder) paramsToSign.folder = folder;
    if (public_id) paramsToSign.public_id = public_id;
    const signature = cld.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    res.json({
      success: true,
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      folder,
      public_id
    });
  } catch (err) {
    console.error("[Sign Upload Error]", err);
    res.status(500).json({ success: false, error: err.message || "L\u1ED7i t\u1EA1o ch\u1EEF k\xFD Cloudinary" });
  }
});
app.post("/api/order/upload-page", async (req, res) => {
  try {
    const { projectFolder, pageNumber, dataUrl } = req.body || {};
    if (!projectFolder || !dataUrl) {
      return res.status(400).json({ success: false, error: "Thi\u1EBFu th\xF4ng tin projectFolder ho\u1EB7c dataUrl" });
    }
    const cld = getCloudinary();
    const fileName = `Trang_${String(pageNumber || 1).padStart(2, "0")}`;
    const folderPath = `photobook_orders/${projectFolder}`;
    const result = await cld.uploader.upload(dataUrl, {
      folder: folderPath,
      public_id: fileName,
      resource_type: "image"
    });
    res.json({ success: true, fileName, url: result.secure_url });
  } catch (err) {
    console.error("[Cloudinary Upload Error]", err);
    res.status(500).json({ success: false, error: err.message || "L\u1ED7i l\u01B0u tr\u1EEF \u1EA3nh l\xEAn Cloudinary" });
  }
});
app.post("/api/order/finalize", async (req, res) => {
  try {
    const { projectFolder, orderData, uploadedPages } = req.body || {};
    if (!projectFolder) {
      return res.status(400).json({ success: false, error: "Thi\u1EBFu th\xF4ng tin projectFolder" });
    }
    const savedSpreads = (uploadedPages || []).map((p) => ({
      name: `Trang_${String(p.pageNumber || 1).padStart(2, "0")}.jpg`,
      pageNumber: p.pageNumber,
      downloadUrl: p.url
    })).sort((a, b) => a.pageNumber - b.pageNumber);
    const { subject, html, text } = generateOrderEmailHtml(orderData || {}, savedSpreads, `Cloudinary Folder: photobook_orders/${projectFolder}`);
    const targetEmailStr = TARGET_EMAILS.join(", ");
    const transporter = import_nodemailer.default.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.secure,
      auth: { user: SMTP_CONFIG.user, pass: SMTP_CONFIG.pass }
    });
    const mailOptions = {
      from: `"PTBVN Album Builder" <${SMTP_CONFIG.user}>`,
      to: TARGET_EMAILS,
      replyTo: orderData?.customerDetails?.email || orderData?.customerEmail || void 0,
      subject,
      text,
      html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("[SMTP Gmail Success] Order finalized and email sent! MessageId:", info.messageId);
    res.json({
      success: true,
      project_folder: projectFolder,
      files: savedSpreads,
      targetEmail: targetEmailStr
    });
  } catch (err) {
    console.error("[Finalize Error]", err);
    res.status(500).json({
      success: false,
      error: err.message || "L\u1ED7i g\u1EEDi email th\xF4ng b\xE1o \u0111\u01A1n h\xE0ng"
    });
  }
});
app.post("/api/order/submit", async (req, res) => {
  const orderData = req.body;
  console.log("=== [NH\u1EACN \u0110\u01A0N \u0110\u1EB6T IN ALBUM M\u1EDAI] === Kh\xE1ch:", orderData.customerDetails?.fullName || orderData.customerName, "S\u0110T:", orderData.customerDetails?.phone || orderData.customerPhone);
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  const baseUrl = `${protocol}://${host}`;
  const result = await handleOrderSubmission(orderData, baseUrl);
  res.json({
    status: result.success ? "success" : "saved_with_email_warning",
    success: result.success,
    message: result.success ? "Project submitted successfully." : "Saved project to server.",
    project_folder: result.projectFolder,
    files: result.savedFiles,
    targetEmail: result.targetEmail,
    error: result.error
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
startServer();
var server_default = app;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
//# sourceMappingURL=server.cjs.map
