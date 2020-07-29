import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface HeaderProps {}

const Header = () => {
	const [value, onChangeText] = React.useState('');

	const _keyboardDidHide = () => {
		onChangeText('');
	};

	useEffect(() => {
		Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
	}, []);

	const research = useRef();

	return (
		<View style={styles.cont}>
			<Ionicons name="md-menu" size={24}></Ionicons>
			<TextInput
				multiline={false}
				onChangeText={(text) => onChangeText(text)}
				style={styles.textInput}
				value={value}
				ref={research}
			></TextInput>
			<TouchableOpacity onPress={() => research.current.focus()}>
				<Ionicons name="md-search" size={24}></Ionicons>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	cont: {
		marginTop: 56,
		height: 24,
		marginHorizontal: 32,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textInput: {
		width: width - 24 * 2 - 32 - 2 - 40,
		textAlign: 'center',
		marginBottom: 0,
	},
});

export default Header;
