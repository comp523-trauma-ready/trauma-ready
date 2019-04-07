import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

export default class Directory extends React.Component {
    static navigationOptions = {
        title: "Directory",
    }

    render() {
        return (
            <View style={styles.container}>
              <SectionList
                renderItem={({item, index, section}) => <Text style={styles.item} key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => <Text style={styles.header}>{title}</Text>}
                sections={[
                    {title: 'Title1', data: ['item1', 'item2']},
                    {title: 'Title2', data: ['item3', 'item4']},
                    {title: 'Title3', data: ['item5', 'item6']},
                ]}
                keyExtractor={(item, index) => item + index} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 4,
        marginBottom: 4,
    },
    item: {
        margin: 8,
    }
});
