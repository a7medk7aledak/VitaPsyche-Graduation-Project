import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:audio_session/audio_session.dart';
import 'home_screen.dart';
import 'mood_tracker_screen.dart';
import 'daily_challenge_screen.dart';
import 'games_home.dart'; // استيراد شاشة الألعاب

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final session = await AudioSession.instance;
  await session.configure(AudioSessionConfiguration.music());
  runApp(TherapeuticMusicApp());
}

class TherapeuticMusicApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Therapeutic Music',
      routes: {
        '/': (context) => HomeScreen(),
        '/mood_tracker': (context) => MoodTrackerScreen(),
        '/daily_challenge': (context) => DailyChallengeScreen(),
        '/games': (context) => GamesHome(), // إضافة مسار شاشة الألعاب
      },
      theme: ThemeData(
        primaryColor: Color(0xFF00BFA5),
        colorScheme: ColorScheme.light(
          primary: Color(0xFF00BFA5),
          secondary: Color(0xFF00BFA5),
        ),
        sliderTheme: SliderThemeData(
          activeTrackColor: Color(0xFF00BFA5),
          thumbColor: Color(0xFF00BFA5),
          overlayColor: Color(0xFF00BFA5).withOpacity(0.2),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFF00BFA5),
          ),
        ),
        cardTheme: CardTheme(
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
        ),
      ),
      initialRoute: '/',
      debugShowCheckedModeBanner: false,
    );
  }
}
