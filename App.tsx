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
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Movie from './screens/Movie';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator
            initialRouteName="Home"
			headerMode="none"
		>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					title: 'Home',
				}}
			/>
			<Stack.Screen
				name="Movie"
				component={Movie}
				options={{
                    title: 'Movie',
				}}
			/>
		</Stack.Navigator>
	);
}


export default function App() {
	return <NavigationContainer>
            <MyStack></MyStack>
    </NavigationContainer>;
}

