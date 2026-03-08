import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, BorderRadius, FontSize, Spacing } from '../Utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisabled}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? Colors.primary : '#fff'}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
  size_sm: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2 },
  size_md: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm + 4 },
  size_lg: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md },

  text: { fontWeight: '700', letterSpacing: 0.3 },
  text_primary: { color: '#fff' },
  text_secondary: { color: '#fff' },
  text_outline: { color: Colors.primary },
  text_danger: { color: '#fff' },

  textSize_sm: { fontSize: FontSize.sm },
  textSize_md: { fontSize: FontSize.md },
  textSize_lg: { fontSize: FontSize.lg },
});

export default Button;
