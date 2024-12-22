import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/signin_screen.dart';
import 'package:flutter_mindmed_project/screens/splash_screen.dart';
import 'package:flutter_mindmed_project/widgets/colors.dart';
import 'package:fluttertoast/fluttertoast.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});
  static const id = '/signup';

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  bool _isPasswordVisible = false;
  bool _isPressed = false;
  final ValueNotifier<String?> _selectedGender = ValueNotifier<String?>(null);

  // bool _isPressed = false;

  Color _containerColor = primaryColor;

  final FocusNode _nameFocusNode = FocusNode();
  final FocusNode _firstNameFocusNode = FocusNode();
  final FocusNode _lastNameFocusNode = FocusNode();

  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();
  final FocusNode _confirmPasswordFocusNode = FocusNode();
  final FocusNode _phoneFocusNode = FocusNode();
  final FocusNode _genderFocusNode = FocusNode();
  final FocusNode _dateFocusNode = FocusNode();
  final FocusNode _nationalityFocusNode = FocusNode();
  final FocusNode _fluentLanguageFocusNode = FocusNode();
  final FocusNode _currentResidenceFocusNode = FocusNode();

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _nationalityController = TextEditingController();

  final TextEditingController _fluentLanguageController =
      TextEditingController();

  final TextEditingController _currentResidenceController =
      TextEditingController();

  int currentStep = 0;

  @override
  void dispose() {
    _nameFocusNode.dispose();
    _emailFocusNode.dispose();
    _passwordFocusNode.dispose();
    _genderFocusNode.dispose();
    _dateFocusNode.dispose();
    _confirmPasswordFocusNode.dispose();
    _phoneController.dispose();
    _dateController.dispose();

    super.dispose();
  }

  void _onNextStep() {
    if (currentStep < 3) {
      setState(() {
        currentStep++;
      });
    } else {
      _validateAndSubmit();
    }
  }

  void _validateAndSubmit() {
    String name = _nameController.text.trim();
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();
    String confirmPassword = _confirmPasswordController.text.trim();
    String phone = _phoneController.text.trim();
    String date = _dateController.text.trim();

    // Validate each field
    if (name.isEmpty) {
      Fluttertoast.showToast(
        msg: "Please enter your name",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    if (email.isEmpty ||
        !RegExp(r"^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+")
            .hasMatch(email)) {
      Fluttertoast.showToast(
        msg: "Please enter a valid email",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    if (password.isEmpty || password.length < 6) {
      Fluttertoast.showToast(
        msg: "Password must be at least 6 characters",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    if (confirmPassword.isEmpty || confirmPassword != password) {
      Fluttertoast.showToast(
        msg: "Passwords do not match",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    if (phone.isEmpty || phone.length < 10) {
      Fluttertoast.showToast(
        msg: "Please enter a valid phone number",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    if (date.isEmpty) {
      Fluttertoast.showToast(
        msg: "Please enter a valid date",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    } else {
      // If all validations pass, show a success message
      _showSuccessDialog(context);
    }

    // Continue with form submission logic
  }

  void _onTapDown(TapDownDetails details) {
    setState(() {
      _containerColor =
          Color.fromARGB(255, 91, 255, 219); // Change color when pressed
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
            padding: EdgeInsets.all(20),
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
                SizedBox(height: 20),
                Text(
                  "Success!",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: const Color.fromARGB(255, 0, 255, 8),
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  "You have successfully signed up.",
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.green,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).pop();
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
                  child: Text(
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
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    double getWidth(double width) {
      return screenWidth * (width / 392.72727272727275);
    }

    double getHeight(double height) {
      return screenHeight * (height / 777.4545454545455);
    }

    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        body: SingleChildScrollView(
          child: Stack(
            children: [
              // Background Image
              Container(
                height:
                    getHeight(777.4545454545455), // Full height of the screen
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/Signin_Screen.png'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              // Top-centered Image
              Align(
                alignment: Alignment.topCenter,
                child: Padding(
                  padding: EdgeInsets.only(
                    top: getHeight(70),
                    left: getWidth(30),
                  ),
                  child: Image.asset(
                    'assets/animation/Animation - 1725391690653.gif',
                    width: getWidth(270),
                    height: getHeight(270),
                    fit: BoxFit.contain,
                  ),
                ),
              ),
              Column(
                children: [
                  // Sign-in text
                  Padding(
                    padding: EdgeInsets.only(
                      top: getHeight(330),
                      right: getWidth(40),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "If you have an account ?",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: getWidth(18), // Scaling font size as well
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(width: getWidth(8)),
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
                            Navigator.of(context).pushNamed(SigninScreen.id);
                          },
                          child: Text(
                            'Sign in',
                            style: TextStyle(
                              color: _isPressed ? primaryColor : Colors.red,
                              fontSize: getWidth(18),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Text(
                    'Sign up',
                    style: TextStyle(
                      fontSize: getWidth(30),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(top: getHeight(400)),
                    child: Text(
                      currentStep == 0
                          ? 'Step 1: Name and Email'
                          : currentStep == 1
                              ? 'Step 2: Password'
                              : 'Step 3: About You Details',
                      style: TextStyle(
                        fontSize: getWidth(22),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(height: getHeight(15)),
                  _buildFormFields(),
                  SizedBox(height: getHeight(20)),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: Padding(
                      padding: EdgeInsets.only(right: getWidth(40)),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // Back button
                          if (currentStep > 0)
                            Container(
                              width: getWidth(120),
                              height: getHeight(50),
                              child: ElevatedButton(
                                onPressed: () {
                                  setState(() {
                                    if (currentStep > 0) {
                                      currentStep--;
                                    }
                                  });
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.black,
                                  elevation: 5,
                                  shadowColor: Colors.black,
                                ),
                                child: Text(
                                  'Back',
                                  style: TextStyle(
                                    fontSize: getWidth(18),
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          SizedBox(width: getWidth(10)),
                          // Next/Submit button
                          Container(
                            width: getWidth(120),
                            height: getHeight(50),
                            child: ElevatedButton(
                              onPressed: _onNextStep,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: primaryColor,
                                elevation: 5,
                                shadowColor: Colors.black,
                              ),
                              child: Text(
                                currentStep == 3 ? 'Submit' : 'Next',
                                style: TextStyle(
                                  fontSize: getWidth(18),
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: Padding(
                      padding: const EdgeInsets.only(right: 60, top: 5),
                      child: Text(
                        currentStep == 0
                            ? 'Step 1 of 4'
                            : currentStep == 1
                                ? 'Step 2 of 4'
                                : currentStep == 2
                                    ? 'Step 3 of 4'
                                    : 'Step 4 of 4',
                        style: TextStyle(
                          color: primaryColor,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  if (currentStep == 0) ...[
                    Padding(
                      padding: EdgeInsets.only(top: 10, left: 5),
                      child: Row(
                        children: [
                          Expanded(
                            child: Divider(
                              color: Colors.grey,
                              thickness: 1,
                              indent: 35,
                              endIndent: 10,
                            ),
                          ),
                          Text(
                            "or",
                            style: TextStyle(color: Colors.grey, fontSize: 20),
                          ),
                          Expanded(
                            child: Divider(
                              color: Colors.grey,
                              thickness: 1,
                              indent: 10,
                              endIndent: 35,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Are you Therapist ?',
                            style: TextStyle(
                                fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                          SizedBox(
                            width: 8,
                          ),
                          Text('Join as a Therapist',
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.red)),
                        ],
                      ),
                    ),
                  ]
                ],
              ),
              // Back Arrow
              if (currentStep == 0)
                Positioned(
                  top: getHeight(60),
                  left: getWidth(40),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.of(context).pushNamed(SplashScreen.id);
                    },
                    child: Container(
                      height: getHeight(50),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: _containerColor,
                      ),
                      padding: EdgeInsets.only(left: getWidth(10)),
                      child: Icon(
                        Icons.arrow_back,
                        color: Colors.white,
                        size: getWidth(28),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFormFields() {
    if (currentStep == 0) {
      // Step 1: First Name, Last Name, and UserName
      return Column(
        children: [
          _buildTextField(
            _nameController,
            _nameFocusNode,
            'UserName',
            Icons.person,
          ),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _customTextField(
                controller: _firstNameController,
                focusNode: _firstNameFocusNode,
                labelText: 'First Name',
                icon: Icons.person_outline,
              ),
              SizedBox(width: MediaQuery.of(context).size.width * 0.01),
              _customTextField(
                controller: _lastNameController,
                focusNode: _lastNameFocusNode,
                labelText: 'Last Name',
                icon: Icons.person_outline,
              ),
            ],
          ),
        ],
      );
    } else if (currentStep == 1) {
      // Step 2: Password, Confirm Password, and Phone
      return Column(
        children: [
          _buildTextField(
              _emailController, _emailFocusNode, 'Email', Icons.email),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          _buildPasswordField(),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          _buildTextField(_confirmPasswordController, _confirmPasswordFocusNode,
              'Confirm Password', Icons.lock),
        ],
      );
    } else if (currentStep == 2) {
      // Step 3: Gender and Birth Date
      return Column(
        children: [
          _buildTextField(
              _phoneController, _phoneFocusNode, 'Phone', Icons.phone),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          _buildGenderSelection(),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          _buildBirthDateSelection(),
        ],
      );
    } else {
      return Column(
        children: [
          _newCustomTextField(
            controller: _nationalityController,
            focusNode: _nationalityFocusNode,
            labelText: 'Nationality',
            icon: Icons.flag,
          ),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          _newCustomTextField(
            controller: _fluentLanguageController,
            focusNode: _fluentLanguageFocusNode,
            labelText: 'Fluent Language',
            icon: Icons.language,
          ),
          SizedBox(height: MediaQuery.of(context).size.height * 0.03),
          _newCustomTextField(
            controller: _currentResidenceController,
            focusNode: _currentResidenceFocusNode,
            labelText: 'Current Residence',
            icon: Icons.home,
          )
        ],
      );
    }
  }

  Widget _buildTextField(TextEditingController controller, FocusNode focusNode,
      String label, IconData icon) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8,
      child: Theme(
        data: Theme.of(context).copyWith(
          textSelectionTheme: TextSelectionThemeData(
            selectionColor: primaryColor.withOpacity(0.5),
            selectionHandleColor: primaryColor,
          ),
        ),
        child: TextField(
          controller: controller,
          focusNode: focusNode,
          cursorColor: primaryColor,
          decoration: InputDecoration(
            labelText: label,
            labelStyle: TextStyle(
              color: focusNode.hasFocus ? primaryColor : Colors.black,
            ),
            prefixIcon: Icon(
              icon,
              color: focusNode.hasFocus ? primaryColor : Colors.black,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: primaryColor, width: 2.0),
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        ),
      ),
    );
  }

  Widget _customTextField({
    required TextEditingController controller,
    required FocusNode focusNode,
    required String labelText,
    required IconData icon,
  }) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.4,
      child: TextField(
        controller: controller,
        focusNode: focusNode,
        cursorColor: primaryColor,
        decoration: InputDecoration(
          labelText: labelText,
          labelStyle: TextStyle(
            color: focusNode.hasFocus ? primaryColor : Colors.black,
          ),
          prefixIcon: Icon(
            icon,
            color: focusNode.hasFocus ? primaryColor : Colors.black,
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: BorderSide(color: primaryColor, width: 2.0),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    );
  }

  Widget _buildPasswordField() {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8,
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
              color: _passwordFocusNode.hasFocus ? primaryColor : Colors.black,
            ),
            prefixIcon: Icon(
              Icons.lock,
              color: _passwordFocusNode.hasFocus ? primaryColor : Colors.black,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: primaryColor, width: 2.0),
            ),
            suffixIcon: IconButton(
              icon: Icon(
                _isPasswordVisible ? Icons.visibility : Icons.visibility_off,
                color: _isPasswordVisible ? primaryColor : Colors.black,
              ),
              onPressed: () {
                setState(() {
                  _isPasswordVisible = !_isPasswordVisible;
                });
              },
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGenderSelection() {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8,
      child: ValueListenableBuilder<String?>(
        valueListenable: _selectedGender,
        builder: (context, selectedGender, _) {
          return DropdownButtonFormField<String>(
            focusNode: _genderFocusNode,
            decoration: InputDecoration(
              labelText: 'Gender',
              labelStyle: TextStyle(
                color: _genderFocusNode.hasFocus ? primaryColor : Colors.black,
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide(
                  color: Colors.black,
                ),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide(
                  color: primaryColor,
                  width: 2.0,
                ),
              ),
            ),
            value: selectedGender,
            items: ['Male', 'Female', 'Other'].map((gender) {
              return DropdownMenuItem<String>(
                value: gender,
                child: Text(
                  gender,
                  style: TextStyle(
                    color:
                        _genderFocusNode.hasFocus ? primaryColor : Colors.black,
                  ),
                ),
              );
            }).toList(),
            onChanged: (value) {
              _selectedGender.value = value;
            },
          );
        },
      ),
    );
  }

  Widget _buildBirthDateSelection() {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8,
      child: TextField(
        controller: _dateController,
        focusNode: _dateFocusNode,
        readOnly: true,
        decoration: InputDecoration(
          labelText: 'Birth Date',
          labelStyle: TextStyle(
            color: _dateFocusNode.hasFocus ? primaryColor : Colors.black,
          ),
          prefixIcon: Icon(
            Icons.calendar_month_outlined,
            color: _dateFocusNode.hasFocus ? primaryColor : Colors.black,
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: BorderSide(
              color: primaryColor,
              width: 2.0,
            ),
          ),
        ),
        style: TextStyle(
          color: _dateFocusNode.hasFocus ? primaryColor : Colors.black,
        ),
        onTap: () async {
          DateTime? pickedDate = await showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(1900),
            lastDate: DateTime.now(),
            builder: (context, child) {
              return Theme(
                data: ThemeData(
                  primaryColor: primaryColor,
                  colorScheme: ColorScheme.light(
                    primary: primaryColor,
                    onPrimary: Colors.white,
                    onSurface: primaryColor,
                  ),
                  dialogBackgroundColor: Colors.white,
                ),
                child: child!,
              );
            },
          );

          if (pickedDate != null) {
            String formattedDate =
                "${pickedDate.day}/${pickedDate.month}/${pickedDate.year}";
            setState(() {
              _dateController.text = formattedDate;
            });
          }
        },
      ),
    );
  }

  Widget _newCustomTextField({
    required TextEditingController controller,
    required FocusNode focusNode,
    required String labelText,
    required IconData icon,
  }) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8,
      child: TextField(
        controller: controller,
        focusNode: focusNode,
        cursorColor: primaryColor,
        decoration: InputDecoration(
          labelText: labelText,
          labelStyle: TextStyle(
            color: focusNode.hasFocus ? primaryColor : Colors.black,
          ),
          prefixIcon: Icon(
            icon,
            color: focusNode.hasFocus ? primaryColor : Colors.black,
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: primaryColor,
              width: 2.0,
            ),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: Colors.grey,
            ),
          ),
        ),
      ),
    );
  }
}
