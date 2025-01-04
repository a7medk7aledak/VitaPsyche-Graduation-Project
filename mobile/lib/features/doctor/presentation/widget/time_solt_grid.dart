import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'time_slot_button.dart';

class TimeSlotGrid extends StatefulWidget {
  final Function(String, String) onTimeSelected;
  final DateTime startDate;
  final DateTime endDate;

  const TimeSlotGrid({
    super.key,
    required this.onTimeSelected,
    required this.startDate,
    required this.endDate,
  });

  @override
  _TimeSlotGridState createState() => _TimeSlotGridState();
}

class _TimeSlotGridState extends State<TimeSlotGrid> {
  final Map<String, List<String>> reservedSlots = {
    "Mon": ["7:30 pm", "8:30 pm"],
    "Tue": ["5:30 pm"],
    "Wed": [],
    "Thu": ["6:30 pm", "7:30 pm"],
    "Sat": ["9:30 am"],
    "Sun": ["10:30 am"],
  };

  final Map<String, String?> selectedSlots = {
    "Mon": null,
    "Tue": null,
    "Wed": null,
    "Thu": null,
    "Sat": null,
    "Sun": null,
  };

  late DateTime startDate;
  late DateTime endDate;

  @override
  void initState() {
    super.initState();
    // _updateDateRange("Sat");
    startDate = widget.startDate;
    endDate = widget.endDate;
  }

  void _updateDateRange(String day) {
    // Ensure that startDate is not null before using it
    int dayOffset =
        (DateTime.sunday - startDate.weekday + daysOfWeek[day]!) % 7;
    final newStartDate = startDate.add(Duration(days: dayOffset));
    setState(() {
      startDate = newStartDate;
      endDate = newStartDate.add(const Duration(days: 6));
    });
  }

  static const Map<String, int> daysOfWeek = {
    "Sun": 7,
    "Mon": 1,
    "Tue": 2,
    "Wed": 3,
    "Thu": 4,
    "Fri": 5,
    "Sat": 6,
  };

  @override
  Widget build(BuildContext context) {
    final days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

    return Column(
      children: days.map((day) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDayHeader(day),
            const SizedBox(height: 8),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 2.5,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
              ),
              itemCount: 6,
              itemBuilder: (context, index) {
                final time = _getTimeSlot(index);
                final isReserved = reservedSlots[day]?.contains(time) ?? false;
                final isSelected = selectedSlots[day] == time;

                return TimeSlotButton(
                  time: time,
                  isReserved: isReserved,
                  isSelected: isSelected,
                  onPressed: () {
                    setState(() {
                      if (selectedSlots[day] == time) {
                        selectedSlots[day] = null;
                      } else {
                        selectedSlots[day] = time;
                      }
                    });
                    if (!isReserved) {
                      widget.onTimeSelected(day, selectedSlots[day] ?? '');
                    }
                  },
                );
              },
            ),
            const SizedBox(height: 16),
          ],
        );
      }).toList(),
    );
  }

  String _getFormattedDate(String day) {
    final today = DateTime.now();
    final targetDay = today.add(Duration(
        days: (DateTime.sunday - today.weekday + daysOfWeek[day]!) % 7));
    final formatter = DateFormat('dd/MM/yyyy');
    return formatter.format(targetDay);
  }

  String _getTimeSlot(int index) {
    final baseHour = 3;
    final hour = baseHour + index;
    return '$hour:30 pm';
  }

  Widget _buildDayHeader(String day) {
    final date = _getFormattedDate(day);
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8),
      decoration: const BoxDecoration(
        color: Color(0xFF1A237E),
        borderRadius: BorderRadius.all(Radius.circular(8)),
      ),
      child: Center(
        child: Text(
          '$day - $date',
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}
