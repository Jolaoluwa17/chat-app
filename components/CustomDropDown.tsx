// CustomDropdown.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DropdownProps {
  data: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  placeholder?: string;
  defaultValue?: string; // Add this prop to handle default value
}

const CustomDropdown: React.FC<DropdownProps> = ({
  data,
  onSelect,
  placeholder,
  defaultValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    if (defaultValue) {
      const item = data.find((d) => d.value === defaultValue);
      if (item) {
        setSelectedItem(item);
      }
    }
  }, [defaultValue, data]);

  const handleSelect = (item: { label: string; value: string }) => {
    setSelectedItem(item);
    onSelect(item.value);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.dropdownText}>
          {selectedItem?.label || placeholder || "Select an option"}
        </Text>
        <Ionicons
          name={isVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#333"
        />
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        />
        <View style={styles.dropdownListContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.label}_${item.value}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    zIndex: 99,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdownListContainer: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CustomDropdown;
