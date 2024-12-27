// by ahmed khaled

import 'dart:convert'; // To handle JSON encoding and decoding
import 'package:http/http.dart' as http; // For HTTP requests

class ChatService {
  // Define the base URL of your backend
  final String baseUrl = 'http://127.0.0.1:8000/chatbot/'; 

  // Function to send a message to the backend
  Future<String> sendMessage(String message) async {
    try {
      // Make a POST request with the message
      final response = await http.post(
        Uri.parse(baseUrl),
        headers: {'Content-Type': 'application/json'}, // Set content type as JSON
        body: jsonEncode({'message': message}), // Encode the message into JSON
      );

      // Check if the response status is OK
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body); // Decode the JSON response
        return data['response']; // Return the response from the backend
      } else {
        return 'Error: ${response.statusCode}'; // Handle error response
      }
    } catch (error) {
      return 'Error: $error'; // Handle any exceptions
    }
  }
}
