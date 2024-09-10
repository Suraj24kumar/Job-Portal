import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

console.log("expiry cookies : ", process.env.COOKIE_EXPIRE); // This will now log correctly

export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  // Use COOKIE_EXPIRE from environment variables or default to 5 days if not set
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE) || 5;

  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000 // Convert days to milliseconds
    ),
    httpOnly: true, // Set httpOnly to true for security
    // secure: true, // Uncomment this if you're in a production environment using HTTPS
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
