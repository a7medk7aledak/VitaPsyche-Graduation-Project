
// widgets/doctor_filter_dialog.dart
import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';

class DoctorFilterDialog extends StatefulWidget {
  const DoctorFilterDialog({super.key});

  @override
  State<DoctorFilterDialog> createState() => _DoctorFilterDialogState();
}

class _DoctorFilterDialogState extends State<DoctorFilterDialog> {
  String selectedAvailability = 'Today';
  String selectedDuration = 'All';
  String selectedGender = 'Male';
  int selectedRating = 5;
  String selectedCountry = 'USA';
  String selectedCity = 'New York';
  double selectedSalaryRange = 100;
  DateTime selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 600,
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            const SizedBox(height: 20),
            _buildAvailabilitySection(),
            _buildDateSection(),
            _buildInterestsSection(),
            _buildDurationSection(),
            _buildGenderSection(),
            _buildRatingSection(),
            _buildLocationSection(),
            _buildSalarySection(),
            _buildApplyButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return const Text(
      'Filter Options',
      style: TextStyle(
        fontSize: 18,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
    );
  }

Widget _buildAvailabilitySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.access_time, 'Availability'),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: ['Today', 'This Week', 'Online'].map((value) {
            return Row(
              children: [
                Radio<String>(
                  value: value,
                  groupValue: selectedAvailability,
                  onChanged: (String? newValue) {
                    setState(() => selectedAvailability = newValue!);
                  },
                ),
                Text(value),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildDateSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.date_range, 'Specific Date or Range'),
        TextButton(
          onPressed: () async {
            final pickedDate = await showDatePicker(
              context: context,
              initialDate: selectedDate,
              firstDate: DateTime(2000),
              lastDate: DateTime(2101),
            );
            if (pickedDate != null) {
              setState(() => selectedDate = pickedDate);
            }
          },
          child: Text(selectedDate.toString().split(' ')[0]),
        ),
      ],
    );
  }

  Widget _buildInterestsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.location_on, 'Areas of Interest'),
        DropdownButton<String>(
          isExpanded: true,
          hint: const Text('Select Language'),
          items: ['English', 'Spanish', 'French', 'German']
              .map((value) => DropdownMenuItem(value: value, child: Text(value)))
              .toList(),
          onChanged: (String? newValue) {},
        ),
      ],
    );
  }

  Widget _buildDurationSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.timer, 'Duration'),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: ['All', '30 min', '60 min'].map((value) {
            return Row(
              children: [
                Radio<String>(
                  value: value,
                  groupValue: selectedDuration,
                  onChanged: (String? newValue) {
                    setState(() => selectedDuration = newValue!);
                  },
                ),
                Text(value),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildGenderSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.person, 'Therapist Gender'),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: ['Male', 'Female'].map((value) {
            return Row(
              children: [
                Radio<String>(
                  value: value,
                  groupValue: selectedGender,
                  onChanged: (String? newValue) {
                    setState(() => selectedGender = newValue!);
                  },
                ),
                Text(value),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildRatingSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.star, 'Rating'),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(5, (index) {
            return IconButton(
              icon: Icon(
                index < selectedRating ? Icons.star : Icons.star_border,
                color: index < selectedRating ? Colors.amber : Colors.grey,
              ),
              onPressed: () => setState(() => selectedRating = index + 1),
            );
          }),
        ),
      ],
    );
  }

  Widget _buildLocationSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.public, 'Country and City'),
        DropdownButton<String>(
          isExpanded: true,
          value: selectedCountry,
          items: ['USA', 'Canada', 'UK', 'Australia']
              .map((value) => DropdownMenuItem(value: value, child: Text(value)))
              .toList(),
          onChanged: (String? newValue) {
            setState(() => selectedCountry = newValue!);
          },
        ),
        const SizedBox(height: 10),
        DropdownButton<String>(
          isExpanded: true,
          value: selectedCity,
          items: ['New York', 'Toronto', 'London', 'Sydney']
              .map((value) => DropdownMenuItem(value: value, child: Text(value)))
              .toList(),
          onChanged: (String? newValue) {
            setState(() => selectedCity = newValue!);
          },
        ),
      ],
    );
  }

  Widget _buildSalarySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(Icons.attach_money, 'Salary Range'),
        Slider(
          value: selectedSalaryRange,
          min: 50,
          max: 500,
          divisions: 9,
          label: '\$${selectedSalaryRange.round()}',
          onChanged: (value) => setState(() => selectedSalaryRange = value),
        ),
      ],
    );
  }

  Widget _buildApplyButton() {
    return Center(
      child: ElevatedButton(
        onPressed: () => Navigator.pop(context),
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
        ),
        child: const Text(
          'Apply Filter',
          style: TextStyle(color: secoundryColor),
        ),
      ),
    );
  }

  Widget _buildSectionHeader(IconData icon, String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: [
          Icon(icon, color: mainBlueColor),
          const SizedBox(width: 10),
          Text(
            title,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}