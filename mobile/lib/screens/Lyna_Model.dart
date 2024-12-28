import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/models_moblie/questions_and_answers.dart';
// import 'package:flutter_mindmed_project/models/questions_and_answers.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:model_viewer_plus/model_viewer_plus.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

class LynaModel extends StatefulWidget {
  const LynaModel({super.key, required this.title});

  static const String id = 'LynaScreen';

  final String title;

  @override
  State<LynaModel> createState() => _LynaModelState();
}

class _LynaModelState extends State<LynaModel> {
  late stt.SpeechToText _speechToText;
  late FlutterTts _flutterTts;

  bool _isListening = false;
  String _userInput = '';
  String _response = '';
  String _displayedResponse = '';
  bool _showResponse = false;
  String _cameraOrbit = "90deg 90deg auto";
  final TextEditingController _textController = TextEditingController();
  String _selectedLanguage = 'en'; // Default language is English

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
      await _flutterTts.setLanguage("en-US"); // Set language
      await _flutterTts.speak(
          "Hi, I am Lina. I am here to help you at any time. Let's get started.");
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

  double calculateJaccardSimilarity(String a, String b) {
    var setA = a.toLowerCase().split(" ").toSet();
    var setB = b.toLowerCase().split(" ").toSet();

    var intersection = setA.intersection(setB).length;
    var union = setA.union(setB).length;

    return intersection / union;
  }

  Future<void> _generateResponse() async {
    try {
      String matchedResponse =
          "Sorry, I don't have an answer for that."; // Default response

      // Declare and initialize the variable for the highest match score
      int highestMatchScore = 0;

      // Preprocess user input
      List<String> userInputWords = _preprocessInput(_userInput);

      for (var qa in qaData) {
        // Preprocess the question
        List<String> questionWords = _preprocessInput(qa['question']!);

        // Calculate the number of matching words
        int matchScore =
            userInputWords.where((word) => questionWords.contains(word)).length;

        // Update the response if this question has a higher match score
        if (matchScore > highestMatchScore) {
          highestMatchScore = matchScore;
          matchedResponse = qa['answer']!;
        }
      }

      setState(() {
        _response = matchedResponse;
        _showResponse = true;
        _displayedResponse = '';
        _cameraOrbit = "90deg 90deg 1m";
      });

      _animateResponseText();
      await _speakResponse();
    } catch (e) {
      print("Error generating response: $e");
    }
  }

  // Helper method to preprocess input
  List<String> _preprocessInput(String input) {
    // Remove punctuation and convert to lowercase
    String cleanedInput =
        input.replaceAll(RegExp(r'[?.,!;]'), '').toLowerCase();
    // Split into words and filter out non-keywords
    Set<String> ignoreWords = {
      'what',
      'how',
      'when',
      'where',
      'why',
      'who',
      'is',
      'are',
      'am',
      'he',
      'she',
      'they',
      'i',
      'we',
      'you',
      'it',
      'a',
      'an',
      'the',
      'of',
      'and',
      'or',
      'to',
      'in',
      'on',
      'with',
      'tell',
      'me',
      'about'
    };
    return cleanedInput
        .split(' ')
        .where((word) => !ignoreWords.contains(word) && word.isNotEmpty)
        .toList();
  }

  void _animateResponseText() {
    int index = 0;
    Timer.periodic(const Duration(milliseconds: 50
    ), (Timer timer) {
      if (index < _response.length) {
        setState(() {
          _displayedResponse += _response[index];
          index++;
        });
      } else {
        timer.cancel();
      }
    });
  }

  Future<void> _speakResponse() async {
    try {
      await _flutterTts
          .setLanguage(_selectedLanguage == 'en' ? "en-US" : "ar-SA");
      await _flutterTts.speak(_response);
    } catch (e) {
      print("TTS Speak Error: $e");
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  // Method to show the popup menu
  void _showResponseMenu(BuildContext context) {
    showMenu(
      context: context,
      position: RelativeRect.fromLTRB(
          100, 100, 100, 100), // Adjust position as needed
      items: [
        PopupMenuItem<String>(
          value: 'Option 1',
          child: Text('Option 1: ${_displayedResponse}'),
        ),
        PopupMenuItem<String>(
          value: 'Option 2',
          child: Text('Option 2: Another response'),
        ),
        // Add more options as needed
      ],
    ).then((value) {
      if (value != null) {
        // Handle the selected option
        print('Selected: $value');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey[50],
      // appBar: AppBar(
      //   // title: Text(widget.title),
      //   backgroundColor: Colors.blueGrey[50],
      //   centerTitle: true,
      //   elevation: 0,
      //   automaticallyImplyLeading: false,
      // ),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 20, right: 20),
            child: ModelViewer(
              src: 'assets/LinaModel/9.glb',
              cameraOrbit: _cameraOrbit,
              fieldOfView: "100deg",
              ar: true,
              // autoRotate: true,
              backgroundColor: Colors.transparent,
            ),
          ),
          if (_showResponse)
            Positioned(
              left: 20,
              top: 50,
              right: 20,
              child: AnimatedOpacity(
                opacity: _showResponse ? 1.0 : 0.0,
                duration: const Duration(seconds: 3),
                child: GestureDetector(
                  onTap: () =>
                      _showResponseMenu(context), // Show popup menu on tap
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 12),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.7),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: primaryColor, width: 2),
                    ),
                    child: Text(
                      _displayedResponse,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 14, // Decreased font size
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        shadows: [
                          Shadow(
                            blurRadius: 5.0,
                            color: Colors.black,
                            offset: Offset(2.0, 2.0),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.9),
                borderRadius: BorderRadius.circular(30),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.3),
                    blurRadius: 15,
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _buildLanguageSelector(),
                  const SizedBox(height: 5),
                  _buildTextInputField(),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildMicButton(),
                    ],
                  ),
                ],
              ),
            ),
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

  Widget _buildTextInputField() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: TextField(
        controller: _textController,
        onChanged: (value) {
          _userInput = value;
        },
        decoration: InputDecoration(
          hintText: "Type your input or use the mic...",
          border: InputBorder.none,
          contentPadding:
              const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
          suffixIcon: IconButton(
            icon: Icon(Icons.send, color: primaryColor),
            onPressed: () {
              if (_textController.text.isNotEmpty) {
                _userInput = _textController.text;
                _generateResponse();
              } else {
                _showSnackBar("Please enter some text or use the mic.");
              }
            },
          ),
        ),
        style: TextStyle(
          color: Colors.blueGrey[900],
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildMicButton() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        color: primaryColor,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: IconButton(
        onPressed: _isListening ? _stopListening : _startListening,
        icon: Icon(
          _isListening ? Icons.mic : Icons.mic_off,
          color: Colors.white,
        ),
        iconSize: 30,
      ),
    );
  }
}
