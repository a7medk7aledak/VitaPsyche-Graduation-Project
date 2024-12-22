import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:provider/provider.dart';
import '../provider/chat_provider.dart';

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

    _timer = Timer.periodic(Duration(milliseconds: 50), (timer) {
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
                        return ListTile(
                          title: Align(
                            alignment: message.role == 'user'
                                ? Alignment.centerRight
                                : Alignment.centerLeft,
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: message.role == 'user'
                                    ? primaryColor
                                    : const Color.fromARGB(255, 37, 37, 37),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                message.content,
                                style: const TextStyle(color: secoundryColor),
                              ),
                            ),
                          ),
                        );
                      } else {
                        return ListTile(
                          title: Align(
                            alignment: Alignment.centerLeft,
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: const Color.fromARGB(255, 37, 37, 37),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                _animatedResponse,
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                        );
                      }
                    },
                  ),
                ),
                _buildInputField(context, chatProvider),
              ],
            ),
            if (_isLoading)
              Center(
                child: Image.asset(
                  'assets/animation/Animation - 1729458511878.gif',
                  width: 150,
                  height: 150,
                ),
              ),
          ],
        ),
        drawer: Drawer(
          child: Container(
            color:
                const Color(0xFF1E1E1E), // Dark background for the drawer body
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color:
                        primaryColor, // Use your primary color for the header
                    borderRadius: const BorderRadius.only(
                      bottomLeft: Radius.circular(25),
                      bottomRight: Radius.circular(25),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Chat History',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.note_add, color: Colors.white),
                        onPressed: () {
                          chatProvider.addNewChatSession();
                          Navigator.pop(context);
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    itemCount: categorizedSessions.keys.length,
                    itemBuilder: (context, index) {
                      final category =
                          categorizedSessions.keys.elementAt(index);
                      return Card(
                        color: Colors.white, // White cards for each category
                        margin: const EdgeInsets.symmetric(vertical: 8),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: ExpansionTile(
                          title: Text(
                            category,
                            style: const TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          children: categorizedSessions[category]!
                              .asMap()
                              .entries
                              .toList()
                              .reversed
                              .map((entry) {
                            final chatIndex = entry.key;
                            return ListTile(
                              title: Text(
                                'Chat ${chatIndex + 1}',
                                style: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                ),
                              ),
                              trailing: const Icon(
                                Icons.arrow_forward_ios,
                                size: 16,
                                color: Colors.grey,
                              ),
                              onTap: () {
                                chatProvider.loadChatSession(chatIndex);
                                Navigator.pop(context);
                              },
                            );
                          }).toList(),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ));
  }

  Widget _buildInputField(BuildContext context, ChatProvider chatProvider) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _controller,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(
                hintText: 'Type your message...',
                hintStyle: TextStyle(color: Colors.grey),
                border: InputBorder.none, // Removed border
                filled: true,
                fillColor: Color.fromARGB(255, 50, 50, 50),
                contentPadding: EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 20,
                ),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.send, color: primaryColor),
            onPressed: () {
              if (_controller.text.isNotEmpty) {
                FocusScope.of(context).unfocus();
                chatProvider.sendMessage(_controller.text);
                _showResponse('This is a sample response!');
                _controller.clear();
                _scrollToBottom();
              }
            },
          ),
          IconButton(
            icon: const Icon(Icons.mic, color: primaryColor),
            onPressed: () {
              // Handle voice input action
            },
          ),
        ],
      ),
    );
  }
}
