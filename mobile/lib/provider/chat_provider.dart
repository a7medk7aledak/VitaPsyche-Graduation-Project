import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../models/message_model.dart';

class ChatProvider with ChangeNotifier {
  final String _apiUrl = 'https://api-inference.huggingface.co/models/gpt2';
  final String _apiKey = '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';

  List<List<MessageModel>> _chatSessions = []; // Holds all chat sessions
  List<MessageModel> _currentChat = []; // Current active chat session
  bool _isSaved = false; // Flag to track if current session is saved
  String _currentLanguage = 'en'; // Default language

  List<Color> _chatColors = [
    Colors.blueAccent,
    Colors.greenAccent,
    Colors.redAccent,
    Colors.orangeAccent,
    Colors.purpleAccent,
    Colors.tealAccent,
    Colors.yellowAccent,
  ];

  List<List<MessageModel>> get chatSessions => _chatSessions;
  List<MessageModel> get currentChat => _currentChat;
  String get currentLanguage => _currentLanguage;

  /// Send a message and handle both request and response
  Future<void> sendMessage(String userMessage) async {
    _saveMessage('user', userMessage); // Add user's message

    // Add a loading message for the bot
    _saveMessage('bot', '', isLoading: true); // Add loading state

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
        _updateBotResponse(reply); // Update the bot's response
      } else {
        _updateBotResponse("Error: ${response.body}");
      }
    } catch (e) {
      _updateBotResponse("Error: $e");
    }
  }

  void _updateBotResponse(String content) {
    // Find the last loading message and replace it with the actual response
    for (int i = _currentChat.length - 1; i >= 0; i--) {
      if (_currentChat[i].role == 'bot' && _currentChat[i].isLoading) {
        _currentChat[i] =
            MessageModel(role: 'bot', content: content); // Update content
        break;
      }
    }
    notifyListeners(); // Update the UI
  }

  /// Helper method to save a message in the current chat session
  void _saveMessage(String role, String content, {bool isLoading = false}) {
    _currentChat
        .add(MessageModel(role: role, content: content, isLoading: isLoading));
    _isSaved = false; // Mark session as unsaved when a new message is added
    notifyListeners(); // Update the UI
  }

  /// Save the current chat session only if not already saved
  void _saveCurrentChat() {
    if (!_isSaved && _currentChat.isNotEmpty) {
      // Color chatColor = getRandomChatColor(); // Get a random color
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

  Map<String, List<List<MessageModel>>> get categorizedChatSessions {
    Map<String, List<List<MessageModel>>> categorizedSessions = {
      'Today': [],
      'Yesterday': [],
      'Last 7 Days': [],
      // 'Last Month': [],
      // 'Older': [],
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

  /// Method to change the language
  void changeLanguage(String newLanguage) {
    _currentLanguage = newLanguage;
    notifyListeners(); // Notify listeners to update the UI
  }

  /// Method to add a message to the current chat
  void addMessageToChat(String content, String role) {
    _currentChat
        .add(MessageModel(role: role, content: content)); // Add the message
    notifyListeners(); // Notify listeners to update the UI
  }

  /// Method to get a random color for a chat session
  Color getRandomChatColor() {
    return _chatColors[
        DateTime.now().millisecondsSinceEpoch % _chatColors.length];
  }
}
