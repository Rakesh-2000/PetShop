import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Colors, BorderRadius, FontSize, Spacing } from '../Utils/theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          focused && styles.focused,
          !!error && styles.errorBorder,
        ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textLight}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.icon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.md },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm + 2,
  },
  focused: { borderColor: Colors.primary },
  errorBorder: { borderColor: Colors.error },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 2,
  },
  icon: { paddingLeft: Spacing.sm },
});

export default Input;
