class YBOCS {
  final String testTitle;
  final List<Question> questions;
  final Scoring scoring;

  YBOCS({
    required this.testTitle,
    required this.questions,
    required this.scoring,
  });

  factory YBOCS.fromJson(Map<String, dynamic> json) {
    return YBOCS(
      testTitle: json['testTitle'],
      questions: (json['questions'] as List)
          .map((question) => Question.fromJson(question))
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
          .map((choice) => Choice.fromJson(choice))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'question': questionText,
      'choices': choices.map((choice) => choice.toJson()).toList(),
    };
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

  Map<String, dynamic> toJson() {
    return {
      'text': text,
      'score': score,
    };
  }
}

class Scoring {
  final Range veryMildOCD;
  final Range mildOCD;
  final Range moderateOCD;
  final Range severeOCD;
  final Range extremeOCD;

  Scoring({
    required this.veryMildOCD,
    required this.mildOCD,
    required this.moderateOCD,
    required this.severeOCD,
    required this.extremeOCD,
  });

  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      veryMildOCD: Range.fromJson(json['veryMildOCD']),
      mildOCD: Range.fromJson(json['mildOCD']),
      moderateOCD: Range.fromJson(json['moderateOCD']),
      severeOCD: Range.fromJson(json['severeOCD']),
      extremeOCD: Range.fromJson(json['extremeOCD']),
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

  Map<String, dynamic> toJson() {
    return {
      'min': min,
      'max': max,
    };
  }
}
