// games/memory_game.dart
import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';

class MemoryGame extends StatefulWidget {
  const MemoryGame({Key? key}) : super(key: key);

  @override
  MemoryGameState createState() => MemoryGameState();
}

class MemoryGameState extends State<MemoryGame> {
  final List<String> _emojis = [
    '🌸',
    '🌺',
    '🌹',
    '🌷',
    '🌼',
    '🌻',
    '🌸',
    '🌺',
    '🌹',
    '🌷',
    '🌼',
    '🌻',
  ];

  List<bool> _isFlipped = [];
  List<int> _flippedCards = [];
  int _pairs = 0;
  bool _isProcessing = false;
  int _moves = 0;
  Timer? _gameTimer;
  int _secondsElapsed = 0;
  bool _gameStarted = false;

  @override
  void initState() {
    super.initState();
    _initializeGame();
  }

  void _initializeGame() {
    _emojis.shuffle();
    _isFlipped = List.generate(_emojis.length, (index) => false);
    _flippedCards = [];
    _pairs = 0;
    _moves = 0;
    _isProcessing = false;
    _secondsElapsed = 0;
    _gameStarted = false;
    _gameTimer?.cancel();
  }

  void _startGameTimer() {
    if (!_gameStarted) {
      _gameStarted = true;
      _gameTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
        setState(() {
          _secondsElapsed++;
        });
      });
    }
  }

  String _formatTime(int seconds) {
    int minutes = seconds ~/ 60;
    int remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }

  void _onCardTap(int index) {
    if (_isProcessing || _isFlipped[index] || _flippedCards.length >= 2) {
      return;
    }

    _startGameTimer();

    setState(() {
      _isFlipped[index] = true;
      _flippedCards.add(index);
    });

    if (_flippedCards.length == 2) {
      _moves++;
      _isProcessing = true;
      Timer(const Duration(milliseconds: 1000), () {
        _checkMatch();
        setState(() {
          _isProcessing = false;
        });
      });
    }
  }

  void _checkMatch() {
    if (_emojis[_flippedCards[0]] == _emojis[_flippedCards[1]]) {
      _pairs++;
      if (_pairs == _emojis.length ~/ 2) {
        _gameTimer?.cancel();
      }
    } else {
      setState(() {
        _isFlipped[_flippedCards[0]] = false;
        _isFlipped[_flippedCards[1]] = false;
      });
    }
    _flippedCards = [];
  }

  @override
  void dispose() {
    _gameTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.purple[50],
      appBar: AppBar(
        title: const Text('لعبة الذاكرة'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.purple[900],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStatCard(
                    'الوقت',
                    _formatTime(_secondsElapsed),
                    Icons.timer,
                  ),
                  _buildStatCard(
                    'الحركات',
                    _moves.toString(),
                    Icons.touch_app,
                  ),
                  _buildStatCard(
                    'الأزواج',
                    '$_pairs/${_emojis.length ~/ 2}',
                    Icons.favorite,
                  ),
                ],
              ),
            ),
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.all(20),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3,
                  childAspectRatio: 1,
                  crossAxisSpacing: 10,
                  mainAxisSpacing: 10,
                ),
                itemCount: _emojis.length,
                itemBuilder: (context, index) {
                  return _buildCard(index);
                },
              ),
            ),
            if (_pairs == _emojis.length ~/ 2)
              Container(
                margin: const EdgeInsets.all(20),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.green[50],
                  borderRadius: BorderRadius.circular(15),
                  border: Border.all(color: Colors.green[200]!),
                ),
                child: Column(
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.emoji_events, color: Colors.amber),
                        SizedBox(width: 8),
                        Text(
                          'مبروك! لقد أكملت اللعبة',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'الوقت: ${_formatTime(_secondsElapsed)} - الحركات: $_moves',
                      style: const TextStyle(
                        color: Colors.green,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: ElevatedButton.icon(
                onPressed: () {
                  setState(() {
                    _initializeGame();
                  });
                },
                icon: const Icon(Icons.refresh),
                label: const Text('لعبة جديدة'),
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                  backgroundColor: Colors.purple,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.purple.withOpacity(0.1),
            spreadRadius: 2,
            blurRadius: 5,
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: Colors.purple[300]),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCard(int index) {
    return GestureDetector(
      onTap: () => _onCardTap(index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        transform: Matrix4.rotationY(_isFlipped[index] ? pi : 0),
        child: Card(
          elevation: _isFlipped[index] ? 4 : 8,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
            side: BorderSide(
              color:
                  _isFlipped[index] ? Colors.purple[200]! : Colors.transparent,
              width: 2,
            ),
          ),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(15),
              gradient: _isFlipped[index]
                  ? null
                  : LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        Colors.purple[400]!,
                        Colors.purple[700]!,
                      ],
                    ),
            ),
            child: Center(
              child: _isFlipped[index]
                  ? Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.rotationY(pi),
                      child: Text(
                        _emojis[index],
                        style: const TextStyle(fontSize: 40),
                      ),
                    )
                  : Icon(
                      Icons.question_mark,
                      size: 30,
                      color: Colors.purple[100],
                    ),
            ),
          ),
        ),
      ),
    );
  }
}
