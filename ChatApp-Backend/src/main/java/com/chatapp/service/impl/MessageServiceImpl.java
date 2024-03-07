package com.chatapp.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatapp.exception.ChatException;
import com.chatapp.exception.MessageException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Chat;
import com.chatapp.model.Message;
import com.chatapp.model.User;
import com.chatapp.repository.MessageRepository;
import com.chatapp.request.SendMessageReq;
import com.chatapp.service.ChatService;
import com.chatapp.service.MessageService;
import com.chatapp.service.UserService;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private ChatService chatService;
	
	@Override
	public Message sentMessage(SendMessageReq req) throws UserException, ChatException {
		
		User user = this.userService.finyById(req.getUserId());
		Chat chat = this.chatService.findChatById(req.getChatId());
		
		Message message = new Message();
		message.setChat(chat);
		message.setUser(user);
		message.setContent(req.getContent());
		message.setTimestamp(LocalDateTime.now());
		message = this.messageRepository.save(message);
		return message;
	}

	@Override
	public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException {
		Chat chat = this.chatService.findChatById(chatId);
		
		if(!chat.getUsers().contains(reqUser)) {
			throw new UserException("You are not related to this chat"+ chat.getId());
		}
		
		List<Message> messages = this.messageRepository.findByChatId(chat.getId());
		
		return messages;
	}

	@Override
	public Message findMessageById(Integer messageId) throws MessageException {
		Message message = this.messageRepository.findById(messageId)
				.orElseThrow(() -> new MessageException("The required message is not found"));
		return message;
	}

	@Override
	public void deleteMessage(Integer messageId, User reqUser) throws MessageException {
		Message message = this.messageRepository.findById(messageId)
				.orElseThrow(() -> new MessageException("The required message is not found"));

		if (message.getUser().getId().equals(reqUser.getId())) {
			this.messageRepository.delete(message);
		}

		throw new MessageException("You are not authorized for this task");
	}
}
