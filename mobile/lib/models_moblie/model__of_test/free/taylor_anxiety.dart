class TaylorAnxietyScale {
  final String testTitle;
  final List<Question> questions;
  final Scoring scoring;

  TaylorAnxietyScale({
    required this.testTitle,
    required this.questions,
    required this.scoring,
  });

  factory TaylorAnxietyScale.fromJson(Map<String, dynamic> json) {
    return TaylorAnxietyScale(
      testTitle: json['testTitle'],
      questions: (json['questions'] as List)
          .map((item) => Question.fromJson(item))
          .toList(),
      scoring: Scoring.fromJson(json['scoring']),
    );
  }
}

class Question {
  final String questionText;
  final List<Choice> choices;

  Question({
    required this.questionText,
    required this.choices,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      questionText: json['question'],
      choices: (json['choices'] as List)
          .map((item) => Choice.fromJson(item))
          .toList(),
    );
  }
}

class Choice {
  final String text;
  final int score;

  Choice({
    required this.text,
    required this.score,
  });

  factory Choice.fromJson(Map<String, dynamic> json) {
    return Choice(
      text: json['text'],
      score: json['score'],
    );
  }
}

class Scoring {
  final Range veryLowAnxiety;
  final Range lowAnxiety;
  final Range moderateAnxiety;
  final Range highAnxiety;
  final Range veryHighAnxiety;

  Scoring({
    required this.veryLowAnxiety,
    required this.lowAnxiety,
    required this.moderateAnxiety,
    required this.highAnxiety,
    required this.veryHighAnxiety,
  });

  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      veryLowAnxiety: Range.fromJson(json['veryLowAnxiety']),
      lowAnxiety: Range.fromJson(json['lowAnxiety']),
      moderateAnxiety: Range.fromJson(json['moderateAnxiety']),
      highAnxiety: Range.fromJson(json['highAnxiety']),
      veryHighAnxiety: Range.fromJson(json['veryHighAnxiety']),
    );
  }
  
}

class Range {
  final int min;
  final int max;

  Range({
    required this.min,
    required this.max,
  });

  factory Range.fromJson(Map<String, dynamic> json) {
    return Range(
      min: json['min'],
      max: json['max'],
    );
  }
}
