import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

interface PlotProps {
	plot: string;
}

const Plot = ({ plot }: PlotProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.titlePlot}>Plot Summary</Text>
			<Text numberOfLines={3} ellipsizeMode='tail' style={styles.plot}>{plot}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        marginHorizontal: width *0.06
    },
    titlePlot: {
        fontSize: 24,
        color: "#12153D",
        marginBottom: 16
    },
    plot: {
        fontSize: 14,
        color: "#737599"
    }
});

export default Plot;
