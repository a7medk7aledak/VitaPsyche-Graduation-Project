import 'package:flutter/material.dart';

void massgeSuccessfully(BuildContext _) {
    ScaffoldMessenger.of(_).showSnackBar(
      SnackBar(
        backgroundColor: Colors.green[400],
        content:
            const Text('Added to cart successfully!'),
        duration: const Duration(milliseconds: 300),
      ),
    );
  }