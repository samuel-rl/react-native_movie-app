import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from './components/Header';

const { width, height } = Dimensions.get('window');

export default function App() {
	const [selected, setSelected] = useState(1);

	return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
            <Header></Header>
			<View style={styles.pager}>
				<ScrollView horizontal decelerationRate="fast" bounces={true} showsHorizontalScrollIndicator={false}>
					<TouchableOpacity activeOpacity={1} onPress={()=>setSelected(1)}>
						<Text style={[styles.label, selected == 1 ? styles.select : null]}>In Theater</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={()=>setSelected(2)}>
						<Text style={[styles.label, selected == 2 ? styles.select : null]}>Box Office</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={()=>setSelected(3)}>
						<Text style={[styles.label, selected == 3 ? styles.select : null, { marginRight:32}]}>Coming Soon</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<StatusBar style="auto" />
		</View>
        </TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pager: {
		marginTop: 48,
	},
	label: {
		marginLeft: 32,
		fontSize: 32,
		color: '#B9B9C5',
	},
	select: {
		color: '#12153D',
	},
});
