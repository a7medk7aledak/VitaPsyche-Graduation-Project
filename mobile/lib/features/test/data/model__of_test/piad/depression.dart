class DepressionTest {
  final String testTitle;
  final List<Question> questions;

  DepressionTest({
    required this.testTitle,
    required this.questions,
  });

  factory DepressionTest.fromJson(Map<String, dynamic> json) {
    return DepressionTest(
      testTitle: json['testTitle'],
      questions: (json['questions'] as List)
          .map((questionJson) => Question.fromJson(questionJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'testTitle': testTitle,
      'questions': questions.map((question) => question.toJson()).toList(),
    };
  }
}

class Question {
  final int id;
  final String question;
  final List<Choice> choices;

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
