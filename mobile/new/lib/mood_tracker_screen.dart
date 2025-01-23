import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class MoodTrackerScreen extends StatefulWidget {
  const MoodTrackerScreen({super.key});

  @override
  _MoodTrackerScreenState createState() => _MoodTrackerScreenState();
}

class _MoodTrackerScreenState extends State<MoodTrackerScreen> {
  final List<String> moodEmojis = ['😊', '😐', '😔', '😡', '😴'];
  String selectedMood = '😊';
  String note = '';
  List<Map<String, dynamic>> moodHistory = [];

  @override
  void initState() {
    super.initState();
    _loadMoodHistory();
  }

  Future<void> _loadMoodHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final historyJson = prefs.getString('moodHistory');
    if (historyJson != null) {
      setState(() {
        moodHistory = List<Map<String, dynamic>>.from(json.decode(historyJson));
      });
    }
  }

  Future<void> _saveMoodHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final historyJson = json.encode(moodHistory);
    await prefs.setString('moodHistory', historyJson);
  }

  void _logMood() {
    if (mounted) {
      setState(() {
        moodHistory.add({
          'date': DateTime.now().toString(),
          'mood': selectedMood,
          'note': note,
        });
        _saveMoodHistory();
        note = '';
      });
    }
  }

  List<Map<String, dynamic>> _getWeeklyMoodData() {
    final now = DateTime.now();
    final weekStart = now.subtract(Duration(days: now.weekday - 1));

    return List.generate(7, (index) {
      final day = weekStart.add(Duration(days: index));
      final dayMoods = moodHistory.where((entry) {
        final entryDate = DateTime.parse(entry['date']);
        return entryDate.year == day.year &&
            entryDate.month == day.month &&
            entryDate.day == day.day;
      }).toList();

      double averageMood = -1;
      if (dayMoods.isNotEmpty) {
        averageMood = dayMoods
                .map((entry) => moodEmojis.indexOf(entry['mood']).toDouble())
                .reduce((a, b) => a + b) /
            dayMoods.length;
      }

      return {
        'day': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
        'value': averageMood,
      };
    });
  }

  Widget _buildMoodVisualizer() {
    final weeklyData = _getWeeklyMoodData();
    return Container(
      height: 200,
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: weeklyData.map((data) {
                final value = data['value'] as double;
                final height =
                    value >= 0 ? (value + 1) / moodEmojis.length * 120 : 0.0;

                return Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      if (value >= 0) ...[
                        Text(
                          moodEmojis[value.round()],
                          style: const TextStyle(fontSize: 16),
                        ),
                        const SizedBox(height: 4),
                        Container(
                          height: height,
                          margin: const EdgeInsets.symmetric(horizontal: 4),
                          decoration: BoxDecoration(
                            color: Colors.blue.withOpacity(0.7),
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ],
                      const SizedBox(height: 8),
                      Text(
                        data['day'] as String,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  String _getSuggestion() {
    if (moodHistory.isEmpty) {
      return "Start logging your mood to get suggestions!";
    }
    final lastMood = moodHistory.last['mood'];
    switch (lastMood) {
      case '😊':
        return "You're feeling great! Keep up the positive energy.";
      case '😐':
        return "Feeling neutral? Try a new activity to boost your mood.";
      case '😔':
        return "Feeling down? Reach out to a friend or take a walk.";
      case '😡':
        return "Feeling angry? Try deep breathing exercises.";
      case '😴':
        return "Feeling tired? Make sure to get enough rest.";
      default:
        return "Keep tracking your mood for personalized suggestions.";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Mood Tracker"),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text(
              "How are you feeling today?",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            Wrap(
              spacing: 10,
              children: moodEmojis.map((emoji) {
                return ChoiceChip(
                  label: Text(emoji, style: const TextStyle(fontSize: 24)),
                  selected: selectedMood == emoji,
                  onSelected: (selected) {
                    setState(() {
                      selectedMood = emoji;
                    });
                  },
                  selectedColor: Colors.blueAccent.withOpacity(0.3),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: const InputDecoration(
                labelText: "Add a note (optional)",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                setState(() {
                  note = value;
                });
              },
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _logMood,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                padding:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
              ),
              child: const Text("Log Mood"),
            ),
            const SizedBox(height: 40),
            const Text(
              "Weekly Mood Chart",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            _buildMoodVisualizer(),
            const SizedBox(height: 40),
            const Text(
              "Suggestion",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text(
              _getSuggestion(),
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
