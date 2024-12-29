import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/routes/app_routes.dart';

class TextController {
  int currentPositionPage = 0;
  bool isNextOrPrev = false;

  // Stream controllers
  final StreamController<int> _pageController =
      StreamController<int>.broadcast();
  final StreamController<bool> _prevButtonController =
      StreamController<bool>.broadcast();

  // Public streams
  Stream<int> get positionStream => _pageController.stream;
  Stream<bool> get prevButtonStream => _prevButtonController.stream;

  // Question response tracking
  final List<int?> responses;
  final int totalQuestions;

  TextController({required this.totalQuestions})
      : responses = List.filled(totalQuestions, null) {
    // Initialize streams with starting values
    _pageController.add(currentPositionPage);
    _updatePrevButtonVisibility();
  }

  void updateResponse(int score) {
    if (currentPositionPage < responses.length) {
      responses[currentPositionPage] = score;
    }
  }

  bool canMoveNext() {
    return responses[currentPositionPage] != null;
  }

  void onTapNext(
  BuildContext context, {
  required String testTitle,
  required dynamic scoring,
}) {
  if (!canMoveNext()) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Please select an answer before proceeding."))
    );
    return;
  }

  if (currentPositionPage < totalQuestions - 1) {
    currentPositionPage++;
    _pageController.add(currentPositionPage);
    _updatePrevButtonVisibility();
    isNextOrPrev = true;
  } else {
    // Calculate final score
    final totalScore = responses.fold(0, (sum, score) => sum + (score ?? 0));
    
    Navigator.pushReplacementNamed(
      context,
      AppRoutes.depressionScaleResult,
      arguments: {
        'testTitle': testTitle,
        'totalScore': totalScore,
      },
    );
  }
}

  void onTapPrev() {
    if (currentPositionPage > 0) {
      currentPositionPage--;
      _pageController.add(currentPositionPage);
      _updatePrevButtonVisibility();
      isNextOrPrev = true;
    }
  }

  void onTapDotIndicator(int index) {
    if (index >= 0 && index < totalQuestions) {
      currentPositionPage = index;
      _pageController.add(currentPositionPage);
      _updatePrevButtonVisibility();
    }
  }

  void _updatePrevButtonVisibility() {
    _prevButtonController.add(currentPositionPage > 0);
  }

  void dispose() {
    _pageController.close();
    _prevButtonController.close();
  }
}
