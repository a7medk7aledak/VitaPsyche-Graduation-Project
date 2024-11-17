import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/services/test_services/result_text.dart';

class TextController {
  int currentPositionPage = 0;
  bool isNextOrPrev = false;

  // Dot Indicator Stream
  late final StreamController<int> streamControllerDotIndicator;
  late final Sink<int> inPutDataDotIndicator;
  late final Stream<int> outPutDataDotIndicator;

  // Start Text Stream
  late final StreamController<int> streamControllerStratText;
  late final Sink<int> inPutDataStartText;
  late final Stream<int> outPutDataStartText;

  // Position Stream (used for updating UI on index change)
  late final Stream<int> positionStream;

  TextController() {
    streamControllerDotIndicator = StreamController<int>.broadcast();
    inPutDataDotIndicator = streamControllerDotIndicator.sink;
    outPutDataDotIndicator = streamControllerDotIndicator.stream;

    streamControllerStratText = StreamController<int>.broadcast();
    inPutDataStartText = streamControllerStratText.sink;
    outPutDataStartText = streamControllerStratText.stream;

    // Initialize position stream to reflect dot indicator changes
    positionStream = outPutDataDotIndicator;

    // Initialize with the starting page
    inPutDataDotIndicator.add(currentPositionPage);
    inPutDataStartText.add(currentPositionPage);
  }

  void onTapDotIndicator(int indexPosition) {
    currentPositionPage = indexPosition;
    inPutDataDotIndicator.add(currentPositionPage);
    inPutDataStartText.add(currentPositionPage);
  }

 void onTapNext(BuildContext context, int totalQuestions, {required String testTitle, required int totalScore, required int maxScore, required dynamic scoring}) {
  if (currentPositionPage < totalQuestions - 1) {
    currentPositionPage++;
  } else {
    Navigator.pushNamedAndRemoveUntil(
      context,
      ResultText.id,
      arguments: {
        'testTitle': testTitle,
        'totalScore': totalScore,
        'maxScore': maxScore,
        'scoring': scoring,
      },
      (route) => false, 
    );
  }
  isNextOrPrev = true;
  inPutDataDotIndicator.add(currentPositionPage);
  inPutDataStartText.add(currentPositionPage);
}

  void onTapPrev(BuildContext context) {
    if (currentPositionPage > 0) {
      currentPositionPage--;
    }
    isNextOrPrev = true;
    inPutDataDotIndicator.add(currentPositionPage);
    inPutDataStartText.add(currentPositionPage);
  }

  void onDispose() {
    inPutDataDotIndicator.close();
    streamControllerDotIndicator.close();
    inPutDataStartText.close();
    streamControllerStratText.close();
  }
}
