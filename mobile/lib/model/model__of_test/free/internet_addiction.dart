// Main model representing the Internet Addiction Scale test.
class InternetAddictionScale {
  final String testTitle;
  final List<Question> questions;
  final Scoring scoring;

  const InternetAddictionScale({
    required this.testTitle,
    required this.questions,
    required this.scoring,
  });

  // Factory constructor to create an instance from JSON.
  factory InternetAddictionScale.fromJson(Map<String, dynamic> json) {
    return InternetAddictionScale(
      testTitle: json['testTitle'] as String,
      questions: (json['questions'] as List)
          .map((question) => Question.fromJson(question))
          .toList(),
      scoring: Scoring.fromJson(json['scoring'] as Map<String, dynamic>),
    );
  }
}

// Represents a question in the test.
class Question {
  final int id;
  final String questionText;
  final List<Choice> choices;

  const Question({
    required this.id,
    required this.questionText,
    required this.choices,
  });

  // Factory constructor to create an instance from JSON.
  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'] as int,
      questionText: json['question'] as String,
      choices: (json['choices'] as List)
          .map((choice) => Choice.fromJson(choice))
          .toList(),
    );
  }
}

// Represents a choice for a question.
class Choice {
  final int score;
  final String text;

  const Choice({
    required this.score,
    required this.text,
  });

  // Factory constructor to create an instance from JSON.
  factory Choice.fromJson(Map<String, dynamic> json) {
    return Choice(
      score: json['score'] as int,
      text: json['text'] as String,
    );
  }
}

// Represents the scoring system of the test.
class Scoring {
  final String instruction;
  final List<ScoreRange> scoreRanges;

  const Scoring({
    required this.instruction,
    required this.scoreRanges,
  });

  // Factory constructor to create an instance from JSON.
  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      instruction: json['instruction'] as String,
      scoreRanges: (json['scoreRanges'] as List)
          .map((range) => ScoreRange.fromJson(range))
          .toList(),
    );
  }
  String getCategory(int score) {
    for (var range in scoreRanges) {
      final parts = range.range.split('-');
      final min = int.tryParse(parts[0]) ?? 0;
      final max = int.tryParse(parts[1]) ?? 0;

      if (score >= min && score <= max) {
        return range.description;
      }
    }
    return 'Unknown'; // Default category if score is outside defined ranges
  }
}

// Represents a score range in the scoring system.
class ScoreRange {
  final String range;
  final String description;

  const ScoreRange({
    required this.range,
    required this.description,
  });

  // Factory constructor to create an instance from JSON.
  factory ScoreRange.fromJson(Map<String, dynamic> json) {
    return ScoreRange(
      range: json['range'] as String,
      description: json['description'] as String,
    );
  }
}
