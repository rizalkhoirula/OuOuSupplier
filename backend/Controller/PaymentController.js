const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

exports.initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Read Octaverse info
    const octaverseInfoPath = path.join(__dirname, "..", "octaverse_info.json");
    const octaverseInfo = JSON.parse(
      fs.readFileSync(octaverseInfoPath, "utf-8")
    );
    const { MerchantID } = octaverseInfo;

    // JWT payload expected by Octoverse
    const payload = {
      iss: "payment-api-gw-system",
      sub: MerchantID,
      exp: Math.floor(Date.now() / 1000) + 300, // expires in 5 mins
    };

    // Generate JWT with alg none
    let token = jwt.sign(payload, null, { algorithm: "none" });
    // Remove trailing dot if present (some libs add '.' for no signature)
    if (token.endsWith(".")) token = token.slice(0, -1);

    res.json({
      token,
      paymentGatewayUrl: "https://test.octoverse.com.mm/payment",
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};
