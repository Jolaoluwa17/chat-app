import { View, Text, Button, Alert } from "react-native";
import React from "react";
import * as Contacts from "expo-contacts";
import { SafeAreaView } from "react-native-safe-area-context";

const Contact = () => {
  // Function to request permission to access contacts
  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access contacts was denied");
      return false;
    }
    return true;
  };

  // Function to fetch and log contacts
  const getContacts = async () => {
    try {
      const permissionGranted = await requestContactsPermission();
      if (!permissionGranted) return;

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      // Extract and log phone numbers
      const phoneNumbers = data
        .filter(
          (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0
        ) // Ensure phoneNumbers is defined and has values
        .flatMap((contact) =>
          contact.phoneNumbers?.map((number) => number.number)
        );

      console.log("Phone Numbers:", phoneNumbers);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Alert.alert("An error occurred while fetching contacts. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <Text>Contact</Text>
      <Button title="Fetch Contacts" onPress={getContacts} />
    </SafeAreaView>
  );
};

export default Contact;
