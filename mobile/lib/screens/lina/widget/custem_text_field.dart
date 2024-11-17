import 'dart:async';

import 'package:flutter/material.dart';

class CustemTextField extends StatefulWidget {
  const CustemTextField({super.key});

  @override
  State<CustemTextField> createState() => _CustemTextFieldState();
}

class _CustemTextFieldState extends State<CustemTextField> {
  final StreamController<bool> _hasTextStreamController =
      StreamController<bool>.broadcast();

  @override
  void initState() {
    // TODO: implement initState
    _controller.addListener(
      () {
        _hasTextStreamController.add(_controller.text.trim().isNotEmpty);
      },
    );

    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    _controller.dispose();
    _hasTextStreamController.close();
    super.dispose();
  }

  void _startVoiceRecording() {
    print('recoding............');
  }

  final TextEditingController _controller = TextEditingController();
  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isNotEmpty) {
      _controller.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: _controller,
            onSubmitted: (value) {},
            decoration: InputDecoration(
                hintText: 'type your massage......',
                enabledBorder: bordertextfield(),
                focusedBorder: bordertextfield(),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16)),
          ),
        ),
        StreamBuilder<bool>(
          stream: _hasTextStreamController.stream,
          initialData: false,
          builder: (context, snapshot) {
            final hasText = snapshot.data ?? false;

            return IconButton(
              onPressed: hasText ? _sendMessage : _startVoiceRecording,
              icon: Icon(hasText ? Icons.send : Icons.mic),
            );
          },
        )
      ],
    );
  }

  OutlineInputBorder bordertextfield() {
    return const OutlineInputBorder(
        borderRadius: BorderRadius.all(
          Radius.circular(25),
        ),
        borderSide: BorderSide(color: Colors.black, width: 2));
  }
}
