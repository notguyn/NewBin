import dbConnect from "@/lib/mongodb";
import Paste from "@/models/Paste";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		await dbConnect();
		const body = await req.json();
		const { content, expiresAt, burnAfterReading, encryptionKey, format } = body;

		if (!content) {
			return NextResponse.json(
				{ error: "Content is required" },
				{ status: 400 },
			);
		}

		// Create new paste
		const paste = await Paste.create({
			content,
			expiresAt: new Date(expiresAt), // Ensure date format
			burnAfterReading: burnAfterReading || false,
			encryptionKey: encryptionKey || "client-side", // Fallback if not provided, but model requires it
			format: format || "Plain Text",
		});

		return NextResponse.json(
			{ success: true, id: paste._id },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating paste:", error);
		return NextResponse.json(
			{ error: "Failed to create paste" },
			{ status: 500 },
		);
	}
}
