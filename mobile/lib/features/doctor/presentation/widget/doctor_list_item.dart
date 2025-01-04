// widgets/doctor_list_item.dart
import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';
import '../../data/doctor_model.dart';

class DoctorListItem extends StatelessWidget {
  final DoctorModel doctor;
  final VoidCallback onProfileView;
  final VoidCallback onBookView;

  const DoctorListItem({
    super.key,
    required this.doctor,
    required this.onProfileView,
    required this.onBookView,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: secoundryColor,
      margin: const EdgeInsets.all(10),
      elevation: 10,
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            _buildDoctorHeader(),
            const SizedBox(height: 10),
            _buildDoctorInfo(),
            const SizedBox(height: 10),
            _buildActionButtons(context),
          ],
        ),
      ),
    );
  }

  Widget _buildDoctorHeader() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CircleAvatar(
          radius: 30,
          backgroundImage: AssetImage(doctor.imagePath),
        ),
        const SizedBox(width: 10),
        _buildDoctorNameAndSpecialty(),
        const Spacer(),
        _buildDoctorStats(),
      ],
    );
  }

  Widget _buildDoctorNameAndSpecialty() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          doctor.name,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: primaryColor,
          ),
        ),
        Text(
          doctor.specialty,
          style: const TextStyle(color: mainBlueColor),
        ),
      ],
    );
  }

  Widget _buildDoctorStats() {
    return Column(
      children: [
        if (doctor.isTopTherapist) const Icon(Icons.star, color: Colors.amber),
        const Text('Top Therapist', style: TextStyle(color: mainBlueColor)),
        Text('${doctor.sessions} Sessions',
            style: const TextStyle(color: mainBlueColor)),
      ],
    );
  }

  Widget _buildDoctorInfo() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(doctor.multiSpecialization),
            const SizedBox(height: 5),
            _buildInfoRow(Icons.access_time, doctor.nextAppointment),
            const SizedBox(height: 5),
            _buildInfoRow(Icons.attach_money, 'Salary: ${doctor.salary}'),
          ],
        ),
      ],
    );
  }

  Widget _buildInfoRow(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, size: 16, color: mainBlueColor),
        const SizedBox(width: 5),
        Text(text, style: const TextStyle(color: mainBlueColor)),
      ],
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildActionButton('View Profile', onProfileView),
        _buildActionButton('Book Now', onBookView),
      ],
    );
  }

  Widget _buildActionButton(String text, VoidCallback onPressed) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        shape: const StadiumBorder(),
      ),
      child: Text(text, style: const TextStyle(color: secoundryColor)),
    );
  }
}
