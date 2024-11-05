import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../models/message_model.dart';

class ChatProvider with ChangeNotifier {
  final String _apiUrl = 'https://api-inference.huggingface.co/models/gpt2';
  final String _apiKey = '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';

  List<List<Message>> _chatSessions = []; // Holds all chat sessions
  List<Message> _currentChat = []; // Current active chat session
  bool _isSaved = false; // Flag to track if current session is saved

  List<List<Message>> get chatSessions => _chatSessions;
  List<Message> get currentChat => _currentChat;

  /// Send a message and handle both request and response
  Future<void> sendMessage(String userMessage) async {
    _saveMessage('user', userMessage); // Add user's message

    try {
      final response = await http.post(
        Uri.parse(_apiUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_apiKey',
        },
        body: jsonEncode({
          "inputs": userMessage,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        String reply = data[0]['generated_text'];
        _saveMessage('assistant', reply); // Add assistant's reply
      } else {
        _saveMessage('assistant', "Error: ${response.body}");
      }
    } catch (e) {
      _saveMessage('assistant', "Error: $e");
    }
  }

  /// Helper method to save a message in the current chat session
  void _saveMessage(String role, String content) {
    _currentChat.add(Message(role: role, content: content));
    _isSaved = false; // Mark session as unsaved when a new message is added
    notifyListeners(); // Update the UI
  }

  /// Save the current chat session only if not already saved
  void _saveCurrentChat() {
    if (!_isSaved && _currentChat.isNotEmpty) {
      _chatSessions.add(List.from(_currentChat)); // Save the session
      _isSaved = true; // Mark session as saved
    }
  }

  /// Clear the current chat session and save it if needed
  void clearCurrentChat() {
    _saveCurrentChat(); // Ensure session is saved before clearing
    _currentChat.clear(); // Clear the chat
    notifyListeners();
  }

  /// Start a new chat session, saving the previous one if necessary
  void addNewChatSession() {
    clearCurrentChat(); // Save and clear the previous session
    _isSaved = false; // Reset the saved flag for the new session
  }

  /// Load a previous chat session by index
  void loadChatSession(int index) {
    if (index < _chatSessions.length) {
      _currentChat = List.from(_chatSessions[index]); // Load selected session
      _isSaved = true; // Mark the loaded session as saved
      notifyListeners();
    }
  }

  Map<String, List<List<Message>>> get categorizedChatSessions {
    Map<String, List<List<Message>>> categorizedSessions = {
      'Today': [],
      'Yesterday': [],
      'Last 7 Days': [],
      'Last Month': [],
      'Older': [],
    };

    DateTime now = DateTime.now();

    for (var chatSession in _chatSessions) {
      if (chatSession.isNotEmpty) {
        DateTime sessionDate = chatSession.first.timestamp;

        if (sessionDate.isAfter(now.subtract(Duration(days: 1))) &&
            sessionDate.isBefore(now)) {
          categorizedSessions['Today']!.add(chatSession);
        } else if (sessionDate.isAfter(now.subtract(Duration(days: 2))) &&
            sessionDate.isBefore(now.subtract(Duration(days: 1)))) {
          categorizedSessions['Yesterday']!.add(chatSession);
        } else if (sessionDate.isAfter(now.subtract(Duration(days: 7)))) {
          categorizedSessions['Last 7 Days']!.add(chatSession);
        } else if (sessionDate.isAfter(now.subtract(Duration(days: 30)))) {
          categorizedSessions['Last Month']!.add(chatSession);
        } else {
          categorizedSessions['Older']!.add(chatSession);
        }
      }
    }

    return categorizedSessions;
  }
}
