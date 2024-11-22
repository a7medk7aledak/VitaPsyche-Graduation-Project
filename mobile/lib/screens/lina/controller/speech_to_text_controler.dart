import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart';

class SpeechToTextControler {
  final SpeechToText _speechToText = SpeechToText();
  final TextEditingController textEditingController = TextEditingController();
  String selectedLocale = 'en-US'; //using language in app

  void setLangauge(String locale) => selectedLocale = locale;

  Stream<String> get speechStream async* {
    if (await _speechToText.initialize()) {
      _speechToText.listen(onResult: (result) {
        textEditingController.text = result.recognizedWords;
      });
    }
    yield textEditingController.text;
  }

  void startListening() async {
    bool available = await _speechToText.initialize(
      onError: (errorNotification) => print('error $errorNotification'),
      onStatus: (errorNotification) => print('status $errorNotification'),
    );
    if (available) {
      _speechToText.listen(
        onResult: (result) {
          textEditingController.text = result.recognizedWords;
        },
        localeId: selectedLocale,
      );
    } else {
      print('speech recoginition not avaible');
    }
  }

  void stopListenning() => _speechToText.stop();

  void dispose() {
    textEditingController.dispose();
    _speechToText.stop(); //not make sure to stop or close?
  }
}
