// test_arguments.dart

class TestRouteArguments {
  final String testTitle;
  final dynamic model;
  final Map<String, dynamic>? scoring;
  final int? score;

  const TestRouteArguments({
    required this.testTitle,
    this.model,
    this.scoring,
    this.score,
  });

  // Factory constructor to create from Map
  factory TestRouteArguments.fromMap(Map<String, dynamic> map) {
    return TestRouteArguments(
      testTitle: map['testTitle'] as String? ?? '',
      model: map['model'],
      scoring: map['scoring'] as Map<String, dynamic>?,
      score: map['score'] as int?,
    );
  }

  // Convert to Map
  Map<String, dynamic> toMap() {
    return {
      'testTitle': testTitle,
      'model': model,
      'scoring': scoring,
      'score': score,
    };
  }

  // Create a new instance with updated values
  TestRouteArguments copyWith({
    String? testTitle,
    dynamic model,
    Map<String, dynamic>? scoring,
    int? score,
  }) {
    return TestRouteArguments(
      testTitle: testTitle ?? this.testTitle,
      model: model ?? this.model,
      scoring: scoring ?? this.scoring,
      score: score ?? this.score,
    );
  }
}