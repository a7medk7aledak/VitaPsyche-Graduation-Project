import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';

class ProfileHeader extends StatelessWidget {
  final String imagePath;
  final String name;
  final String specialty;
  final String rating;

  const ProfileHeader({
    super.key,
    required this.imagePath,
    required this.name,
    required this.specialty,
    required this.rating,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          radius: 40,
          backgroundImage: AssetImage(imagePath),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                name,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: primaryColor,
                ),
              ),
              Text(
                specialty,
                style: const TextStyle(fontSize: 14, color: Colors.grey),
              ),
            ],
          ),
        ),
        Column(
          children: [
            Row(
              children: [
                const Icon(Icons.star, color: Colors.amber),
                Text(rating),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
