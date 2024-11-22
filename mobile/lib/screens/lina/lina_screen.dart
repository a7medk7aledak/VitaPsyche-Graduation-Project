import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/lina/widget/language_drop_down.dart';
import 'controller/speech_to_text_controler.dart';
import 'widget/speech_to_text_stream.dart';

class LinaScreen extends StatefulWidget {
  const LinaScreen({super.key});
  static const String id = 'lina';

  @override
  State<LinaScreen> createState() => _LinaScreenState();
}

class _LinaScreenState extends State<LinaScreen> {
  late final SpeechToTextControler _speechToTextController;
  bool _isMicActive = false;

  @override
  void initState() {
    super.initState();
    _speechToTextController = SpeechToTextControler();
  }

  @override
  void dispose() {
    _speechToTextController.dispose();
    super.dispose();
  }

  void _toggleMic() async {
    if (_isMicActive) {
      _speechToTextController.stopListenning();
    } else {
      _speechToTextController.startListening();
    }

    setState(() {
      _isMicActive = !_isMicActive;
    });
  }

  void _onMessageSend(String message) {
    print('Message Sent: $message');
    // todo :: send data message
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lina'),
        actions: [
          LanguageDropdown(
            selectedLocale: _speechToTextController.selectedLocale,
            onLocaleChanged: (value) {
              setState(() {
                _speechToTextController.setLangauge(value);
                _speechToTextController.textEditingController.clear();
              });
            },
          )
        ],
      ),
      body: Column(
        children: [
          const Expanded(
            child: Center(
              child: Text(
                'Welcome, Lina!',
                style: TextStyle(fontSize: 20),
              ),
            ),
          ),
          SpeechToTextStream(
            speechToTextController: _speechToTextController,
            isMicActive: _isMicActive,
            onToggleMic: _toggleMic,
            onMessageSend: _onMessageSend,
          ),
        ],
      ),
    );
  }
}
