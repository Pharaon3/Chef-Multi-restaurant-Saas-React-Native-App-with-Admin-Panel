import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import { theme } from "../constants";

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      label,
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      logo,
      center,
      right,
      spacing,
      height,
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      text,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      label && styles.label,
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      logo && styles.logo,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray && styles.text,
      gray2 && styles.gray2,
      style
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({

  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    fontFamily: 'Roboto-Regular',
  },
  regular: {
    fontWeight: "normal"
  },
  bold: {
    fontWeight: "bold"
  },
  semibold: {
    fontWeight: "500"
  },
  medium: {
    fontWeight: "500"
  },
  light: {
    fontWeight: "200"
  },

  label:{
    textTransform:'uppercase',
    fontFamily: 'Roboto-Regular',
  },


  center: { textAlign: "center" },
  right: { textAlign: "right" },

  accent: { color: theme.colors.accent },
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  tertiary: { color: theme.colors.tertiary },
  black: { color: theme.colors.black },
  white: { color: theme.colors.white },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
  text:{ color:theme.colors.text},
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small,
  logo:theme.fonts.logo
});
