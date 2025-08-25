import jwt from "jsonwebtoken";

export function generateTokens(userId: string) {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
}
