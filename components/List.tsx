import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get("window");

interface Movie{
    id: number,
    title: string,
    poster: string,
    note: number
}

interface ListProps {
    movies: Movie[];
}

const List = ({ movies }: ListProps) => {
    return (
        <ScrollView style={styles.container}>
            {movies.map((x) => {
                return (<Text key={x.id} style={styles.movie}>{x.title}</Text>)
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
    },
    movie: {
      fontSize: 22,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
    }
  });


export default List;
