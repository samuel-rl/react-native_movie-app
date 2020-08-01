import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface InfosProps {
	year: string;
    runtime: number;
    title: string;
}

const timeConvert = (n: number) => {
	const num = n;
	const hours = num / 60;
	const rhours = Math.floor(hours);
	const minutes = (hours - rhours) * 60;
	const rminutes = Math.round(minutes);
	return rhours + 'h' + rminutes + 'min';
};

const Infos = ({ year, runtime, title }: InfosProps) => {

    //TODO = change PD-13 with api

	return (
		<View style={styles.container}>
			<View style={styles.containerTitle}>
    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
				<View style={styles.containerTime}>
					<Text style={styles.littleInfo}>{year.substring(0, 4)}</Text>
					<Text style={styles.littleInfo}>PG-13</Text>
					<Text style={styles.littleInfo}>{timeConvert(runtime)}</Text>
				</View>
			</View>
			<View style={styles.add}>
				<Text style={styles.textAdd}>+</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: width * 0.06,
		height: height * 0.064,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	containerTitle: {
		justifyContent: 'center',
	},
	add: {
		height: height * 0.064,
		width: height * 0.064,
		backgroundColor: '#FE6D8E',
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textAdd: {
		color: '#fff',
		fontSize: 27,
	},
	containerTime: {
		flexDirection: 'row',
	},
	littleInfo: {
		marginRight: width * 0.06,
		color: '#9A9BB2',
		fontSize: height * 0.02,
	},
	title: {
		fontSize: 26,
		color: '#12153D',
        margin: 0,
        maxWidth: width - ((width * 0.06)*2) - (height * 0.064) - 10,
	},
});

export default Infos;
