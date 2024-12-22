import 'package:flutter/material.dart';

import '../controller/speech_to_text_controler.dart';
import 'custem_text_field.dart';

class SpeechToTextStream extends StatelessWidget {
  final SpeechToTextControler speechToTextController;
  final bool isMicActive;
  final VoidCallback onToggleMic;
  final Function(String) onMessageSend;

  const SpeechToTextStream({
    super.key,
    required this.speechToTextController,
    required this.isMicActive,
    required this.onToggleMic,
    required this.onMessageSend,
  });

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<String>(
      stream: speechToTextController.speechStream,
      initialData: '',
      builder: (context, snapshot) {
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 6),
          child: CustemTextField(
            controller: speechToTextController.textEditingController,
            hintText: snapshot.data ?? 'Speak or type...',
            onVoiceInput: onToggleMic,
            onMessageSend: () {
              final text = speechToTextController.textEditingController.text.trim();
              if (text.isNotEmpty) {
                onMessageSend(text);
                speechToTextController.textEditingController.clear();
              }
            },
            isMicActive: isMicActive,
          ),
        );
      },
    );
  }
}
