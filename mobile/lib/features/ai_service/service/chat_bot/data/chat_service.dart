import 'dart:convert';
import 'package:http/http.dart' as http;

class ChatService {
  static const String backendUrl = 'http://10.0.2.2:8000/chatbot/';  //'http://<your-computer-ip>:8000/chatbot/'
  // http://10.0.2.2:8000/chatbot/ work in android emulator only

  Future<String> sendMessage(String message) async {
    try {
      final response = await http.post(
        Uri.parse(backendUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'message': message}),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return data['response'] ?? 'No response from the server.';
      } else {
        return 'Error: Server responded with status code ${response.statusCode}';
      }
    } catch (e) {
      return 'Error: $e';
    }
  }
}
