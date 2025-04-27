import { auth0 } from "@/lib/auth0";
import { User } from "@auth0/nextjs-auth0/types";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import process from "process";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@jachackscluster.xhe3f5i.mongodb.net/?retryWrites=true&w=majority&appName=jachackscluster`;

export async function PUT(req: NextRequest) {
	const session = await auth0.getSession()
	if (!session) {
		return NextResponse.redirect(new NextURL('/auth/login', req.url))
	}
	let data: { date: Date, cost: number, name: string, description: string, goal: string, pleasureLevel: number, userId: User } = await req.json()

	data.userId = session.user

	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	});

	try {
		await client.connect();
		const database = client.db("data")
		const expenses = database.collection("expenses")
		await expenses.insertOne(data)
		console.log("Added value: " + data)
	}
	finally {
		await client.close();
	}
	return NextResponse.json({

	})

}
