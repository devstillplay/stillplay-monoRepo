"use client";

import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import RowActions from "../../components/dashboard/RowActions";

const rows = Array.from({ length: 25 }, (_, index) => ({
  name: "Chisom Kunle",
  code: "#1234BF",
  behaviour: "Good",
  id: index + 1,
}));

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatUser, setChatUser] = useState<null | {
    id: number;
    name: string;
    code: string;
  }>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; sender: "user" | "admin"; text: string; time: string }[]
  >([]);
  const [chatMessage, setChatMessage] = useState("");
  const [deleteConfirmRow, setDeleteConfirmRow] = useState<{
    id: number;
    name: string;
    code: string;
  } | null>(null);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const pageRows = rows.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    if (!chatUser) {
      return;
    }
    setIsChatLoading(true);
    const timeoutId = window.setTimeout(() => {
      setMessages([
        {
          id: 1,
          sender: "user",
          text: "Hi, I need help with my loan approval.",
          time: "09:20",
        },
        {
          id: 2,
          sender: "admin",
          text: "Sure, can you confirm your offline code?",
          time: "09:22",
        },
        {
          id: 3,
          sender: "user",
          text: chatUser.code,
          time: "09:23",
        },
      ]);
      setIsChatLoading(false);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [chatUser]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <DashboardHeader search={search} onSearchChange={setSearch} />

      <Box
        sx={{
          background: "#ffffff",
          borderRadius: { xs: 0, md: 2 },
          padding: { xs: 2, md: 3.5 },
          paddingBottom: { xs: 3, md: 4 },
          marginTop: { xs: 2, md: 3 },
          marginX: { xs: -2, md: 0 },
          minHeight: "calc(100vh - 220px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack sx={{ marginTop: "auto" }} spacing={2}>
          <Box
            sx={{
              borderRadius: 3,
              padding: 2,
              backgroundColor: "#f3f3f3",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              spacing={2}
              sx={{ marginBottom: 2, paddingTop: 2, paddingLeft: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, marginTop: { xs: 1, md: 2 } }}
              >
                USERS
              </Typography>
              <Stack direction="row" spacing={3}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0b7b4c",
                    fontWeight: 600,
                    position: "relative",
                    paddingBottom: 0.5,
                  }}
                >
                  All profiles
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 2,
                      backgroundColor: "#0b7b4c",
                      borderRadius: 999,
                    }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suspended
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                fontSize: 12,
                color: "text.secondary",
                marginBottom: 2,
                backgroundColor: "#fff",
                borderRadius: 999,
                paddingY: 1.2,
                paddingX: 3,
                display: { xs: "none", md: "grid" },
                gridTemplateColumns: { md: "2fr 1fr 1fr 80px" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>Name</Box>
              <Box>Offline code</Box>
              <Box>Behaviour</Box>
              <Box />
            </Box>
            <Box
              sx={{
                marginTop: 1,
                maxHeight: { xs: 420, sm: "none" },
                overflowY: { xs: "auto", sm: "visible" },
              }}
            >
              <Stack spacing={0}>
                {pageRows.map((row, index) => {
                  const absoluteIndex = startIndex + index;
                  return (
                    <Box
                      key={`${row.id}`}
                      onClick={() => setSelectedIndex(absoluteIndex)}
                      sx={{
                        paddingY: 2,
                        paddingX: { xs: 2, md: 3 },
                        borderBottom:
                          index === pageRows.length - 1
                            ? "none"
                            : "1px solid #fff",
                        backgroundColor:
                          selectedIndex === absoluteIndex
                            ? "#ffffff"
                            : "transparent",
                        display: { xs: "flex", md: "grid" },
                        flexDirection: { xs: "column", md: "unset" },
                        gridTemplateColumns: { md: "2fr 1fr 1fr 80px" },
                        alignItems: "center",
                        gap: { xs: 1.5, md: 1 },
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        borderRadius: 1,
                        outline:
                          selectedIndex === absoluteIndex
                            ? "1px solid #32b25c"
                            : "1px solid transparent",
                        outlineOffset: "-1px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          outline: "1px solid #32b25c",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2">{row.name}</Typography>
                      </Stack>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: { xs: "block", md: "none" } }}
                        >
                          Offline code
                        </Typography>
                        <Typography variant="body2">{row.code}</Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: { xs: "block", md: "none" } }}
                        >
                          Behaviour
                        </Typography>
                        {selectedIndex === absoluteIndex ? (
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <RowActions
                              isVisible
                              onChatClick={() => {
                                setChatUser({
                                  id: row.id,
                                  name: row.name,
                                  code: row.code,
                                });
                                setIsChatOpen(true);
                              }}
                              onDeleteClick={() => {
                                setDeleteConfirmRow({
                                  id: row.id,
                                  name: row.name,
                                  code: row.code,
                                });
                              }}
                            />
                          </Box>
                        ) : (
                          <Typography variant="body2">
                            {row.behaviour}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ display: { xs: "none", md: "block" } }} />
                    </Box>
                  );
                })}
              </Stack>
            </Box>
            <Stack alignItems="center" sx={{ marginTop: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => {
                  setPage(value);
                  setSelectedIndex((value - 1) * rowsPerPage);
                }}
                color="primary"
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Drawer
        anchor="right"
        open={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatMessage("");
        }}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 360 },
            padding: 3,
          },
        }}
      >
        <Stack spacing={3} sx={{ height: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={700}>
                {chatUser ? chatUser.name : "User chat"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User ID: {chatUser?.id ?? "--"}
              </Typography>
            </Stack>
            <IconButton
              aria-label="Close chat"
              onClick={() => {
                setIsChatOpen(false);
                setChatMessage("");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f3f3f3",
              borderRadius: 1,
              padding: 2,
              overflowY: "auto",
            }}
          >
            <Stack spacing={2}>
              {isChatLoading ? (
                <Typography color="text.secondary">Loading chat...</Typography>
              ) : (
                messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      alignSelf:
                        message.sender === "admin" ? "flex-end" : "flex-start",
                      backgroundColor:
                        message.sender === "admin" ? "#0b7b4c" : "#ffffff",
                      color:
                        message.sender === "admin" ? "#ffffff" : "text.primary",
                      padding: 1.5,
                      borderRadius: 1,
                      maxWidth: "80%",
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {message.time}
                    </Typography>
                  </Box>
                ))
              )}
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  backgroundColor: "#fff",
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                if (!chatMessage.trim()) return;
                const now = new Date();
                const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
                setMessages((prev) => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    sender: "admin",
                    text: chatMessage.trim(),
                    time,
                  },
                ]);
                setChatMessage("");
              }}
              sx={{
                backgroundColor: "#0b7b4c",
                color: "#fff",
                "&:hover": { backgroundColor: "#096b3d" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Drawer>

      <Dialog
        open={!!deleteConfirmRow}
        onClose={() => setDeleteConfirmRow(null)}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{deleteConfirmRow?.name ?? ""}</strong>? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteConfirmRow(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDeleteConfirmRow(null);
              setSelectedIndex(-1);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
