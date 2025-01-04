
import 'package:flutter/material.dart';

class TimeSlotButton extends StatelessWidget {
  final String time;
  final bool isReserved;
  final bool isSelected;
  final VoidCallback onPressed;

  const TimeSlotButton({
    super.key,
    required this.time,
    required this.isReserved,
    required this.isSelected,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        if (isReserved) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('This appointment is already booked!'),
              backgroundColor: Colors.red,
              duration: Duration(seconds: 2),
            ),
          );
        } else {
          // تنفيذ الإجراء عند الضغط إذا لم يكن محجوزًا
          onPressed();
        }
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: isSelected
            ? Colors.blue[50]
            : isReserved
                ? Colors.red[100]
                : Colors.teal[100],
        foregroundColor: isReserved ? Colors.red : Colors.black,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
          side: BorderSide(
            color: isSelected
                ? Colors.blue
                : isReserved
                    ? Colors.red
                    : Colors.teal,
            width: 2,
          ),
        ),
      ),
      child: Text(
        time,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: isSelected
              ? Colors.blue
              : isReserved
                  ? Colors.red
                  : Colors.black,
        ),
      ),
    );
  }
}
