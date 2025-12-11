"use client";
import { Editor } from "@/components/editor";
import { EditorNavbarButtons } from "@/components/editor-nav-buttons";
import { Navbar } from "@/components/navbar";
import {
	Button,
	CopyButton,
	Modal,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	const [duration, setDuration] = useState("1 day");
	const [burnAfterRead, setBurnAfterRead] = useState(false);
	const [format, setFormat] = useState("Plain Text");
	const [password, setPassword] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [createdUrl, setCreatedUrl] = useState("");

	const getExpirationDate = (duration: string) => {
		const now = new Date();
		const minutes = 1000 * 60;
		const hours = minutes * 60;
		const days = hours * 24;

		switch (duration) {
			case "5 minutes":
				return new Date(now.getTime() + 5 * minutes);
			case "10 minutes":
				return new Date(now.getTime() + 10 * minutes);
			case "30 minutes":
				return new Date(now.getTime() + 30 * minutes);
			case "1 hour":
				return new Date(now.getTime() + 1 * hours);
			case "12 hours":
				return new Date(now.getTime() + 12 * hours);
			case "1 day":
				return new Date(now.getTime() + 1 * days);
			case "3 days":
				return new Date(now.getTime() + 3 * days);
			case "1 week":
				return new Date(now.getTime() + 7 * days);
			case "2 weeks":
				return new Date(now.getTime() + 14 * days);
			case "1 month":
				return new Date(now.getTime() + 30 * days);
			default:
				return new Date(now.getTime() + 1 * days);
		}
	};

	const handleSave = async () => {
		if (!content) return;
		setLoading(true);

		try {
			// Generate key or use password
			let key = password;
			let hashPart = "";

			if (!key) {
				key = CryptoJS.lib.WordArray.random(16).toString();
				hashPart = `#${key}`;
			}

			const encrypted = CryptoJS.AES.encrypt(content, key).toString();

			const response = await fetch("/api/paste", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: encrypted,
					expiresAt: getExpirationDate(duration),
					burnAfterReading: burnAfterRead,
					encryptionKey: "client-side", // Placeholder
					format,
				}),
			});

			const data = await response.json();

			if (data.success) {
				const url = `${window.location.origin}/${data.id}${hashPart}`;
				if (burnAfterRead) {
					setCreatedUrl(url);
					open();
				} else {
					router.push(`/${data.id}${hashPart}`);
				}
			} else {
				alert("Failed to save paste");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Paste Created">
				<Stack>
					<Text size="sm">
						Your paste has been created. Since "Burn after reading" is enabled,
						visiting this link will destroy the paste.
					</Text>
					<TextInput
						value={createdUrl}
						readOnly
						rightSection={
							<CopyButton value={createdUrl} timeout={2000}>
								{({ copied, copy }) => (
									<Button
										color={copied ? "teal" : "blue"}
										onClick={copy}
										variant="subtle"
										size="xs"
									>
										{copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
									</Button>
								)}
							</CopyButton>
						}
					/>
				</Stack>
			</Modal>
			<Navbar
				buttons={
					<EditorNavbarButtons
						setDuration={setDuration}
						setBurnAfterRead={setBurnAfterRead}
						setFormat={setFormat}
						setPassword={setPassword}
						password={password}
						onSave={handleSave}
						loading={loading}
					/>
				}
			/>
			<Editor content={content} setContent={setContent} format={format} />
		</>
	);
}
