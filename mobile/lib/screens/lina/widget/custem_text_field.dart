import 'dart:async';
import 'package:flutter/material.dart';

class CustemTextField extends StatefulWidget {
  const CustemTextField({
    super.key,
    required this.controller,
    this.hintText,
    required this.onVoiceInput,
    required this.onMessageSend,
    required this.isMicActive,
  });

  final TextEditingController controller;
  final String? hintText;
  final VoidCallback onVoiceInput;
  final VoidCallback onMessageSend;
  final bool isMicActive;

  @override
  State<CustemTextField> createState() => _CustemTextFieldState();
}

class _CustemTextFieldState extends State<CustemTextField> {
  final StreamController<bool> _hasTextStreamController =
      StreamController<bool>.broadcast();

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(
      () {
        _hasTextStreamController.add(widget.controller.text.trim().isNotEmpty);
      },
    );
  }

  @override
  void dispose() {
    _hasTextStreamController.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: widget.controller,
            decoration: InputDecoration(
              hintText: widget.hintText ?? 'Type your message...',
              enabledBorder: _borderStyle(),
              focusedBorder: _borderStyle(),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16),
            ),
          ),
        ),
        StreamBuilder<bool>(
          stream: _hasTextStreamController.stream,
          initialData: false,
          builder: (context, snapshot) {
            final hasText = snapshot.data ?? false;

            return IconButton(
              onPressed: hasText ? widget.onMessageSend : widget.onVoiceInput,
              icon: Icon(
                hasText ? Icons.send : Icons.mic,
                color: widget.isMicActive ? Colors.green : Colors.black,
              ),
            );
          },
        )
      ],
    );
  }

  OutlineInputBorder _borderStyle() {
    return const OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(25)),
      borderSide: BorderSide(color: Colors.black, width: 2),
    );
  }
}
