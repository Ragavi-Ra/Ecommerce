import React from 'react';
import { TouchableHighlight, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#d0d0d0"
      style={[styles.button, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4e4d4dff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#e6e6e6',
    fontWeight: '600',
    fontSize: 16,
  },
});
