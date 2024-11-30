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

type DialogProps = {
  title: string;
  description: string;
  btnOpen: React.ReactNode;
  confirm: string;
  cancel: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const Dialog = ({
  title,
  description,
  btnOpen,
  confirm,
  cancel,
  onConfirm,
  onCancel,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeDialog();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeDialog();
  };

  return (
    <>
      <button onClick={openDialog} className="cursor-pointer">
        {btnOpen}
      </button>

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
