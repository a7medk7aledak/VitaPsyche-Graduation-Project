import 'package:flutter/material.dart';
import '../../data/chat_service.dart';

class ChatScreen extends StatefulWidget {
  static const String id = 'chat_screen';
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> _messages = [];
  final ChatService _chatService = ChatService();
  final ScrollController _scrollController = ScrollController();

  List<String> chatSessions = ["Chat 1", "Chat 2", "Chat 3"];
  String currentChat = "Chat 3";
  bool _isComposing = false;

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    _scrollController.animateTo(
      _scrollController.position.maxScrollExtent,
      duration: Duration(milliseconds: 300),
      curve: Curves.easeOut,
    );
  }

  void _addNewChat() {
    setState(() {
      String newChatName = "Chat ${chatSessions.length + 1}";
      chatSessions.add(newChatName);
      currentChat = newChatName;
    });
  }

  void _sendMessage() async {
    if (_controller.text.isEmpty) return;

    setState(() {
      _messages.add({'user': _controller.text});
      _isComposing = false;
    });

    final userMessage = _controller.text;
    _controller.clear();

    WidgetsBinding.instance.addPostFrameCallback((_) => _scrollToBottom());

    final botResponse = await _chatService.sendMessage(userMessage);

    setState(() {
      _messages.add({'bot': botResponse});
    });

    WidgetsBinding.instance.addPostFrameCallback((_) => _scrollToBottom());
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Hide keyboard when tapping outside text field
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          leading: Builder(
            builder: (context) => IconButton(
              icon: Icon(Icons.menu, color: Colors.teal),
              onPressed: () => Scaffold.of(context).openDrawer(),
            ),
          ),
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                currentChat,
                style: TextStyle(color: Colors.black87, fontSize: 18),
              ),
              Text(
                'Online',
                style: TextStyle(color: Colors.teal, fontSize: 12),
              ),
            ],
          ),
        ),
        drawer: Drawer(
          child: Column(
            children: [
              UserAccountsDrawerHeader(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.teal, Colors.teal.shade700],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                currentAccountPicture: CircleAvatar(
                  backgroundColor: Colors.white,
                  child: Text('AK', style: TextStyle(color: Colors.teal)),
                ),
                accountName: Text('Ahmed Khaled'),
                accountEmail: Text('ahmed@example.com'),
              ),
              ListTile(
                leading: Icon(Icons.add_comment, color: Colors.teal),
                title: Text('New Chat'),
                onTap: () {
                  _addNewChat();
                  Navigator.pop(context);
                },
              ),
              Divider(),
              Expanded(
                child: ListView.builder(
                  itemCount: chatSessions.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      leading: Icon(Icons.chat_bubble_outline,
                          color: currentChat == chatSessions[index]
                              ? Colors.teal
                              : Colors.grey),
                      title: Text(
                        chatSessions[index],
                        style: TextStyle(
                          color: currentChat == chatSessions[index]
                              ? Colors.teal
                              : Colors.black87,
                        ),
                      ),
                      onTap: () {
                        setState(() {
                          currentChat = chatSessions[index];
                        });
                        Navigator.pop(context);
                      },
                      tileColor: currentChat == chatSessions[index]
                          ? Colors.teal.withOpacity(0.1)
                          : null,
                    );
                  },
                ),
              ),
              Divider(),
              ListTile(
                leading: Icon(Icons.language, color: Colors.grey),
                title: DropdownButton<String>(
                  value: 'English (US)',
                  isExpanded: true,
                  underline: SizedBox(),
                  items: ['English (US)', 'Arabic'].map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (value) {},
                ),
              ),
              Padding(
                padding: EdgeInsets.all(16),
                child: ListTile(
                  leading: Icon(Icons.logout, color: Colors.red),
                  title: Text('Logout', style: TextStyle(color: Colors.red)),
                  onTap: () {
                    // Implement logout functionality
                  },
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                    side: BorderSide(color: Colors.red.withOpacity(0.5)),
                  ),
                ),
              ),
            ],
          ),
        ),
        body: SafeArea(
          child: Container(
            decoration: BoxDecoration(
              color: Colors.grey[100],
              image: DecorationImage(
                image: AssetImage('assets/chat_bg.png'),
                opacity: 0.1,
                fit: BoxFit.cover,
              ),
            ),
            child: Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    controller: _scrollController,
                    padding: EdgeInsets.symmetric(vertical: 16, horizontal: 12),
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      final message = _messages[index];
                      final isUser = message.containsKey('user');
                      return Padding(
                        padding: EdgeInsets.only(bottom: 8),
                        child: Row(
                          mainAxisAlignment: isUser
                              ? MainAxisAlignment.end
                              : MainAxisAlignment.start,
                          children: [
                            if (!isUser)
                              CircleAvatar(
                                backgroundColor: Colors.teal,
                                radius: 16,
                                child: Icon(Icons.assistant,
                                    color: Colors.white, size: 18),
                              ),
                            SizedBox(width: !isUser ? 8 : 0),
                            Flexible(
                              child: Container(
                                constraints: BoxConstraints(
                                  maxWidth:
                                      MediaQuery.of(context).size.width * 0.75,
                                ),
                                padding: EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 10,
                                ),
                                decoration: BoxDecoration(
                                  color: isUser ? Colors.teal : Colors.white,
                                  borderRadius: BorderRadius.only(
                                    topLeft: Radius.circular(20),
                                    topRight: Radius.circular(20),
                                    bottomLeft:
                                        Radius.circular(isUser ? 20 : 0),
                                    bottomRight:
                                        Radius.circular(isUser ? 0 : 20),
                                  ),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.05),
                                      blurRadius: 5,
                                      offset: Offset(0, 2),
                                    ),
                                  ],
                                ),
                                child: Text(
                                  isUser ? message['user']! : message['bot']!,
                                  style: TextStyle(
                                    color:
                                        isUser ? Colors.white : Colors.black87,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: isUser ? 8 : 0),
                            if (isUser)
                              CircleAvatar(
                                backgroundColor: Colors.blue,
                                radius: 16,
                                child: Text('AK',
                                    style: TextStyle(
                                        color: Colors.white, fontSize: 12)),
                              ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.05),
                        blurRadius: 10,
                        offset: Offset(0, -2),
                      ),
                    ],
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      IconButton(
                        icon: Icon(Icons.attach_file,
                            color: Colors.grey[600], size: 24),
                        onPressed: () {
                          // Implement file attachment
                        },
                      ),
                      Expanded(
                        child: TextField(
                          controller: _controller,
                          maxLines: null,
                          minLines: 1,
                          textCapitalization: TextCapitalization.sentences,
                          keyboardType: TextInputType.multiline,
                          textInputAction: TextInputAction.newline,
                          decoration: InputDecoration(
                            hintText: 'Type your message...',
                            hintStyle: TextStyle(
                                color: Colors.grey[400], fontSize: 16),
                            filled: true,
                            fillColor: Colors.grey[100],
                            contentPadding: EdgeInsets.symmetric(
                                horizontal: 20, vertical: 10),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(25),
                              borderSide: BorderSide.none,
                            ),
                            isDense: true,
                          ),
                          onChanged: (text) {
                            setState(() {
                              _isComposing = text.isNotEmpty;
                            });
                          },
                          onSubmitted: (text) {
                            if (_isComposing) {
                              _sendMessage();
                            }
                          },
                        ),
                      ),
                      SizedBox(width: 8),
                      AnimatedContainer(
                        duration: Duration(milliseconds: 200),
                        child: IconButton(
                          icon: Icon(
                            _isComposing ? Icons.send : Icons.mic,
                            color:
                                _isComposing ? Colors.teal : Colors.grey[600],
                          ),
                          onPressed: _isComposing
                              ? _sendMessage
                              : () {
                                  // Implement voice recording
                                },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
