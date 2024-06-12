"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";

export const Modal = ({ size = "default", title, description, isOpen, onClose, children }) => {
  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
