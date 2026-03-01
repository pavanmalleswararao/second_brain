import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
  } catch (error) {
    console.error("signup DB connection failed:", error);
    return Response.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
    });

    return Response.json({ message: "User created", user });
  } catch (err) {
    console.error("signup error:", err);
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}