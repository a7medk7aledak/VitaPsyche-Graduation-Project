import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:provider/provider.dart';
import '../provider/chat_provider.dart';
// import 'package:flutter_tts/flutter_tts.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

class ChatScreen extends StatefulWidget {
  static const String id = 'chat_screen';

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isLoading = false;
  String _response = '';
  String _animatedResponse = '';
  Timer? _timer;

  // Initialize TTS and STT
  // late FlutterTts _flutterTts;
  late stt.SpeechToText _speechToText;
  bool _isListening = false;

  @override
  void initState() {
    super.initState();
    // _flutterTts = FlutterTts();
    _speechToText = stt.SpeechToText();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _showResponse(String response) {
    _response = response;
    _animatedResponse = '';

    setState(() {
      _isLoading = true;
    });

    int currentIndex = 0;

    _timer = Timer.periodic(Duration(milliseconds: 200), (timer) {
      if (currentIndex < _response.length) {
        setState(() {
          _animatedResponse += _response[currentIndex];
        });
        currentIndex++;
      } else {
        timer.cancel();
        setState(() {
          _isLoading = false;
        });
        _scrollToBottom();
        // _speakResponse(); // Speak the response
      }
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  // Future<void> _speakResponse() async {
  //   try {
  //     await _flutterTts
  //         .setLanguage("en-US"); // Set to English or change based on your needs
  //     await _flutterTts.speak(_response);
  //   } catch (e) {
  //     print("TTS Speak Error: $e");
  //   }
  // }

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
              _controller.text = result.recognizedWords;
            });
          },
          localeId: "en_US", // Set to the desired locale
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

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final chatProvider = Provider.of<ChatProvider>(context);
    final categorizedSessions = chatProvider.categorizedChatSessions;

    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
        backgroundColor: secoundryColor,
        title: const Text('ChatBot Service'),
      ),
      body: Stack(
        children: [
          Column(
            children: [
              Expanded(
                child: ListView.builder(
                  controller: _scrollController,
                  itemCount: chatProvider.currentChat.length + 1,
                  itemBuilder: (context, index) {
                    if (index < chatProvider.currentChat.length) {
                      final message = chatProvider.currentChat[index];
                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 8.0, horizontal: 12.0),
                        child: Row(
                          mainAxisAlignment: message.role == 'user'
                              ? MainAxisAlignment.end
                              : MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (message.role != 'user') ...[
                              CircleAvatar(
                                backgroundColor: secoundryColor,
                                radius: 24,
                                backgroundImage: AssetImage(
                                  'assets/images/Logo.png', // Replace with your bot image path
                                ),
                              ),
                              const SizedBox(width: 10),
                            ],
                            Flexible(
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: message.role == 'user'
                                      ? primaryColor
                                      : const Color.fromARGB(255, 2, 4, 33),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  message.content,
                                  style: TextStyle(
                                    color: message.role == 'user'
                                        ? secoundryColor
                                        : Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    } else {
                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 8.0, horizontal: 12.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // CircleAvatar(
                            //   radius: 24,
                            //   backgroundImage: AssetImage(
                            //     'assets/images/bot_avatar.png', // Replace with your bot image path
                            //   ),
                            // ),
                            const SizedBox(width: 10),
                            Flexible(
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: const Color.fromARGB(255, 2, 4, 33),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  _animatedResponse,
                                  style: const TextStyle(color: Colors.white),
                                ),
                              ),
                            ),
                            if (_isLoading)
                              Padding(
                                padding: const EdgeInsets.only(left: 8.0),
                                child: Image.asset(
                                  'assets/animation/Animation - 1729458511878.gif',
                                  width: 60, // Larger size for visibility
                                  height: 60,
                                ),
                              ),
                          ],
                        ),
                      );
                    }
                  },
                ),
              ),
              _buildInputField(context, chatProvider),
            ],
          ),
          // if (_isLoading)
          //   Center(
          //     child: Image.asset(
          //       'assets/animation/Animation - 1729458511878.gif',
          //       width: 150,
          //       height: 150,
          //     ),
          //   ),
        ],
      ),
      drawer: Drawer(
        child: Container(
          color: const Color.fromARGB(
              255, 2, 4, 33), // Darker background for better contrast
          child: Column(
            children: [
              // Header Section with User Info
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: primaryColor, // Primary color for the header
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20),
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.white,
                          child: Icon(
                            Icons.person,
                            size: 40,
                            color: primaryColor,
                          ),
                        ),
                        const SizedBox(width: 15),
                        const Text(
                          'Welcome, User!',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 15),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Language',
                          style: TextStyle(color: Colors.white, fontSize: 18),
                        ),
                        Row(
                          children: [
                            const Text('EN',
                                style: TextStyle(color: Colors.white)),
                            Switch(
                              value: chatProvider.currentLanguage == 'ar',
                              onChanged: (bool isArabic) {
                                chatProvider
                                    .changeLanguage(isArabic ? 'ar' : 'en');
                                Navigator.pop(context);
                              },
                              activeColor: Colors.white,
                              activeTrackColor: Colors.grey,
                            ),
                            const Text('AR',
                                style: TextStyle(color: Colors.white)),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              // Chat List Section
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(10),
                  itemCount: categorizedSessions.keys.length,
                  itemBuilder: (context, index) {
                    final category = categorizedSessions.keys.elementAt(index);
                    return Container(
                      margin: const EdgeInsets.only(bottom: 15),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(15),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 5,
                            offset: const Offset(0, 3),
                          ),
                        ],
                      ),
                      child: ExpansionTile(
                        title: Row(
                          children: [
                            Icon(
                              Icons.folder,
                              color: primaryColor,
                            ),
                            const SizedBox(width: 10),
                            Text(
                              category,
                              style: const TextStyle(
                                color: const Color.fromARGB(255, 2, 4, 33),
                                fontSize: 18,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        children: categorizedSessions[category]!
                            .asMap()
                            .entries
                            .toList()
                            .reversed
                            .map((entry) {
                          final chatIndex = entry.key;
                          return Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: primaryColor,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                padding:
                                    const EdgeInsets.symmetric(vertical: 10),
                              ),
                              onPressed: () {
                                chatProvider.loadChatSession(chatIndex);
                                Navigator.pop(context);
                              },
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Chat ${chatIndex + 1}',
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 16,
                                    ),
                                  ),
                                  const Icon(
                                    Icons.arrow_forward_ios,
                                    color: Colors.white,
                                    size: 16,
                                  ),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    );
                  },
                ),
              ),
              // Divider
              const Divider(color: Colors.grey),
              // "Add New Chat" Button
              Padding(
                padding: const EdgeInsets.all(15),
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        primaryColor, // Match the primary theme color
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: const EdgeInsets.symmetric(vertical: 15),
                  ),
                  onPressed: () {
                    chatProvider.addNewChatSession();
                    Navigator.pop(context);
                  },
                  icon: const Icon(Icons.add, color: Colors.white),
                  label: const Text(
                    'Add New Chat',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              // Footer Section
              Padding(
                padding: const EdgeInsets.all(10),
                child: Text(
                  'App Version 1.0.0',
                  style: TextStyle(color: Colors.grey.shade400, fontSize: 14),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInputField(BuildContext context, ChatProvider chatProvider) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
      child: Row(
        children: [
          // Input Field
          Expanded(
            child: TextField(
              controller: _controller, // Ensure the controller is set up
              style: const TextStyle(color: Colors.black), // Text color (white)
              decoration: InputDecoration(
                hintText: 'Type your message...',
                hintStyle:
                    const TextStyle(color: Colors.grey), // Hint text style
                filled: true,
                fillColor:
                    secoundryColor, // Background color (ensure it's dark enough)
                contentPadding: const EdgeInsets.symmetric(
                  vertical: 15,
                  horizontal: 20,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                  borderSide: const BorderSide(
                    color: Color.fromARGB(255, 2, 4, 33), // Border color
                    width: 1.5,
                  ),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                  borderSide: const BorderSide(
                    color: Color.fromARGB(
                        255, 2, 4, 33), // Border color when not focused
                    width: 1.5,
                  ),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                  borderSide: const BorderSide(
                    color: primaryColor, // Border color when focused
                    width: 2.0,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 10), // Spacing between input and send button
          // Send Button
          ClipOval(
            child: Material(
              color: primaryColor, // Button background color
              child: InkWell(
                splashColor: Colors.white,
                onTap: () {
                  if (_controller.text.isNotEmpty) {
                    FocusScope.of(context).unfocus();
                    chatProvider.sendMessage(_controller.text);
                    _showResponse('This is a sample response!');
                    _controller.clear();
                    _scrollToBottom();
                  }
                },
                child: const SizedBox(
                  width: 50,
                  height: 50,
                  child: Icon(Icons.send, color: Colors.white),
                ),
              ),
            ),
          ),
          const SizedBox(width: 10), // Spacing between buttons
          // Microphone Button
          ClipOval(
            child: Material(
              color: primaryColor, // Button background color
              child: InkWell(
                splashColor: Colors.white,
                onTap: _isListening ? _stopListening : _startListening,
                child: SizedBox(
                  width: 50,
                  height: 50,
                  child: Icon(
                    _isListening ? Icons.mic : Icons.mic_off,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
