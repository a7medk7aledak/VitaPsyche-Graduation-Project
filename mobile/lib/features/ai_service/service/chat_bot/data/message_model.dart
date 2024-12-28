class MessageModel {
  final String content;
  final String role; // 'user' or 'bot'
  final bool isLoading; // New property to indicate loading state
  final DateTime timestamp;

  MessageModel({
    required this.content,
    required this.role,
    this.isLoading = false, // Default to false
  }) : timestamp = DateTime.now();

  Map<String, dynamic> toJson() => {
        'role': role,
        'content': content,
        'timestamp': timestamp.toIso8601String(),
      };

  factory MessageModel.fromJson(Map<String, dynamic> json) {
    return MessageModel(
      role: json['role'],
      content: json['content'],
    );
  }
}
