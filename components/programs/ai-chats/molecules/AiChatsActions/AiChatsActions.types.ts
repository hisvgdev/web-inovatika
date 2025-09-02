export interface AiChatsActionsProps {
  handleSendMessage: () => void;
  handleOpenModal: (value: boolean) => void;
  handleClearAll: () => void;
  isAwaitingResponse: boolean;
  handleChangeDrawer: () => void;
}