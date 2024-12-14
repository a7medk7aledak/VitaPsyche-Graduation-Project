import 'dart:async';

class AuthService {
  static final _authController = StreamController<bool>.broadcast();

  // Expose the stream
  static Stream<bool> get authState => _authController.stream;

  // Emit login state
  static void login() => _authController.add(true);
  static void logout() => _authController.add(false);

  static void dispose() {
    _authController.close();
  }
}
