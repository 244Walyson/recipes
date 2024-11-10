import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import TouchableModal from "./touchable-model";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  attributes: any[];
  title: string;
  btnApplyText?: string;
  btnApplyAction?: () => void;
};

const CustomModal = ({
  visible,
  onClose,
  attributes,
  title,
  btnApplyText,
  btnApplyAction,
}: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Este é um modal!</Text>

          <View style={styles.container}>
            {attributes.map((attribute) => (
              <TouchableModal
                key={attribute}
                text={attribute}
                onPress={onClose}
              />
            ))}
          </View>

          <View style={[styles.btnWrapper, !btnApplyText && styles.btnAlign]}>
            <TouchableOpacity style={[styles.closeButton]} onPress={onClose}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
            {btnApplyText && btnApplyAction && (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>{btnApplyText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  container: {
    width: "100%",
    borderRadius: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    width: 120,
    alignItems: "center",
  },
  btnAlign: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default CustomModal;
