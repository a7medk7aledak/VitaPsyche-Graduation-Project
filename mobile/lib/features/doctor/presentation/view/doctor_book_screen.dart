import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import '../../../../core/routes/app_routes.dart';
import '../widget/doctor_profile_header.dart';
import '../widget/session_duration_selector.dart';
import '../widget/time_solt_grid.dart';

class DoctorBookingScreen extends StatefulWidget {
  const DoctorBookingScreen({super.key});

  @override
  State<DoctorBookingScreen> createState() => _DoctorBookingScreenState();
}

class _DoctorBookingScreenState extends State<DoctorBookingScreen> {
  String? selectedTime;
  String selectedDuration = '0 Min';
  String? selectedPrice = '0 EGP'; // قيمة افتراضية
  DateTime selectedDate = DateTime.now();
  late DateTime startDate;
  late DateTime endDate;
  @override
  void initState() {
    super.initState();
    _updateWeekDates(); // تحديث بداية ونهاية الأسبوع عند بدء الشاشة
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: _buildAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const DoctorProfileHeader(),
              const SizedBox(height: 16),
              SessionDurationSelector(
                onDurationSelected: (duration, price) {
                  setState(() {
                    selectedDuration = duration;
                    selectedPrice = price;
                  });
                },
              ),
              const SizedBox(height: 16),
              _buildDateNavigator(),
              const SizedBox(height: 16),
              TimeSlotGrid(
                onTimeSelected: (day, time) {
                  setState(() {
                    selectedTime = '$day $time'; // يحتفظ باليوم والوقت معًا
                  });
                },
                startDate: startDate,
                endDate: endDate,
              ),
              const SizedBox(height: 16),
              if (selectedTime != null) _buildBookingButton(),
            ],
          ),
        ),
      ),
    );
  }

  void _updateWeekDates() {
    // حساب بداية ونهاية الأسبوع
    final currentDay = selectedDate.weekday; // رقم اليوم في الأسبوع (1=الإثنين)
    setState(() {
      startDate =
          selectedDate.subtract(Duration(days: currentDay - 1)); // الإثنين
      endDate = startDate.add(const Duration(days: 6)); // الأحد
    });
  }

  void _navigateWeek(bool forward) {
    // تحديث التاريخ بناءً على الاتجاه
    setState(() {
      selectedDate = forward
          ? selectedDate.add(const Duration(days: 7))
          : selectedDate.subtract(const Duration(days: 7));
    });
    _updateWeekDates(); // تحديث بداية ونهاية الأسبوع
  }

  String _formatDate(DateTime date) {
    // تحويل التاريخ إلى نص
    return '${date.day} ${_monthName(date.month)} ${date.year}';
  }

  String _monthName(int month) {
    // تحويل رقم الشهر إلى اسمه
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return months[month - 1];
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: Colors.white,
      foregroundColor: primaryColor,
      elevation: 0,
      title: const Text(
        'Session Booking',
        style: TextStyle(color: primaryColor),
      ),
      centerTitle: true,
    );
  }

  Widget _buildDateNavigator() {
    // عرض التواريخ الديناميكية
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        IconButton(
          icon: const Icon(Icons.chevron_left),
          onPressed: () {
            _navigateWeek(false); // التنقل للخلف
          },
        ),
        Text(
          '${_formatDate(startDate)} - ${_formatDate(endDate)}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        IconButton(
          icon: const Icon(Icons.chevron_right),
          onPressed: () {
            _navigateWeek(true); // التنقل للأمام
          },
        ),
      ],
    );
  }

  Widget _buildBookingButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: () {
          // تحقق من أنه تم تحديد السعر والمدة
          if (selectedPrice == null ||
              selectedPrice == '0 EGP' ||
              selectedDuration == '0 Min') {
            // عرض رسالة تحذير للمستخدم
            showDialog(
              context: context,
              builder: (context) {
                return AlertDialog(
                  title: const Text('Invalid Selection'),
                  content: const Text(
                      'Please select both price and session duration before proceeding.'),
                  actions: [
                    TextButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                      child: const Text('OK'),
                    ),
                  ],
                );
              },
            );
          } else {
            // إذا كان كل شيء صحيحًا، الانتقال إلى شاشة الدفع
            Navigator.of(context).pushNamed(AppRoutes.paymentScreen,
                arguments: double.parse(RegExp(r'(\d+(\.\d+)?)')
                    .firstMatch(selectedPrice!)!
                    .group(0)!));
          }
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          padding: const EdgeInsets.symmetric(vertical: 15),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
        child: Text(
          'Book Now For ${selectedPrice ?? '150 EGP'}',
          style: const TextStyle(
            color: secoundryColor,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
