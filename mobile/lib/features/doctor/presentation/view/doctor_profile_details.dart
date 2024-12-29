import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';

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
            Card(
              color: Colors.white,
              elevation: 5,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 40,
                          backgroundImage: AssetImage(imagePath),
                        ),
                        const SizedBox(width: 16),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              doctorName,
                              style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: primaryColor),
                            ),
                            Text(
                              specialty,
                              style: const TextStyle(
                                  fontSize: 14, color: Colors.grey),
                            ),
                          ],
                        ),
                        const Spacer(),
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
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Specification: $specification',
                      style:
                          const TextStyle(fontSize: 16, color: mainBlueColor),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        const Icon(Icons.language, color: mainBlueColor),
                        const SizedBox(width: 8),
                        Text('Language: $language'),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.public, color: mainBlueColor),
                        const SizedBox(width: 8),
                        Text('Country: $country'),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.date_range, color: mainBlueColor),
                        const SizedBox(width: 8),
                        Text('Joining Date: $joiningDate'),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.event, color: mainBlueColor),
                        const SizedBox(width: 8),
                        Text('Sessions: $sessions'),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.attach_money, color: mainBlueColor),
                        const SizedBox(width: 8),
                        Text('Salary: $salary'),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: [
                  _buildExpansionTile(
                      'Interests', ['Interest 1', 'Interest 2']),
                  _buildExpansionTile('Rating', ['Rating 1', 'Rating 2']),
                  _buildExpansionTile('Review', ['Review 1', 'Review 2']),
                  _buildExpansionTile(
                      'Certification', ['Certification 1', 'Certification 2']),
                  _buildExpansionTile(
                      'Education', ['Education 1', 'Education 2']),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExpansionTile(String title, List<String> items) {
    return ExpansionTile(
      title: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 1,
              blurRadius: 5,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: primaryColor),
              ),
              const Icon(Icons.arrow_drop_down),
            ],
          ),
        ),
      ),
      children: items
          .map((item) => ListTile(
                title: Text(
                  item,
                  style: const TextStyle(color: mainBlueColor),
                ),
              ))
          .toList(),
    );
  }
}
