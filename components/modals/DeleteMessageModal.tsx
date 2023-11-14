"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import axios from "axios";
import { useModal } from "@/store/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import qs from "query-string";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteMessage";

  const deleteServer = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.delete(url);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Message
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete this message?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={() => onClose()}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => deleteServer()}
              variant="danger"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
