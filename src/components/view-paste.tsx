"use client";
import { Button, Center, Container, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { DisplayContent } from "./display-content";

interface ViewPasteProps {
	encryptedContent: string;
	format: string;
}

export function ViewPaste({ encryptedContent, format }: ViewPasteProps) {
	const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [visible, { toggle }] = useDisclosure(false);

	useEffect(() => {
		// Check for key in hash
		const hash = window.location.hash.substring(1); // remove #
		if (hash) {
			try {
				const bytes = CryptoJS.AES.decrypt(encryptedContent, hash);
				const originalText = bytes.toString(CryptoJS.enc.Utf8);
				if (originalText) {
					setDecryptedContent(originalText);
				}
			} catch (e) {
				// Failed to decrypt with hash, maybe it's not the key
				console.error("Decryption failed with hash");
			}
		}
	}, [encryptedContent]);

	const handleDecrypt = () => {
		try {
			const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
			const originalText = bytes.toString(CryptoJS.enc.Utf8);
			if (originalText) {
				setDecryptedContent(originalText);
				setError("");
			} else {
				setError("Invalid password or corrupt data");
			}
		} catch (e) {
			setError("Invalid password");
		}
	};

	if (decryptedContent) {
		return <DisplayContent content={decryptedContent} format={format} />;
	}

	return (
		<Container size="xs" mt="xl">
			<Center>
				<Text size="xl" fw={700} mb="md">
					Locked Paste
				</Text>
			</Center>
			<PasswordInput
				label="Enter Password (or Decryption Key)"
				placeholder="Password"
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
				visible={visible}
				onVisibilityChange={toggle}
				error={error}
				mb="md"
			/>
			<Button fullWidth onClick={handleDecrypt}>
				Decrypt
			</Button>
		</Container>
	);
}
