import { listEmails } from "../gmail/list";
import { readEmail } from "../gmail/read";
import { searchEmails } from "../gmail/search";
import { sendEmail } from "../gmail/send";
import { replyEmail } from "../gmail/reply";
import { archiveEmail } from "../gmail/archive";
import { trashEmail } from "../gmail/trash";
import { createLabel } from "../gmail/create-label";
import {
  markAsRead,
  markAsUnread,
  starEmail,
  unstarEmail,
  addLabel,
  removeLabel,
} from "../gmail/labels";
import {
  listAttachments,
  downloadAttachment,
} from "../gmail/attachments";

export class MailService {
  async list(limit = 10) {
    return listEmails(limit);
  }

  async read(messageId: string) {
    return readEmail(messageId);
  }

  async search(query: string, limit = 10) {
    return searchEmails(query, limit);
  }

  async send(options: {
    to: string;
    subject: string;
    body: string;
  }) {
    return sendEmail(options);
  }

  async reply(options: {
    threadId: string;
    messageId: string;
    to: string;
    subject: string;
    body: string;
  }) {
    return replyEmail(options);
  }

  async archive(messageId: string) {
    return archiveEmail(messageId);
  }

  async trash(messageId: string) {
    return trashEmail(messageId);
  }

  async markRead(messageId: string) {
    return markAsRead(messageId);
  }

  async markUnread(messageId: string) {
    return markAsUnread(messageId);
  }

  async star(messageId: string) {
    return starEmail(messageId);
  }

  async unstar(messageId: string) {
    return unstarEmail(messageId);
  }

  async addLabel(messageId: string, labelId: string) {
    return addLabel(messageId, labelId);
  }

  async removeLabel(messageId: string, labelId: string) {
    return removeLabel(messageId, labelId);
  }

  async createLabel(name: string) {
    return createLabel(name);
  }

  async attachments(messageId: string) {
    return listAttachments(messageId);
  }

  async downloadAttachment(
    messageId: string,
    attachmentId: string,
  ) {
    return downloadAttachment(messageId, attachmentId);
  }
}