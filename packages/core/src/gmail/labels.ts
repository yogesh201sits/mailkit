import { gmail } from "./client";

export async function addLabel(
  id: string,
  labelId: string
) {
  const res = await gmail.users.messages.modify({
    userId: "me",
    id,
    requestBody: {
      addLabelIds: [labelId],
    },
  });

  return res.data;
}


export async function removeLabel(
  id: string,
  labelId: string
) {
  const res = await gmail.users.messages.modify({
    userId: "me",
    id,
    requestBody: {
      removeLabelIds: [labelId],
    },
  });

  return res.data;
}


export async function markAsRead(id: string) {
  return removeLabel(id, "UNREAD");
}


export async function markAsUnread(id: string) {
  return addLabel(id, "UNREAD");
}


export async function starEmail(id: string) {
  return addLabel(id, "STARRED");
}


export async function unstarEmail(id: string) {
  return removeLabel(id, "STARRED");
}