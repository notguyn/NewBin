"use client";
import { CodeHighlight } from "@mantine/code-highlight";
import {
	Box,
	TypographyStylesProvider,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import "@mantine/code-highlight/styles.css";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
//TODO - install more plugins for remark and rehype (https://github.com/remarkjs/react-markdown?tab=readme-ov-file#plugins)

interface DisplayContentProps {
	content: string;
	format: string;
}

export function DisplayContent({ content, format }: DisplayContentProps) {
	function formatContent(content: string) {
		const theme = useMantineTheme();
		const { colorScheme } = useMantineColorScheme();

		switch (format) {
			case "Markdown":
				return (
					<TypographyStylesProvider>
						<pre>
							<Markdown
								remarkPlugins={[remarkMath]}
								rehypePlugins={[rehypeKatex]}
							>
								{content}
							</Markdown>
						</pre>
					</TypographyStylesProvider>
				);
			case "Source Code":
				return <CodeHighlight code={content} withCopyButton={true} />;
			default:
				return (
					<Box
						p="sm"
						bg={
							colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[1]
						}
					>
						<pre>{content}</pre>
					</Box>
				);
		}
	}

	return formatContent(content);
}
