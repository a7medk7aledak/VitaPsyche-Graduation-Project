import 'package:flutter/material.dart'; // Import your CartCubit
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'cart_body.dart'; // Import your CartBody widget

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});
  static String id = 'cartScreen';

  @override
  Widget build(BuildContext context) {
    // Ensure that the BlocProvider is wrapping the entire screen
    return Scaffold(
      backgroundColor: secoundryColor, // Your background color
      appBar: AppBar(
        elevation: 3,
        
        foregroundColor: primaryColor,
        backgroundColor: secoundryColor, // Your app bar color
        centerTitle: true,
        title: const Text(
          'Cart Products',
          style: TextStyle(
            color: primaryColor,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: const CartBody(), // The CartBody widget where CartCubit is used
    );
  }
}
