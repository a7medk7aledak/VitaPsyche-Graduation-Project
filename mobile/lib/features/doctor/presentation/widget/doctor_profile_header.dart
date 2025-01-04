import 'package:flutter/material.dart';

class DoctorProfileHeader extends StatelessWidget {
  const DoctorProfileHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const CircleAvatar(
          radius: 25,
          backgroundImage: AssetImage('assets/images/doctor2.png'),
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'DR.Wessim Ashraf',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Text('Psychiatrist'),
            Row(
              children: [
                const Icon(Icons.star, color: Colors.blue, size: 16),
                const Text(
                  '4.8',
                  style: TextStyle(color: Colors.blue),
                ),
                Text(
                  ' (1172 Reviews)',
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
