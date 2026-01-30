"use client";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Stack } from "@mui/material";

type RowActionsProps = {
  isVisible: boolean;
  onChatClick?: () => void;
  onDeleteClick?: () => void;
};

export default function RowActions({
  isVisible,
  onChatClick,
  onDeleteClick,
}: RowActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <IconButton size="small" onClick={onChatClick} aria-label="Open chat">
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={onDeleteClick} aria-label="Delete user">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
