import clsx from "clsx";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Pressable, View } from "react-native";

import Button from "~/components/Button";
import IconButton from "~/components/IconButton";
import Label from "~/components/Inputs/Label";
import ScrollView from "~/components/ScrollView";
import { isTruthy } from "~/utils/typescript";

export type ImageInputProps = {
	initialImages?: string[];
	onChange: (images: string[]) => void;
};

function ImageInput({ initialImages = [], onChange }: ImageInputProps) {
	const [images, setImages] = useState<{ base64: string; uri: string }[]>(
		initialImages.map((i) => ({ base64: i, uri: i })),
	);

	async function openImagePicker() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: true,
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			const pickedImages = result.assets
				.map((asset) => {
					if (!asset.base64) return null;
					return { base64: asset.base64, uri: asset.uri };
				})
				.filter(isTruthy);

			setImages((prev) => [...prev, ...pickedImages]);
		}
		onChange?.(images.map((i) => i.uri));
	}

	function removeImage(index: number) {
		const newImages = images.filter((_, i) => i !== index);
		setImages(newImages);
		onChange?.(images.map((i) => i.uri));
	}

	return (
		<View className="mb-4">
			<View className="flex-row items-center justify-between mb-1">
				<Label className="mt-1">Images</Label>
				<Button onPress={openImagePicker} variant="ghost">
					Add images
				</Button>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle="pl-2 g-4 pt-2 items-end"
			>
				{!images.length && (
					<Pressable
						onPress={openImagePicker}
						className="flex-row items-center justify-center w-32 h-32 bg-gray-100 rounded"
					>
						<IconButton icon="plus" size="large" />
					</Pressable>
				)}
				{images.map((i, index) => (
					<View id={nanoid()} key={i.uri}>
						<Image
							className={clsx("w-24 h-24 rounded", {
								"w-32 h-32": index === 0,
							})}
							source={i.uri}
							placeholder="gray"
						/>
						<IconButton
							icon="minus"
							onPress={() => removeImage(index)}
							className="absolute top-[-7.5] left-[-7.5] bg-acapulco-200"
						/>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

export default ImageInput;
