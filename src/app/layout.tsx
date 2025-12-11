import localFont from "next/font/local";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		template: "%s | NewBin",
		default: "NewBin - Secure, Encrypted Pastebin",
	},
	description:
		"NewBin is a secure, privacy-focused pastebin alternative. Features client-side encryption, burn after reading, and expiration options.",
	keywords: ["pastebin", "encrypted", "privacy", "secure", "code share"],
	authors: [{ name: "NewBin" }],
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "NewBin - Secure, Encrypted Pastebin",
		description:
			"Share text and code securely with client-side encryption and burn-after-reading features.",
		type: "website",
		siteName: "NewBin",
	},
	twitter: {
		card: "summary_large_image",
		title: "NewBin - Secure, Encrypted Pastebin",
		description:
			"Share text and code securely with client-side encryption and burn-after-reading features.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<ColorSchemeScript defaultColorScheme="dark" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MantineProvider defaultColorScheme="dark">
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
