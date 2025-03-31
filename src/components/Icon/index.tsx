import { CharacterIcon } from "@/assets/icons/CharacterIcon";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { RobotIcon } from "@/assets/icons/RobotIcon";
import { theme, ThemeColors } from "@/theme";
import React from "react";
import { Pressable } from "react-native";

const iconRegistry: Record<string, React.ComponentType<IconBase>> = {
  character: CharacterIcon,
  robot: RobotIcon,
  heart: HeartIcon
};

export interface IconProps {
  name: IconName;
  color?: keyof ThemeColors;
  size?: number;
  onPress?: () => void;
}

export interface IconBase {
  size?: number;
  color?: string;
}

type IconType = typeof iconRegistry;
export type IconName = keyof IconType;

export function Icon({ name, color, onPress, size }: IconProps) {
  const SVGIcon = iconRegistry[name];
  const iconColor = color ? theme.colors[color] : theme.colors.black;

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={10}>
        <SVGIcon color={iconColor} size={size} />
      </Pressable>
    );
  }

  return <SVGIcon color={iconColor} size={size} />;
}