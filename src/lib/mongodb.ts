import { type Connection, connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local",
	);
}

interface MongooseCache {
	conn: Connection | null;
	promise: Promise<Connection> | null;
}

const cached: MongooseCache = (global as any).mongoose || {
	conn: null,
	promise: null,
};

if (!(global as any).mongoose) {
	(global as any).mongoose = cached;
}

async function dbConnect(): Promise<Connection> {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = connect(MONGODB_URI!).then((mongoose) => {
			return mongoose.connection;
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
