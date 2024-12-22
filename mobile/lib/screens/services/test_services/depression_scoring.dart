import 'package:flutter/material.dart';

class DepressionScoring {
  static DepressionResult getDepressionResult(int score) {
    if (score >= 0 && score <= 9) {
      return DepressionResult(
        category: 'Normal',
        description:
            'Your symptoms are within the normal range. Continue maintaining your mental health through healthy habits and self-care.',
        color: Colors.green[300]!,
      );
    } else if (score >= 10 && score <= 13) {
      return DepressionResult(
        category: 'Mild Depression',
        description:
            'You are experiencing mild symptoms of depression. Consider talking to a mental health professional for guidance and support.',
        color: Colors.yellow[600]!,
      );
    } else if (score >= 14 && score <= 20) {
      return DepressionResult(
        category: 'Moderate Depression',
        description:
            'You are experiencing moderate symptoms of depression. It is recommended to seek professional help to develop coping strategies.',
        color: Colors.orange,
      );
    } else if (score >= 21 && score <= 27) {
      return DepressionResult(
        category: 'Severe Depression',
        description:
            'You are experiencing severe symptoms of depression. Please seek professional help as soon as possible for proper evaluation and treatment.',
        color: Colors.deepOrange,
      );
    } else {
      return DepressionResult(
        category: 'Extremely Severe Depression',
        description:
            'You are experiencing extremely severe symptoms of depression. It is crucial to seek immediate professional help and support.',
        color: Colors.red,
      );
    }
  }
}

class DepressionResult {
  final String category;
  final String description;
  final Color color;

  DepressionResult({
    required this.category,
    required this.description,
    required this.color,
  });
}
