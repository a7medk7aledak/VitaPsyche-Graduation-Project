// daily_challenge.dart
class DailyChallenge {
  final String title;
  final String description;
  final String reward;
  final bool isCompleted;
  final DateTime date;

  DailyChallenge({
    required this.title,
    required this.description,
    required this.reward,
    this.isCompleted = false,
    required this.date,
  });

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'reward': reward,
      'isCompleted': isCompleted,
      'date': date.toIso8601String(),
    };
  }

  factory DailyChallenge.fromJson(Map<String, dynamic> json) {
    return DailyChallenge(
      title: json['title'],
      description: json['description'],
      reward: json['reward'],
      isCompleted: json['isCompleted'],
      date: DateTime.parse(json['date']),
    );
  }
}
