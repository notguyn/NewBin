"use client";
import {
	Burger,
	Drawer,
	Flex,
	Image,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { ToggleButton } from "./toggle-button";

export function Navbar({ buttons }: { buttons: React.ReactNode }) {
	const theme = useMantineTheme();
	const { colorScheme } = useMantineColorScheme();
	const [opened, setOpened] = useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<>
			<Flex
				top={0}
				w={"100%"}
				gap="sm"
				align={"center"}
				justify={"start"}
				p="sm"
				bg={
					colorScheme === "dark"
						? theme.colors.dark[8]
						: theme.colors.gray[1]
				}
				style={{
					borderBottom: `2px solid ${
						colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[2]
					}`,
				}}
			>
				<Image src={"/favicon.ico"} h={36} alt="logo" />
				{!isMobile ? (
					<>{buttons}</>
				) : (
					<>
						<Burger
							opened={opened}
							onClick={() => setOpened((prev) => !prev)}
						/>
						<Drawer
							opened={opened}
							onClose={() => setOpened(false)}
							padding="md"
							title="Menu"
							position="left"
						>
							<Flex gap="sm" direction={"column"} w={"100%"}>
								{buttons}
							</Flex>
						</Drawer>
					</>
				)}
				<Flex ml="auto">
					<ToggleButton />
				</Flex>
			</Flex>
		</>
	);
}
