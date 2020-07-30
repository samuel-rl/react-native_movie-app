import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface NotesProps {
	note: number;
    nbNote: number;
    popularity: number;
}

const Notes = ({ note, nbNote, popularity }: NotesProps) => {

    //TODO: change critic reviews

	return (
		<View style={styles.container}>
			<View style={styles.un}>
				<AntDesign name="star" size={height*0.1*0.3} color="#FCC419" />
				<Text style={{ color: '#434670', fontSize: 12 }}>
					<Text style={{ color: '#12153D', fontSize:15 }}>{note}</Text>/10
				</Text>
				<Text style={{ color: '#9A9BB2', fontSize:12 }}>{nbNote}</Text>
			</View>
			<View style={styles.deux}>
				<AntDesign name="staro" size={height*0.1*0.3} color="#434670" />
				<Text style={{ color: '#12153D' }}>Rate This</Text>
			</View>
			<View style={styles.trois}>
                <View style={styles.greenView}>
    <Text style={{ color: '#FFF', fontSize:14, textAlign: 'center' }} >{Math.floor(popularity)}</Text>
                </View>
				<Text>Metascore</Text>
				<Text  style={{ color: '#9A9BB2', fontSize:12 }}>{nbNote} critic reviews</Text>
			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		width: width * 0.93,
		height: height * 0.1,
		shadowColor: '#000',
		shadowOffset: {
			width: 3,
			height: 10,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 7,
		borderBottomLeftRadius: 50,
		borderTopLeftRadius: 50,
		flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
	},
	un: {
		alignItems: 'center',
	},
	deux: {
		alignItems: 'center',
	},
	trois: {
        alignItems: 'center',
    },
    greenView:{
        backgroundColor: "#51CF66",
        width: 28,
        height: 24,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Notes;
