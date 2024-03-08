package com.chatapp.model;

import java.time.LocalDateTime;

import com.chatapp.config.AesEncryptor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Convert(converter = AesEncryptor.class)
	private String content;
	
	private LocalDateTime timestamp;
	
	@ManyToOne      // user can create multiple messages. that's why many to one
	private User user;
	
	@ManyToOne
	//@JoinColumn(name="chat_id")
	private Chat chat;
	
}
