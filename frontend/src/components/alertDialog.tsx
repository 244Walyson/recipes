import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Dialog = ({
  title,
  description,
  btnOpen,
  confirm,
  cancel,
  onConfirm, // Função para chamar ao confirmar
  onCancel, // Função para chamar ao cancelar
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // Chama a função de confirmação se fornecida
    }
    closeDialog(); // Fecha o diálogo
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Chama a função de cancelamento se fornecida
    }
    closeDialog(); // Fecha o diálogo
  };

  return (
    <>
      {/* Renderizar o botão de abertura sem AlertDialogTrigger */}
      <div onClick={openDialog} className="cursor-pointer">
        {btnOpen}
      </div>

      {/* Controlar a visibilidade do diálogo com o estado */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dialog;
