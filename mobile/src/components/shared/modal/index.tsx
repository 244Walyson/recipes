import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PrimaryButton from "../primary-button";

type ModalItems = {
  id: string;
  name: string;
  values?: any;
};

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  data: ModalItems[];
  title: string;
  btnApplyText?: string;
  btnApplyAction?: (selectedItems: string[] | string) => void;
  btnApplyActive?: boolean;
  selectItemsOnOpen?: boolean;
  loading?: boolean;
};

const CustomModal = ({
  visible,
  onClose,
  data,
  title,
  btnApplyText,
  btnApplyAction,
  btnApplyActive,
  selectItemsOnOpen,
  loading,
}: CustomModalProps) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelect = (attribute: string) => {
    if (!btnApplyActive || !btnApplyAction) {
      onClose();
      btnApplyAction && btnApplyAction(attribute);
      return;
    }
    if (selected.includes(attribute)) {
      setSelected(selected.filter((item) => item !== attribute));
      return;
    }
    setSelected([...selected, attribute]);
  };

  const handleApply = () => {
    if (btnApplyAction && selected.length > 0) {
      btnApplyAction(selected);
      setSelected([]);
    }
  };

  useEffect(() => {
    if (selectItemsOnOpen && visible) {
      setSelected(data.map((item) => item.name));
    }
  }, [selectItemsOnOpen, visible, data]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{title}</Text>

          <ScrollView
            contentContainerStyle={styles.itemsContainer}
            style={styles.scrollView}
          >
            {data.map((item) => (
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  selected.includes(item.name) && styles.selectedOption,
                ]}
                key={item.id}
                onPress={() =>
                  handleSelect(item.values ? item.values : item.name)
                }
              >
                <Text style={styles.btnOptText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={[styles.btnWrapper, !btnApplyText && styles.btnAlign]}>
            <PrimaryButton text="Cancelar" onPress={onClose} isActive={false} />
            {btnApplyActive &&
              btnApplyText &&
              btnApplyAction &&
              selected.length > 0 && (
                <PrimaryButton
                  text={btnApplyText}
                  onPress={handleApply}
                  isActive={true}
                  loading={loading}
                />
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
    width: 330,
    maxHeight: 450,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  scrollView: {
    width: "100%",
    maxHeight: 300,
  },
  itemsContainer: {
    alignItems: "center",
    gap: 3,
    paddingBottom: 20,
  },
  optionBtn: {
    width: 250,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedOption: {
    backgroundColor: "#f0f0f0", // cor de fundo para item selecionado
    borderColor: "#007bff", // cor da borda para item selecionado
  },
  btnOptText: {
    fontSize: 16,
  },
  btnAlign: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
  },
});

export default CustomModal;
