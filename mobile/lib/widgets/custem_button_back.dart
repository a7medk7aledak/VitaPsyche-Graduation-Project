import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';

Widget custemButtonBack(BuildContext _) {
  return GestureDetector(
    onTap: () => Navigator.of(_).pop(),
    child: Container(
      height: 50,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: primaryColor,
      ),
      padding: const EdgeInsets.only(left: 10),
      child: Icon(
        Icons.arrow_back,
        color: Colors.white,
        size: 28,
      ),
    ),
  );
}
