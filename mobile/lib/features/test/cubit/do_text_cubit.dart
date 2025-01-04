import 'package:bloc/bloc.dart';

class DoTestState {
  final int currentIndex;
  final int totalSorce;
  final Map<int, String> selectedAnswers;
  final bool isComplete;

  DoTestState( {
    this.totalSorce=0,
    this.currentIndex = 0,
    this.selectedAnswers = const {},
    this.isComplete = false,
  });

  DoTestState copyWith({
    int? totalSorce,
    int? currentIndex,
    Map<int, String>? selectedAnswers,
    bool? isComplete,
  }) {
    return DoTestState(
      totalSorce: totalSorce ?? this.totalSorce,
      currentIndex: currentIndex ?? this.currentIndex,
      selectedAnswers: selectedAnswers ?? this.selectedAnswers,
      isComplete: isComplete ?? this.isComplete,
    );
  }
}
class DoTestCubit extends Cubit<DoTestState> {
  DoTestCubit() : super(DoTestState());

  void selectAnswer(int questionIndex, String choice, int score) {
    final updatedAnswers = Map<int, String>.from(state.selectedAnswers);
    updatedAnswers[questionIndex] = choice;

    // تحديث المجموع
    int updatedScore = state.totalSorce;
    if (state.selectedAnswers.containsKey(questionIndex)) {
      // إذا كانت هناك إجابة سابقة، قم بطرح النقاط القديمة
      updatedScore -= state.selectedAnswers[questionIndex] == choice
          ? 0
          : score; // خصم النقاط القديمة.
    } else {
      // إضافة النقاط الجديدة
      updatedScore += score;
    }

    emit(state.copyWith(
      selectedAnswers: updatedAnswers,
      totalSorce: updatedScore,
    ));
  }

  void nextQuestion(int totalQuestions) {
    if (state.currentIndex < totalQuestions - 1) {
      emit(state.copyWith(currentIndex: state.currentIndex + 1));
    } else {
      emit(state.copyWith(isComplete: true));
    }
  }

  void previousQuestion() {
    if (state.currentIndex > 0) {
      emit(state.copyWith(currentIndex: state.currentIndex - 1));
    }
  }
}
