class Test {
  String testTitle;
  bool payment;
  List<Question> questions;
  List<ScoreRange> scoreRanges;
  int max;

  Test({
    required this.testTitle,
    required this.payment,
    required this.questions,
    required this.scoreRanges,
    required this.max,
  });

  factory Test.fromJson(Map<String, dynamic> json) {
    return Test(
      testTitle: json['testTitle'],
      payment: json['payment'],
      questions: (json['questions'] as List)
          .map((questionJson) => Question.fromJson(questionJson))
          .toList(),
      scoreRanges: (json['scoreRanges'] as List)
          .map((rangeJson) => ScoreRange.fromJson(rangeJson))
          .toList(),
      max: json['MAX'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'testTitle': testTitle,
      'payment': payment,
      'questions': questions.map((question) => question.toJson()).toList(),
      'scoreRanges': scoreRanges.map((range) => range.toJson()).toList(),
      'MAX': max,
    };
  }
}

class Question {
  int id;
  String question;
  List<Choice> choices;

  Question({
    required this.id,
    required this.question,
    required this.choices,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'],
      question: json['question'],
      choices: (json['choices'] as List)
          .map((choiceJson) => Choice.fromJson(choiceJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'question': question,
      'choices': choices.map((choice) => choice.toJson()).toList(),
    };
  }
}

class Choice {
  int score;
  String text;

  Choice({
    required this.score,
    required this.text,
  });

  factory Choice.fromJson(Map<String, dynamic> json) {
    return Choice(
      score: json['score'],
      text: json['text'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'score': score,
      'text': text,
    };
  }
}

class ScoreRange {
  List<int> range;
  String description;
  String color;
  String info;

  ScoreRange({
    required this.range,
    required this.description,
    required this.color,
    required this.info,
  });

  factory ScoreRange.fromJson(Map<String, dynamic> json) {
    return ScoreRange(
      range: List<int>.from(json['range']),
      description: json['description'],
      color: json['color'],
      info: json['info'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'range': range,
      'description': description,
      'color': color,
      'info': info,
    };
  }
}
