class DavidsonTraumaScale {
  final String testTitle;
  final List<Question> questions;
  final Scoring scoring;

  const DavidsonTraumaScale({
    required this.testTitle,
    required this.questions,
    required this.scoring,
  });

  factory DavidsonTraumaScale.fromJson(Map<String, dynamic> json) {
    return DavidsonTraumaScale(
      testTitle: json['testTitle'] as String,
      questions: (json['questions'] as List)
          .map((q) => Question.fromJson(q as Map<String, dynamic>))
          .toList(),
      scoring: Scoring.fromJson(json['scoring'] as Map<String, dynamic>),
    );
  }
}

class Question {
  final int id;
  final String questionText;
  final List<Choice> choices;

  const Question({
    required this.id,
    required this.questionText,
    required this.choices,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'] as int,
      questionText: json['question'] as String,
      choices: (json['choices'] as List)
          .map((c) => Choice.fromJson(c as Map<String, dynamic>))
          .toList(),
    );
  }
}

class Choice {
  final int score;
  final String text;

  const Choice({
    required this.score,
    required this.text,
  });

  factory Choice.fromJson(Map<String, dynamic> json) {
    return Choice(
      score: json['score'] as int,
      text: json['text'] as String,
    );
  }
}

class Scoring {
  final String instruction;
  final List<ScoreRange> scoreRanges;

  const Scoring({
    required this.instruction,
    required this.scoreRanges,
  });

  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      instruction: json['instruction'] as String,
      scoreRanges: (json['scoreRanges'] as List)
          .map((r) => ScoreRange.fromJson(r as Map<String, dynamic>))
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

class ScoreRange {
  final String range;
  final String description;

  const ScoreRange({
    required this.range,
    required this.description,
  });

  factory ScoreRange.fromJson(Map<String, dynamic> json) {
    return ScoreRange(
      range: json['range'] as String,
      description: json['description'] as String,
    );
  }
}