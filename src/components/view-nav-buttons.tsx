"use client";
import { Button, Divider } from "@mantine/core";
import { IconFile, IconFilePlus } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function ViewNavbarButtons() {
	const { id } = useParams();

	return (
		<>
			<Divider orientation="vertical" />
			<Button
				leftSection={<IconFilePlus size="14" />}
				component={Link}
				href="/"
			>
				New
			</Button>
		</>
	);
}
