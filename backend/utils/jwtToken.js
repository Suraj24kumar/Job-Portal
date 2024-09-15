import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

console.log("Expiry cookies: ", process.env.COOKIE_EXPIRE); // Logs the expiry value from environment variables

export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  // Ensure COOKIE_EXPIRE is a valid number or default to 5 days
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 5;

  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000 // Convert days to milliseconds
    ),
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', // Secure flag only in production
    sameSite: 'None', // Ensures the cookie is only sent for same-site requests
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
