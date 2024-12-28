class ADHDDiagnosisScale {
  final String testTitle;
  final List<Section> sections;
  final Scoring scoring;

  ADHDDiagnosisScale({
    required this.testTitle,
    required this.sections,
    required this.scoring,
  });

  factory ADHDDiagnosisScale.fromJson(Map<String, dynamic> json) {
    return ADHDDiagnosisScale(
      testTitle: json['testTitle'],
      sections: (json['sections'] as List)
          .map((section) => Section.fromJson(section))
          .toList(),
      scoring: Scoring.fromJson(json['scoring']),
    );
  }
// Method to get all questions from the sections
  List<Question> getAllQuestions() {
    List<Question> allQuestions = [];
    for (var section in sections) {
      allQuestions.addAll(section.questions);
    }
    return allQuestions;
  }
 
}

class Section {
  final List<Question> questions;

  Section({
    required this.questions,
  });

  factory Section.fromJson(Map<String, dynamic> json) {
    return Section(
      questions: (json['questions'] as List)
          .map((question) => Question.fromJson(question))
          .toList(),
    );
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
          .map((choice) => Choice.fromJson(choice))
          .toList(),
    );
  }

  
}

class Choice {
  final int score;
  final String text;

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

  
}

class Scoring {
  final String instruction;
  final List<ScoreRange> scoreRanges;

  Scoring({
    required this.instruction,
    required this.scoreRanges,
  });

  factory Scoring.fromJson(Map<String, dynamic> json) {
    return Scoring(
      instruction: json['instruction'],
      scoreRanges: (json['ranges'] as List)
          .map((range) => ScoreRange.fromJson(range))
          .toList(),
    );
  }

  
   String getCategory(int score) {
    for (var range in scoreRanges) {
      final rangeParts = range.range.split('-');
      final lowerBound = int.parse(rangeParts[0]);
      final upperBound = int.parse(rangeParts[1]);

      if (score >= lowerBound && score <= upperBound) {
        return range.description;
      }
    }
    return 'Out of range'; // In case the score is out of defined ranges
  }
}

class ScoreRange {
  final String range;
  final String description;

  ScoreRange({
    required this.range,
    required this.description,
  });

  factory ScoreRange.fromJson(Map<String, dynamic> json) {
    return ScoreRange(
      range: json['range'],
      description: json['description'],
    );
  }


}
