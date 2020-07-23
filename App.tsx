import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Page from './components/Page';

const { width, height } = Dimensions.get('window');

export default function App() {
	const [selected, setSelected] = useState(1);

	return (
		<View style={styles.container}>

			<View style={styles.pager}>
				<ScrollView horizontal decelerationRate="fast" bounces={true} showsHorizontalScrollIndicator={false}>
					<TouchableOpacity activeOpacity={1} onPress={()=>setSelected(1)}>
						<Text style={[styles.label, selected == 1 ? styles.select : null]}>In Theater</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={()=>setSelected(2)}>
						<Text style={[styles.label, selected == 2 ? styles.select : null]}>Box Office</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={()=>setSelected(3)}>
						<Text style={[styles.label, selected == 3 ? styles.select : null]}>Coming Soon</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pager: {
		marginTop: 128,
	},
	label: {
		marginHorizontal: 32,
		fontSize: 32,
		color: '#B9B9C5',
	},
	select: {
		color: '#12153D',
	},
});
