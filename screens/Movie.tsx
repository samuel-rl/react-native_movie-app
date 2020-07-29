import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function Movie({ route, navigation }) {
    const { title } = route.params;
	return (
		<View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            </TouchableOpacity>
				<Text>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
	},
});