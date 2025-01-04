import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';

class ProfileInfoItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const ProfileInfoItem({
    super.key,
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: [
          Icon(icon, color: mainBlueColor),
          const SizedBox(width: 8),
          Text('$label: $value'),
        ],
      ),
    );
  }
}