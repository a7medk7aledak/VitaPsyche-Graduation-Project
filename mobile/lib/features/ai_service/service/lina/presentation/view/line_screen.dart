import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:model_viewer_plus/model_viewer_plus.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:flutter_mindmed_project/features/ai_service/service/lina_service.dart';

class LinaScreen extends StatefulWidget {
  const LinaScreen({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<LinaScreen> createState() => _LinaScreenState();
}

class _LinaScreenState extends State<LinaScreen> {
  late stt.SpeechToText _speechToText;
  late FlutterTts _flutterTts;
  final ChatService _chatService = ChatService();

  bool _isListening = false;
  String _userInput = '';
  List<Map<String, String>> messages = [];
  String _cameraOrbit = "90deg 90deg auto";
  final TextEditingController _textController = TextEditingController();
  String _selectedLanguage = 'en';

  @override
  void initState() {
    super.initState();
    _speechToText = stt.SpeechToText();
    _flutterTts = FlutterTts();
    _initializeTts();
    _speakWelcomeMessage();
  }

  Future<void> _initializeTts() async {
    try {
      await _flutterTts
          .setLanguage(_selectedLanguage == 'en' ? "en-US" : "ar-SA");
      await _flutterTts.setPitch(0.6);
      await _flutterTts.setSpeechRate(0.5);
    } catch (e) {
      print("TTS Initialization Error: $e");
    }
  }

  Future<void> _speakWelcomeMessage() async {
    try {
      await _flutterTts.setLanguage("en-US");
      const welcomeMessage =
          "Hi, I am Lina. I am here to help you at any time. Let's get started.";
      await _flutterTts.speak(welcomeMessage);
      setState(() {
        messages.add({'type': 'bot', 'message': welcomeMessage});
      });
    } catch (e) {
      print("TTS Speak Error: $e");
    }
  }

  Future<void> _startListening() async {
    try {
      bool available = await _speechToText.initialize(
        onStatus: (status) => print('Speech status: $status'),
        onError: (error) => print('Speech error: $error'),
      );
      if (available) {
        setState(() => _isListening = true);
        await _speechToText.listen(
          onResult: (result) {
            setState(() {
              _userInput = result.recognizedWords;
              _textController.text = _userInput;
            });
          },
          localeId: _selectedLanguage == 'en' ? "en_US" : "ar_SA",
        );
      } else {
        setState(() => _isListening = false);
        _showSnackBar("Speech recognition not available.");
      }
    } catch (e) {
      print("Speech Recognition Error: $e");
    }
  }

  Future<void> _stopListening() async {
    try {
      setState(() => _isListening = false);
      await _speechToText.stop();
    } catch (e) {
      print("Error stopping listening: $e");
    }
  }

  Future<void> _sendMessage() async {
    if (_textController.text.isNotEmpty) {
      final userMessage = _textController.text;
      setState(() {
        messages.add({'type': 'user', 'message': userMessage});
        _cameraOrbit = "90deg 90deg 1m";
      });

      // Get response from ChatService
      String response = await _chatService.sendMessage(userMessage);

      setState(() {
        messages.add({'type': 'bot', 'message': response});
      });

      await _speakResponse(response);
      _textController.clear();
    }
  }

  Future<void> _speakResponse(String response) async {
    try {
      await _flutterTts
          .setLanguage(_selectedLanguage == 'en' ? "en-US" : "ar-SA");
      await _flutterTts.speak(response);
    } catch (e) {
      print("TTS Speak Error: $e");
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey[50],
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 20, right: 20),
            child: ModelViewer(
              src: 'assets/LinaModel/9.glb',
              cameraOrbit: _cameraOrbit,
              fieldOfView: "100deg",
              ar: true,
              backgroundColor: Colors.transparent,
            ),
          ),
          Column(
            children: [
              Expanded(
                child: ListView.builder(
                  itemCount: messages.length,
                  padding: const EdgeInsets.only(top: 60, left: 16, right: 16),
                  itemBuilder: (context, index) {
                    final message = messages[index];
                    final isUser = message['type'] == 'user';

                    return Align(
                      alignment:
                          isUser ? Alignment.centerRight : Alignment.centerLeft,
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 10),
                        decoration: BoxDecoration(
                          color: isUser ? Colors.blue : Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.1),
                              blurRadius: 5,
                            ),
                          ],
                        ),
                        child: Text(
                          message['message']!,
                          style: TextStyle(
                            color: isUser ? Colors.white : Colors.black87,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              _buildBottomInput(),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBottomInput() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildLanguageSelector(),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _textController,
                  decoration: InputDecoration(
                    hintText: 'Type your message...',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              _buildMicButton(),
              IconButton(
                icon: const Icon(Icons.send),
                color: Colors.blue,
                onPressed: _sendMessage,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLanguageSelector() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text("Language: "),
        DropdownButton<String>(
          value: _selectedLanguage,
          items: const [
            DropdownMenuItem(value: 'en', child: Text("English")),
            DropdownMenuItem(value: 'ar', child: Text("Arabic")),
          ],
          onChanged: (value) {
            if (value != null) {
              setState(() {
                _selectedLanguage = value;
                _initializeTts();
              });
            }
          },
        ),
      ],
    );
  }

  Widget _buildMicButton() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(30),
      ),
      child: IconButton(
        onPressed: _isListening ? _stopListening : _startListening,
        icon: Icon(
          _isListening ? Icons.mic : Icons.mic_off,
          color: Colors.white,
        ),
      ),
    );
  }
}
