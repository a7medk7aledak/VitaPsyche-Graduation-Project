import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../core/routes/app_routes.dart';

class SplachScreen extends StatefulWidget {
  const SplachScreen({super.key});
  @override
  State<SplachScreen> createState() => _SplachScreenState();
}

class _SplachScreenState extends State<SplachScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _imageAnimation;
  late Animation<double> _textAnimation;

  @override
  void initState() {
    super.initState();

    // Initialize animation controller
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );

    // Define image animation
    _imageAnimation =
        CurvedAnimation(parent: _controller, curve: Curves.easeInOut);

    // Define text animation with a delay
    _textAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.5, 1.0, curve: Curves.easeIn),
      ),
    );

    // Start the animation
    _controller.forward();

    // Check for the token after animation ends
    Timer(const Duration(seconds: 6), () {
      _checkUserSession();
    });
  }

  // Check for existing token and navigate accordingly
  Future<void> _checkUserSession() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('access_token');

    if (token != null) {
      // If token exists, navigate to CustemButtonBar
      Navigator.of(context).pushReplacementNamed(AppRoutes.mainNavigationScreen);
    } else {
      // If no token exists, navigate to the onboarding screen
      Navigator.of(context).pushReplacementNamed(AppRoutes.onBoardingScreen);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromARGB(255, 255, 255, 255),
              Color.fromARGB(255, 255, 255, 255),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ScaleTransition(
                scale: _imageAnimation,
                child: Container(
                  height: MediaQuery.of(context).size.height * 0.40,
                  width: MediaQuery.of(context).size.height * 0.40,
                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage("assets/images/Logo.png"),
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 5),
              FadeTransition(
                opacity: _textAnimation,
                child: const Text(
                  "Vitapsyche",
                  style: TextStyle(
                    fontSize: 30,
                    color: primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
