
import React, { useState, useEffect } from "react";
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const Home = ({ navigation }) => {

    const [mydata, setMyData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    const [offset, setOffset] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const limit = 100;  // Number of records to fetch per request
    const resourceID = "d_c9f57187485a850908655db0e8cfe651";  // API resource ID for rental data

    useEffect(() => {
        fetchMoreData();
    }, []);

    const fetchMoreData = async () => {
        if (loadingMore) return;
        setLoadingMore(true);

        try {
            const response = await fetch(
                `https://data.gov.sg/api/action/datastore_search?resource_id=d_c9f57187485a850908655db0e8cfe651`
            );
            const json = await response.json();
            const records = json.result.records;

            if (records.length === 0) return;

            // Filter out duplicates before adding to state
            const uniqueRecords = records.filter(newItem =>
                !mydata.some(existingItem => existingItem._id === newItem._id)
            );

            setMyData(prevData => [...prevData, ...uniqueRecords]);
            setOriginalData(prevData => [...prevData, ...uniqueRecords]); // For filtering
            setOffset(prevOffset => prevOffset + limit);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    //search bar for town
    const FilterData = (text) => {
        if (text !== "") {
            let filteredData = originalData.filter((item) =>
                item.town.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(filteredData);
        } else {
            setMyData(originalData);
        }
    };
    //search bar for flat type
    const FilterDataFlat = (text) => {
        if (text !== "") {
            let filteredDataFlat = originalData.filter((item) =>
                item.flat_type && item.flat_type.toLowerCase().includes(text.toLowerCase()) // ✅ Ensures flat_type exists
            );
            setMyData(filteredDataFlat);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate("ViewDetails", {
                        key: item._id,
                        rentDate: item.rent_approval_date,
                        town: item.town,
                        block: item.block,
                        streetName: item.street_name,
                        flatType: item.flat_type,
                        monthlyRent: item.monthly_rent
                    });
                }}
            >
                <Text style={styles.infoText}>🏙️ <Text style={styles.boldText}>Town:</Text> {item.town}</Text>
                <Text style={styles.infoText}>🛣️ <Text style={styles.boldText}>Flat Type:</Text> {item.flat_type}</Text>
                <Text style={styles.infoText}>📅 <Text style={styles.boldText}>Rent Approval Date:</Text> {item.rent_approval_date}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            {/* App Title */}
            <Text style={styles.title}>
                <Icon name="building" size={20} color="#13a794" /> HDB Rental Listings <Icon name="building" size={20} color="#13a794" />
            </Text>
            {/* Search Inputs */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search by town..."
                placeholderTextColor="#aaa"
                onChangeText={FilterData}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Search by Flat Type..."
                placeholderTextColor="#aaa"
                onChangeText={FilterDataFlat}
            />
            {/* List of rental flats */}
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => item._id ? item._id.toString() : `fallback-key-${index}`} // ✅ Prevents duplicates
                contentContainerStyle={{ paddingBottom: 20 }}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.loader} size="large" color="#13a794" /> : null}
            />
        </View>
    );
};
//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 10
    },
    searchInput: {
        height: 40,
        borderColor: "#bac4e7",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    itemContainer: {
        backgroundColor: "#bac4e7",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#46448f',
        borderWidth: 3,
    },
    boldText: {
        fontWeight: "bold",
        color: "#000"
    },
    loader: {
        paddingVertical: 20
    }
});
export default Home;
