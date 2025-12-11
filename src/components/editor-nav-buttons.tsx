import { Button, Checkbox, Divider, PasswordInput, Select } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconDeviceFloppy } from "@tabler/icons-react";

interface EditorNavbarButtonsProps {
	setDuration: (value: string) => void;
	setBurnAfterRead: (value: boolean) => void;
	setFormat: (value: string) => void;
	setPassword: (value: string) => void;
	password: string;
	onSave: () => void;
	loading?: boolean;
}

export function EditorNavbarButtons({
	setDuration,
	setBurnAfterRead,
	setFormat,
	setPassword,
	password,
	onSave,
	loading,
}: EditorNavbarButtonsProps) {
	const [visible, { toggle }] = useDisclosure(false);
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<>
			<Button
				leftSection={<IconDeviceFloppy size={18} />}
				onClick={onSave}
				loading={loading}
			>
				Save
			</Button>
			<Divider orientation="vertical" />
			<Select
				placeholder="Expires in"
				data={[
					"5 minutes",
					"10 minutes",
					"30 minutes",
					"1 hour",
					"12 hours",
					"1 day",
					"3 days",
					"1 week",
					"2 weeks",
					"1 month",
				]}
				allowDeselect={false}
				defaultValue={"1 day"}
				onChange={(value) => setDuration(value || "1 day")}
			/>
			<Divider orientation="vertical" />
			<Checkbox
				label="Burn after read"
				onChange={(event) =>
					setBurnAfterRead(event.currentTarget.checked)
				}
			/>
			<Divider orientation="vertical" />
			<PasswordInput
				placeholder="Enter Password"
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
				visible={visible}
				onVisibilityChange={toggle}
				w={isMobile ? "100%" : "200px"}
				//TODO - see if width implementation could be improved.
			/>
			<Divider orientation="vertical" />
			<Select
				placeholder="Format"
				data={["Plain Text", "Source Code", "Markdown"]}
				allowDeselect={false}
				defaultValue={"Plain Text"}
				onChange={(value, option) => setFormat(value || option.value)}
			/>
		</>
	);
}
