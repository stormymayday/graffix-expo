import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import graffixAPI from "../../api/graffixAPI";

// Getting the height of the device screen
const { height } = Dimensions.get("window");

export default function AVScanQRCodeScreen({ navigation }) {
    // State variables

    // Camera permission status
    const [hasPermission, setHasPermission] = useState(null);

    // Scanned QR code data
    const [scannedData, setScannedData] = useState(null);

    // Controls whether the scanner is active
    const [isScanning, setIsScanning] = useState(true);

    // Indicates if an API request is in progress
    const [isLoading, setIsLoading] = useState(false);

    // Effect hook to request camera permissions when the component mounts
    useEffect(() => {
        (async () => {
            // Requesting permission to use the camera
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            // Updating state based on whether permission was granted
            setHasPermission(status === "granted");
        })();
    }, []);

    // Function to handle successful QR code scan
    const handleBarCodeScanned = ({ type, data }) => {
        // Stop scanning
        setIsScanning(false);

        // Storing the scanned data
        setScannedData(data);

        // Logging the scanned data for debugging
        console.log("Scanned data:", data);
    };

    // Function to handle the "Scan" button press
    const handleScan = async () => {
        // If no QR code has been scanned, resume scanning
        if (!scannedData) {
            setIsScanning(true);
            return;
        }

        // Validating that the scanned data is a valid MongoDB ObjectID
        const objectIdPattern = /^[0-9a-fA-F]{24}$/;
        if (!objectIdPattern.test(scannedData)) {
            // Showing error if invalid
            Alert.alert("Invalid QR Code!");

            // Clearing invalid data
            setScannedData(null);

            // Resuming scanning
            setIsScanning(true);
            return;
        }

        // Starting loading state
        setIsLoading(true);

        try {
            // Fetching treasure data from the API using the scanned QR code
            const response = await graffixAPI.get(
                `/api/v1/treasure/${scannedData}`
            );

            // Debug log
            console.log("API response:", response.data);

            if (response.status === 200 && response.data) {
                // If data is successfully fetched, navigate to the treasure content screen
                navigation.navigate("AVTreasureContentScreen", {
                    treasureData: response.data,
                });
            } else {
                // Showing error if the API request was unsuccessful
                Alert.alert("Failed to fetch treasure data. Please try again.");
            }
        } catch (error) {
            // Logging error for debugging
            console.error("API request error:", error);

            Alert.alert(
                "An error occurred while fetching treasure data. Please check your internet connection and try again."
            );
        } finally {
            // Ending loading state
            setIsLoading(false);

            // Clearing scanned data
            setScannedData(null);

            // Resuming scanning
            setIsScanning(true);
        }
    };

    // Showing loading text while waiting for camera permission
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    // Showing error message if camera permission is denied
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Full-screen barcode scanner */}
            <BarCodeScanner
                onBarCodeScanned={isScanning ? handleBarCodeScanned : undefined}
                style={StyleSheet.absoluteFillObject}
            />
            {/* Overlay with scan UI */}
            <View style={styles.overlay}>
                <View style={styles.contentContainer}>
                    {/* Header text */}
                    <Text style={styles.headerText}>Scan the QR Code</Text>
                    {/* Scan area with corner markers */}
                    <View style={styles.scanArea}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                    {/* Instructions for the user */}
                    <Text style={styles.instructions}>
                        {scannedData
                            ? "QR Code detected. Press 'Scan' to proceed."
                            : "The QR code will be automatically detected when you position it between the guide lines"}
                    </Text>
                </View>
                {/* Scan button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleScan}
                    disabled={isLoading}
                    accessibilityLabel="Scan QR Code"
                    accessibilityHint="Scans the detected QR code or starts scanning if no code is detected"
                >
                    {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Scan</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up all available space
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Position overlay over the entire screen
        backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent black background
        justifyContent: "space-between", // Space content between top and bottom
        paddingVertical: height * 0.1, // Vertical padding based on screen height
    },
    contentContainer: {
        alignItems: "center", // Center items horizontally
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: height * 0.05, // Margin based on screen height
    },
    scanArea: {
        width: 200,
        height: 200,
        position: "relative",
        marginBottom: height * 0.05, // Margin based on screen height
    },
    corner: {
        position: "absolute",
        width: 40,
        height: 40,
        borderColor: "white",
        borderWidth: 3,
    },
    // Styles for each corner of the scan area
    topLeft: {
        top: 0,
        left: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderTopLeftRadius: 20,
    },
    topRight: {
        top: 0,
        right: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopRightRadius: 20,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomLeftRadius: 20,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomRightRadius: 20,
    },
    instructions: {
        textAlign: "center",
        color: "white",
        fontSize: 12,
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    button: {
        backgroundColor: "#000000",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
