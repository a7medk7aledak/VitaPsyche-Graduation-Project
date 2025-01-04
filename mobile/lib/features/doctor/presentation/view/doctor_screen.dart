import 'package:flutter/material.dart';
import '../../../../core/theme/colors.dart';
import '../../data/doctor_model.dart';
import '../widget/doctor_filter_dialog.dart';
import '../widget/doctor_list_item.dart';
import '../widget/filter_sort_row.dart';
import '../widget/search_bar_widget.dart';
import 'doctor_book_screen.dart';
import 'doctor_profile_details.dart';

class DoctorScreen extends StatelessWidget {
  DoctorScreen({super.key});

  final List<DoctorModel> doctors = _getDoctorsList();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: _buildAppBar(),
      body: Column(
        children: [
          const SearchBarWidget(),
          FilterSortRow(onFilterPressed: () => _showFilterDialog(context)),
          Expanded(
            child: _buildDoctorsList(context),
          ),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: Colors.white,
      title: const Text(
        'Our Therapists',
        style: TextStyle(
          color: primaryColor,
          fontWeight: FontWeight.bold,
        ),
      ),
      centerTitle: true,
      elevation: 0,
      automaticallyImplyLeading: false,
    );
  }

  Widget _buildDoctorsList(BuildContext context) {
    return ListView.builder(
      itemCount: doctors.length,
      itemBuilder: (context, index) => DoctorListItem(
        doctor: doctors[index],
        onProfileView: () => _navigateToDoctorProfile(context, doctors[index]),
        onBookView:() => _navigateToDoctorBook(context, doctors[index]) ,
        
      ),
    );
  }

  void _showFilterDialog(BuildContext context) {
    showModalBottomSheet(
      backgroundColor: Colors.white,
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => const DoctorFilterDialog(),
    );
  }

  void _navigateToDoctorProfile(BuildContext context, DoctorModel doctor) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DoctorProfileDetails(
          doctorName: doctor.name,
          specialty: doctor.specialty,
          imagePath: doctor.imagePath,
          rating: '4.5',
          specification: doctor.multiSpecialization,
          language: 'English',
          country: 'USA',
          joiningDate: '2021-01-01',
          sessions: doctor.sessions,
          salary: doctor.salary,
        ),
      ),
    );
  }
  void _navigateToDoctorBook(BuildContext context, DoctorModel doctor) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) =>const DoctorBookingScreen()
      ),
    );
  }

  static List<DoctorModel> _getDoctorsList() {
    return [
      DoctorModel(
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        imagePath: 'assets/images/doctor2.png',
        multiSpecialization: 'Heart Surgery',
        nextAppointment: 'Next: 11:00 AM',
        salary: '\$120/hr',
        sessions: 25,
        isTopTherapist: true,
      ),

    ];
  }
}
