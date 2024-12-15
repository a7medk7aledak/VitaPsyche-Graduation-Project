import 'dart:async';

class AuthService {
  // StreamController for authentication state
  static final _authController = StreamController<bool>();

  // Expose the auth state as a stream
  static Stream<bool> get authState => _authController.stream;

  // Log in and emit the state
  static void login() {
    _authController.add(true);
    // print("User logged in.");
  }

  // Log out and emit the state
  static void logout() {
    _authController.add(false);
    // print("User logged out.");
  }

  // Dispose of the controller
  static void dispose() {
    _authController.close();
    // print("AuthService disposed.");
  }
}
