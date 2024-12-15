import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/custem_button_bar.dart';
import 'package:flutter_mindmed_project/screens/signup_screen.dart';
import 'package:flutter_mindmed_project/screens/splash_screen.dart';
import 'package:fluttertoast/fluttertoast.dart';
import '../const/colors.dart';
import 'auth_service.dart';

class SigninScreen extends StatefulWidget {
  const SigninScreen({super.key});
  static const id = '/signin';

  @override
  State<SigninScreen> createState() => _SigninScreenState();
}

class _SigninScreenState extends State<SigninScreen> {
  bool _isPasswordVisible = false;
  bool _isPressed = false;

  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool _isEmailFocused = false;
  bool _isPasswordFocused = false;

  Color _containerColor = primaryColor;

  @override
  void initState() {
    super.initState();

    _emailFocusNode.addListener(() {
      setState(() {
        _isEmailFocused = _emailFocusNode.hasFocus;
        _isPasswordFocused = _passwordFocusNode.hasFocus;
      });
    });

    _passwordFocusNode.addListener(() {
      setState(() {
        _isEmailFocused = _emailFocusNode.hasFocus;
        _isPasswordFocused = _passwordFocusNode.hasFocus;
      });
    });
  }

  @override
  void dispose() {
    _emailFocusNode.dispose();
    _passwordFocusNode.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _validateAndSignIn() {
    String email = _emailController.text;
    String password = _passwordController.text;

    if (email.isEmpty) {
      Fluttertoast.showToast(
        msg: "Please enter your email",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    } else if (!_isValidEmail(email)) {
      Fluttertoast.showToast(
        msg: "Please enter a valid email",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    } else if (password.isEmpty) {
      Fluttertoast.showToast(
        msg: "Please enter your password",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    } else if (password.length < 6) {
      Fluttertoast.showToast(
        msg: "Password must be at least 6 characters",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    } else {
      // Proceed with sign-in logic
      _showSuccessDialog(context);
    }
  }

  bool _isValidEmail(String email) {
    // Basic email regex for validation
    final regex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
    return regex.hasMatch(email);
  }

  void _onTapDown(TapDownDetails details) {
    setState(() {
      _containerColor =
          const Color.fromARGB(255, 91, 255, 219); // Change color when pressed
    });
  }

  void _onTapUp(TapUpDetails details) {
    setState(() {
      _containerColor = primaryColor; // Revert color when released
    });
  }

  void _showSuccessDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible:
          false, // Prevent closing the dialog by tapping outside
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          elevation: 16,
          child: Container(
            padding: const EdgeInsets.all(20),
            width: MediaQuery.of(context).size.width * 0.8,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Replace Icon with the GIF
                SizedBox(
                  width: 80,
                  height: 80,
                  child: Image.asset(
                    'assets/animation/Animation - 1726443797305 (1).gif',
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(height: 20),
                const Text(
                  "Success!",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 0, 255, 8),
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  "You have successfully signed in.",
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.green,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    AuthService.login();
                    Navigator.of(context).pushNamed(CustemButtonBar.id);
                    // Fluttertoast.showToast(
                    //   msg: "Sign In successful",
                    //   backgroundColor: const Color.fromARGB(255, 110, 228, 114),
                    //   toastLength: Toast.LENGTH_SHORT,
                    //   gravity: ToastGravity.BOTTOM,
                    // );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: primaryColor,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text(
                    'OK',
                    style: TextStyle(color: secoundryColor),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final screenWidth = screenSize.width;
    final screenHeight = screenSize.height;

    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        backgroundColor: primaryColor,
        resizeToAvoidBottomInset: true,
        body: SingleChildScrollView(
          child: Stack(
            children: [
              Container(
                height: screenHeight,
                decoration: const BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/Signin_Screen.png'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Align(
                alignment: Alignment.topCenter,
                child: Padding(
                  padding: EdgeInsets.only(
                      top: screenHeight * 0.1, left: screenWidth * 0.1),
                  child: Image.asset(
                    'assets/animation/Animation - 1725391690653.gif',
                    width: screenWidth * 0.7,
                    height: screenWidth * 0.7,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
              Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(
                        top: screenHeight * 0.45, right: screenWidth * 0.07),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          "If you have't an account ?",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(width: 8),
                        GestureDetector(
                          onTapDown: (_) {
                            setState(() {
                              _isPressed = true;
                            });
                          },
                          onTapUp: (_) {
                            setState(() {
                              _isPressed = false;
                            });
                            Navigator.of(context).pushNamed(SignupScreen.id);
                          },
                          child: Text(
                            'Sign up',
                            style: TextStyle(
                              color: _isPressed ? primaryColor : Colors.red,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(top: 15),
                    child: Text(
                      'Sign in',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),
                  SizedBox(
                    width: screenWidth * 0.8,
                    child: Theme(
                      data: Theme.of(context).copyWith(
                        textSelectionTheme: TextSelectionThemeData(
                          selectionColor: primaryColor.withOpacity(0.5),
                          selectionHandleColor: primaryColor,
                        ),
                      ),
                      child: TextField(
                        controller: _emailController,
                        focusNode: _emailFocusNode,
                        cursorColor: primaryColor,
                        decoration: InputDecoration(
                          labelText: 'Email',
                          labelStyle: TextStyle(
                            color:
                                _isEmailFocused ? primaryColor : Colors.black,
                          ),
                          prefixIcon: Icon(
                            Icons.email,
                            color:
                                _isEmailFocused ? primaryColor : Colors.black,
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: const BorderSide(
                                color: Colors.grey, width: 2.0),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: const BorderSide(
                                color: primaryColor, width: 2.0),
                          ),
                          filled: true,
                          fillColor: secoundryColor.withOpacity(0.8),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 25),
                  SizedBox(
                    width: screenWidth * 0.8,
                    child: Theme(
                      data: Theme.of(context).copyWith(
                        textSelectionTheme: TextSelectionThemeData(
                          selectionColor: primaryColor.withOpacity(0.5),
                          selectionHandleColor: primaryColor,
                        ),
                      ),
                      child: TextField(
                        controller: _passwordController,
                        focusNode: _passwordFocusNode,
                        obscureText: !_isPasswordVisible,
                        cursorColor: primaryColor,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          labelStyle: TextStyle(
                            color: _isPasswordFocused
                                ? primaryColor
                                : Colors.black,
                          ),
                          prefixIcon: Icon(
                            Icons.lock,
                            color: _isPasswordFocused
                                ? primaryColor
                                : Colors.black,
                          ),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _isPasswordVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: _isPasswordVisible
                                  ? primaryColor
                                  : Colors.black,
                            ),
                            onPressed: () {
                              setState(() {
                                _isPasswordVisible = !_isPasswordVisible;
                              });
                            },
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: const BorderSide(
                                color: Colors.grey, width: 2.0),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: const BorderSide(
                                color: primaryColor, width: 2.0),
                          ),
                          filled: true,
                          fillColor: secoundryColor.withOpacity(0.8),
                        ),
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: Padding(
                      padding:
                          EdgeInsets.only(top: 60, right: screenWidth * 0.1),
                      child: SizedBox(
                        width: 120,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _validateAndSignIn,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: primaryColor,
                            elevation: 5,
                            shadowColor: Colors.black,
                          ).copyWith(
                            overlayColor:
                                MaterialStateProperty.resolveWith<Color?>(
                              (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed)) {
                                  return const Color.fromARGB(
                                      255, 91, 255, 219);
                                }
                                return null;
                              },
                            ),
                          ),
                          child: const Text(
                            'Sign In',
                            style: TextStyle(fontSize: 18, color: Colors.white),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Positioned(
                top: 60,
                left: screenWidth * 0.1,
                child: GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushNamed(SplashScreen.id);
                  },
                  onTapDown: _onTapDown,
                  onTapUp: _onTapUp,
                  child: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _containerColor,
                    ),
                    padding: const EdgeInsets.only(left: 10),
                    child: const Icon(
                      Icons.arrow_back,
                      color: Colors.white,
                      size: 28,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
