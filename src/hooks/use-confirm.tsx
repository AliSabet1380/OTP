"use client";

import { JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

interface ConfirmProps {
  title: string;
  description?: string;
}

export const useConfirm = ({
  title,
  description,
}: ConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const onClose = () => {
    setPromise(null);
  };

  const onConfirm = () => {
    promise?.resolve(true);
    onClose();
  };
  const onCancel = () => {
    promise?.resolve(false);
    onClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={promise !== null} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="pt-5 gap-1">
          <Button variant="outline" color="neutral" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
