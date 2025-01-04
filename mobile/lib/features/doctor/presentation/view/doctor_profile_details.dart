import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';

import '../widget/custom_expansion_tile.dart';
import '../widget/profile_header.dart';
import '../widget/profile_info_item.dart';

class DoctorProfileDetails extends StatelessWidget {
  final String doctorName;
  final String specialty;
  final String imagePath;
  final String rating;
  final String specification;
  final String language;
  final String country;
  final String joiningDate;
  final int sessions;
  final String salary;

  const DoctorProfileDetails({
    super.key,
    required this.doctorName,
    required this.specialty,
    required this.imagePath,
    required this.rating,
    required this.specification,
    required this.language,
    required this.country,
    required this.joiningDate,
    required this.sessions,
    required this.salary,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(doctorName),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildProfileCard(),
            const SizedBox(height: 16),
            Expanded(child: _buildExpandedContent()),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileCard() {
    return Card(
      color: Colors.white,
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ProfileHeader(
              imagePath: imagePath,
              name: doctorName,
              specialty: specialty,
              rating: rating,
            ),
            const SizedBox(height: 16),
            Text(
              'Specification: $specification',
              style: const TextStyle(fontSize: 16, color: mainBlueColor),
            ),
            const SizedBox(height: 16),
            ProfileInfoItem(
              icon: Icons.language,
              label: 'Language',
              value: language,
            ),
            ProfileInfoItem(
              icon: Icons.public,
              label: 'Country',
              value: country,
            ),
            ProfileInfoItem(
              icon: Icons.date_range,
              label: 'Joining Date',
              value: joiningDate,
            ),
            ProfileInfoItem(
              icon: Icons.event,
              label: 'Sessions',
              value: sessions.toString(),
            ),
            ProfileInfoItem(
              icon: Icons.attach_money,
              label: 'Salary',
              value: salary,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExpandedContent() {
    final sections = {
      'Interests': ['Interest 1', 'Interest 2'],
      'Rating': ['Rating 1', 'Rating 2'],
      'Review': ['Review 1', 'Review 2'],
      'Certification': ['Certification 1', 'Certification 2'],
      'Education': ['Education 1', 'Education 2'],
    };

    return ListView(
      children: sections.entries
          .map((e) => CustomExpansionTile(title: e.key, items: e.value))
          .toList(),
    );
  }
}




// widgets/custom_expansion_tile.dart
