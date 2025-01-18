// games/breathing_game.dart
import 'package:flutter/material.dart';
import 'dart:async';

class BreathingGame extends StatefulWidget {
  const BreathingGame({Key? key}) : super(key: key);

  @override
  BreathingGameState createState() => BreathingGameState();
}

class BreathingGameState extends State<BreathingGame>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool isBreathingIn = true;
  int secondsRemaining = 5;
  Timer? _timer;
  int totalBreaths = 0;
  final int targetBreaths = 10;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 5),
      vsync: this,
    )..repeat(reverse: true);
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() {
      secondsRemaining = 5;
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        if (secondsRemaining > 0) {
          secondsRemaining--;
        } else {
          isBreathingIn = !isBreathingIn;
          secondsRemaining = 5;
          if (!isBreathingIn) {
            totalBreaths++;
          }
        }
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[50],
      appBar: AppBar(
        title: const Text('التنفس المتزامن'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.teal[900],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(20),
              child: LinearProgressIndicator(
                value: totalBreaths / targetBreaths,
                backgroundColor: Colors.teal[100],
                valueColor: AlwaysStoppedAnimation<Color>(Colors.teal[400]!),
                minHeight: 10,
                borderRadius: BorderRadius.circular(5),
              ),
            ),
            Text(
              'تنفس ${totalBreaths} من ${targetBreaths}',
              style: TextStyle(
                color: Colors.teal[700],
                fontSize: 16,
              ),
            ),
            Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.teal.withOpacity(0.1),
                            spreadRadius: 5,
                            blurRadius: 10,
                          ),
                        ],
                      ),
                      child: Text(
                        isBreathingIn ? 'خذ نفساً عميقاً' : 'اخرج النفس',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.teal[800],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      '$secondsRemaining',
                      style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.bold,
                        color: Colors.teal[900],
                      ),
                    ),
                    const SizedBox(height: 40),
                    AnimatedBuilder(
                      animation: _controller,
                      builder: (context, child) {
                        return Container(
                          width: 150 + (_controller.value * 100),
                          height: 150 + (_controller.value * 100),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.teal.withOpacity(0.2),
                            border: Border.all(
                              color: Colors.teal.withOpacity(0.3),
                              width: 2,
                            ),
                          ),
                          child: Center(
                            child: Container(
                              width: 150,
                              height: 150,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.teal[100],
                                border: Border.all(
                                  color: Colors
                                      .teal[300]!, // التأكد من عدم استخدام null
                                  width: 2,
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  if (totalBreaths >= targetBreaths)
                    Container(
                      padding: const EdgeInsets.all(16),
                      margin: const EdgeInsets.only(bottom: 16),
                      decoration: BoxDecoration(
                        color: Colors.green[50],
                        borderRadius: BorderRadius.circular(15),
                        border: Border.all(color: Colors.green[200]!),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.check_circle, color: Colors.green),
                          SizedBox(width: 8),
                          Text(
                            'أحسنت! لقد أكملت التمرين',
                            style: TextStyle(
                              color: Colors.green,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ElevatedButton.icon(
                    onPressed: () {
                      setState(() {
                        totalBreaths = 0;
                        isBreathingIn = true;
                        _startTimer();
                      });
                    },
                    icon: const Icon(Icons.refresh),
                    label: const Text('بدء من جديد'),
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 50),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
