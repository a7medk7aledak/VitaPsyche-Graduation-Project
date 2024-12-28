class Fqas {
  late String question;
  late String answer;

  //* List of FAQs, essentially an array of 'question-answer' pairs.
  late List<Fqas> fqas;

  Fqas({required this.question, required this.answer});

  Fqas.fromJson(Map<String, dynamic> json) {
    fqas = [];
    if (json['faqs'] != null) {
      json['faqs'].forEach((val) {
        // Check if the question or answer is null and handle it gracefully.
        //!my true:::
        String question = val['question'] ?? 'No question provided';
        String answer = val['answer'] ?? 'No answer provided';
        fqas.add(Fqas(question: question, answer: answer));
      });
    } else {
      // Handle individual FAQ items
      question = json['question'] ?? 'No question provided';
      answer = json['answer'] ?? 'No answer provided';
    }
  }
}
