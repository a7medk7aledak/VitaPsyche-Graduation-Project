class TestRouteArguments {
  final String testTitle;
  final dynamic model;
  final dynamic scoring; // Changed from Map<String, dynamic>? to dynamic
  final int? score;

  const TestRouteArguments({
    required this.testTitle,
    this.model,
    this.scoring,
    this.score,
  });

  factory TestRouteArguments.fromMap(Map<String, dynamic> map) {
    return TestRouteArguments(
      testTitle: map['testTitle'] as String? ?? '',
      model: map['model'],
      scoring: map['scoring'], // Remove type cast
      score: map['totalScore'] as int?, // Changed from 'score' to 'totalScore' to match usage
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'testTitle': testTitle,
      'model': model,
      'scoring': scoring,
      'totalScore': score, // Changed from 'score' to 'totalScore'
    };
  }
}