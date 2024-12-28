class BeckDepressionInventory {
  final String testTitle;
  final List<Question> questions;
  final Scoring scoring;

  const BeckDepressionInventory({
    required this.testTitle,
    required this.questions,
    required this.scoring,
  });

  // Factory method to create an instance from JSON
  factory BeckDepressionInventory.fromJson(Map<String, dynamic> json) {
    return BeckDepressionInventory(
      testTitle: json['testTitle'] as String,
      questions: (json['questions'] as List)
          .map((question) => Question.fromJson(question))
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

  // Factory method to create an instance from JSON
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

class Choice {
  final String text;
  final int score;

  const Choice({
    required this.text,
    required this.score,
  });

  // Factory method to create an instance from JSON
  factory Choice.fromJson(Map<String, dynamic> json) {
    return Choice(
      text: json['text'] as String,
      score: json['score'] as int,
    );
  }
}

class Scoring {
  final Range noDepression;
  final Range mildDepression;
  final Range moderateDepression;
  final Range severeDepression;

  const Scoring({
    required this.noDepression,
    required this.mildDepression,
    required this.moderateDepression,
    required this.severeDepression,
  });

  // Factory method to create an instance from JSON
  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      noDepression: Range.fromJson(json['noDepression'] as Map<String, dynamic>),
      mildDepression:
          Range.fromJson(json['mildDepression'] as Map<String, dynamic>),
      moderateDepression:
          Range.fromJson(json['moderateDepression'] as Map<String, dynamic>),
      severeDepression:
          Range.fromJson(json['severeDepression'] as Map<String, dynamic>),
    );
  }
}

class Range {
  final int min;
  final int max;

  const Range({
    required this.min,
    required this.max,
  });

  // Factory method to create an instance from JSON
  factory Range.fromJson(Map<String, dynamic> json) {
    return Range(
      min: json['min'] as int,
      max: json['max'] as int,
    );
  }
}
