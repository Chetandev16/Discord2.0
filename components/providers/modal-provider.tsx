"use client";

import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/InviteModal";
import { EditServerModal } from "@/components/modals/EditServerModal";
import { ManageMembers } from "@/components/modals/ManageMembers";
import { CreateChannelModal } from "@/components/modals/CreateChannelModa";
import { LeaveServerModal } from "@/components/modals/LeaveServerModal";
import { DeleteServerModal } from "@/components/modals/DeleteServerModal";
import { DeleteChannelModal } from "@/components/modals/DeleteChannelModal";
import { EditChannelModal } from "@/components/modals/EditChannelModal";
import { MessageFileModal } from "@/components/modals/MessageFileModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMembers />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </>
  );
};
