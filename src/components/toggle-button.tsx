"use client";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ToggleButton() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	return (
		<ActionIcon
			variant="outline"
			color="gray"
			onClick={() => toggleColorScheme()}
			title="Toggle color scheme"
			size={36}
		>
			{dark ? <IconSun size="1.5rem" /> : <IconMoon size="1.5rem" />}
		</ActionIcon>
	);
}
