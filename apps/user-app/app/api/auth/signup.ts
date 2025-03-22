import { NextApiRequest, NextApiResponse } from "next";
import db from "@repo/db";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone number and password are required" });
  }

  try {
    const existingUser = await db.user.findFirst({ where: { number: phone } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        number: phone,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
