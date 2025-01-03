class ConnersTest {
  final String testTitle;
  final List<Question> questions;
  final Scoring scoring;

  ConnersTest({required this.testTitle, required this.questions, required this.scoring});

  factory ConnersTest.fromJson(Map<String, dynamic> json) {
    return ConnersTest(
      testTitle: json['testTitle'],
      questions: (json['questions'] as List)
          .map((e) => Question.fromJson(e))
          .toList(),
      scoring: Scoring.fromJson(json['scoring']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'testTitle': testTitle,
      'questions': questions.map((e) => e.toJson()).toList(),
      'scoring': scoring.toJson(),
    };
  }
}

class Question {
  final String questionText;
  final List<Choice> choices;

  Question({required this.questionText, required this.choices});

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      questionText: json['question'],
      choices: (json['choices'] as List)
          .map((e) => Choice.fromJson(e))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'question': questionText,
      'choices': choices.map((e) => e.toJson()).toList(),
    };
  }
}

class Choice {
  final String text;
  final int score;

  Choice({required this.text, required this.score});

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
  final Range belowAverage;
  final Range slightlyBelowAverage;
  final Range average;
  final Range slightlyAboveAverage;
  final Range aboveAverage;
  final Range veryAboveAverage;

  Scoring({
    required this.belowAverage,
    required this.slightlyBelowAverage,
    required this.average,
    required this.slightlyAboveAverage,
    required this.aboveAverage,
    required this.veryAboveAverage,
  });

  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      belowAverage: Range.fromJson(json['belowAverage']),
      slightlyBelowAverage: Range.fromJson(json['slightlyBelowAverage']),
      average: Range.fromJson(json['average']),
      slightlyAboveAverage: Range.fromJson(json['slightlyAboveAverage']),
      aboveAverage: Range.fromJson(json['aboveAverage']),
      veryAboveAverage: Range.fromJson(json['veryAboveAverage']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'belowAverage': belowAverage.toJson(),
      'slightlyBelowAverage': slightlyBelowAverage.toJson(),
      'average': average.toJson(),
      'slightlyAboveAverage': slightlyAboveAverage.toJson(),
      'aboveAverage': aboveAverage.toJson(),
      'veryAboveAverage': veryAboveAverage.toJson(),
    };
  }

  // New method to get category based on the score
  String getCategory(int score) {
    if (score >= veryAboveAverage.min && score <= veryAboveAverage.max) {
      return 'Very Above Average';
    } else if (score >= aboveAverage.min && score <= aboveAverage.max) {
      return 'Above Average';
    } else if (score >= slightlyAboveAverage.min && score <= slightlyAboveAverage.max) {
      return 'Slightly Above Average';
    } else if (score >= average.min && score <= average.max) {
      return 'Average';
    } else if (score >= slightlyBelowAverage.min && score <= slightlyBelowAverage.max) {
      return 'Slightly Below Average';
    } else if (score >= belowAverage.min && score <= belowAverage.max) {
      return 'Below Average';
    } else {
      return 'Out of Range';
    }
  }
}

class Range {
  final int min;
  final int max;

  Range({required this.min, required this.max});

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
