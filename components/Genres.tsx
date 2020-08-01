import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

interface GenresProps {
    genres: { id: number; name: string }[];
}

const Genres = ({ genres } : GenresProps) => {
	return (
		<View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {genres.map((element, i, arr) => {
                    return (<View style={[styles.view, i===0 ? styles.firstElement : null, arr.length - 1 === i ? styles.lastElement : null]} key={i}><Text style={styles.text}>{element.name}</Text></View>)
                })}
            </ScrollView>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
    },
    view: {
        borderWidth: 1,
        borderColor: "#DBDCE1",
        borderRadius: 50,
        marginRight: 12
    },
    text: {
        color: "#434670",
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: height* 0.035/2 - 8,
    },
    firstElement: {
        marginLeft: width *0.06
    }, 
    lastElement: {
        marginRight: width *0.06
    }
});

export default Genres;
