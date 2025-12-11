"use client";
import { Navbar } from "@/components/navbar";
import { ViewNavbarButtons } from "@/components/view-nav-buttons";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar buttons={ViewNavbarButtons()} />
			{children}
		</>
	);
}
