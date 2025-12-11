import { Schema, model, models } from "mongoose";

const PasteSchema = new Schema({
	content: {
		type: String,
		required: [true, "Please provide the paste content"],
		maxlength: [100000, "Content cannot be more than 100,000 characters"],
	},
	encryptionKey: {
		type: String,
		required: [true, "Please provide the encryption key"],
	},
	expiresAt: {
		type: Date,
		required: [true, "Please provide an expiration date"],
	},
	format: {
		type: String,
		default: "Plain Text",
	},
	burnAfterReading: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default models.Paste || model("Paste", PasteSchema);
