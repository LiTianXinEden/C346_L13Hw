import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ViewDetails = ({ route, navigation }) => {
    const { rentDate, town, block, streetName, flatType, monthlyRent } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rental Details</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.infoText}>🏙️ <Text style={styles.boldText}>Town:</Text> {town}</Text>
                <Text style={styles.infoText}>🛣️ <Text style={styles.boldText}>Street Name:</Text> {streetName}</Text>
                <Text style={styles.infoText}>📅 <Text style={styles.boldText}>Rent Approval Date:</Text> {rentDate}</Text>
                <Text style={styles.infoText}>🏢 <Text style={styles.boldText}>Block:</Text> {block}</Text>
                <Text style={styles.infoText}>🏠 <Text style={styles.boldText}>Flat Type:</Text> {flatType}</Text>
                <Text style={styles.infoText}>💰 <Text style={styles.boldText}>Monthly Rent:</Text> ${monthlyRent}</Text>
            </View>

            {/* ✅ Back button for navigation */}
            <Button title="Go Back" onPress={() => navigation.goBack()} color="#46448f" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 20,
        color: "#46448f"
    },
    detailsContainer: {
        backgroundColor: "#bac4e7",
        padding: 15,
        borderRadius: 8,
        borderColor: '#46448f',
        borderWidth: 3,
        marginBottom: 20
    },
    infoText: {
        fontSize: 16,
        marginBottom: 8,
        color: "#333",
    },
    boldText: {
        fontWeight: "bold",
        color: "#000"
    }
});

export default ViewDetails;
