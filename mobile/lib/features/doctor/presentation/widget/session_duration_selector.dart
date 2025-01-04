
import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';

class SessionDurationSelector extends StatefulWidget {
  final Function(String duration, String price)? onDurationSelected;

  const SessionDurationSelector({
    super.key,
    this.onDurationSelected,
  });

  @override
  State<SessionDurationSelector> createState() =>
      _SessionDurationSelectorState();
}

class _SessionDurationSelectorState extends State<SessionDurationSelector> {
  String? selectedDuration;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey[300]!),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Select session duration:'),
          const SizedBox(height: 8),
          Row(
            children: [
              _buildDurationOption('30 Min', '600 EGP / 30 Min'),
              const SizedBox(width: 12),
              _buildDurationOption('60 Min', '950 EGP / 60 Min'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDurationOption(String duration, String price) {
    final isSelected = selectedDuration == duration;

    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            selectedDuration = duration;
          });
          widget.onDurationSelected?.call(duration, price);
        },
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            border: Border.all(
              color: isSelected ? mainBlueColor : Colors.grey[300]!,
              width: isSelected ? 2 : 1,
            ),
            borderRadius: BorderRadius.circular(8),
            color: isSelected ? mainBlueColor.withOpacity(0.1) : null,
          ),
          child: Column(
            children: [
              Text(
                duration,
                style: TextStyle(
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                price,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: isSelected ? mainBlueColor : null,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
