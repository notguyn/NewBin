import { ViewPaste } from "@/components/view-paste";
import dbConnect from "@/lib/mongodb";
import Paste from "@/models/Paste";
import { Flex, Text } from "@mantine/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	return {
		title: `Paste ${params.id}`,
		description: "View this secure paste on NewBin.",
		openGraph: {
			title: `Secure Paste ${params.id}`,
			description:
				"This content is encrypted and secure. Click to view on NewBin.",
		},
	};
}

export default async function Page({ params }: { params: { id: string } }) {
	await dbConnect();

	let paste;
	try {
		paste = await Paste.findById(params.id);
	} catch (e) {
		notFound();
	}

	if (!paste) {
		notFound();
	}

	// Check expiration
	if (new Date() > paste.expiresAt) {
		await Paste.findByIdAndDelete(params.id);
		notFound();
	}

	// Handle Burn After Reading
	if (paste.burnAfterReading) {
		await Paste.findByIdAndDelete(params.id);
	}

	return (
		<Flex w={"100%"} h={"100%"} direction={"column"} p="sm">
			{paste.burnAfterReading && (
				<Text c="red" ta="center" mb="sm" fw={700}>
					🔥 This paste has been burned (deleted) after reading!
				</Text>
			)}
			<ViewPaste encryptedContent={paste.content} format={paste.format} />
		</Flex>
	);
}
