import { ContentType } from "@/components/account/organism/AccountSettings/AccountSettings.types";
import { atom } from "jotai";

export const isModalOpen = atom(false);
export const modalType = atom<ContentType>('credentials');
export const modalSetPassFromTg = atom(false);