import { AiModalSpecificEnum } from "@/components/programs/ai-chats/molecules/AiModalSpecific/AiModalSpecific.types";
import { atom } from "jotai";

export const sendWsMessage = atom('');
export const isWsConnected = atom(false);
export const isModalSpecificOpen = atom(false);

export const atomSelectedSpecific = atom<AiModalSpecificEnum>(AiModalSpecificEnum.noSpecifics)
export const atomInternetSearch = atom<'default' | 'web_search'>('default');
export const atomFinishedChooseSettings = atom(false);
export const idFromCreateChat = atom("");