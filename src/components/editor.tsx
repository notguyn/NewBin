"use client";
import { Box, Button, Flex, Tabs, Textarea, rem } from "@mantine/core";
import { IconEye, IconFileText } from "@tabler/icons-react";
import { DisplayContent } from "./display-content";

interface EditorProps {
	content: string;
	setContent: (value: string) => void;
	format: string;
}

export function Editor({ content, setContent, format }: EditorProps) {
	const iconStyle = { width: rem(14), height: rem(14) };

	return (
		<>
			<Flex pos={"relative"} direction={"column"} h={"100%"}>
				<Tabs defaultValue="content" h={"100%"} w={"100%"} p={"sm"}>
					<Tabs.List>
						<Tabs.Tab
							value="content"
							leftSection={<IconFileText style={iconStyle} />}
						>
							Content
						</Tabs.Tab>
						<Tabs.Tab
							value="preview"
							leftSection={<IconEye style={iconStyle} />}
						>
							Preview
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="content" h={"100%"}>
						<Textarea
							pt={"xs"}
							placeholder="Content"
							autosize
							autoFocus
							minRows={10}
							maxRows={Number.POSITIVE_INFINITY}
							value={content}
							onChange={(event) =>
								setContent(event.currentTarget.value)
							}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="preview">
						<Box p={"xs"}>
							<DisplayContent content={content} format={format} />
						</Box>
					</Tabs.Panel>
				</Tabs>
			</Flex>
		</>
	);
}
