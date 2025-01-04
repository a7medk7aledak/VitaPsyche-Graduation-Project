class DoctorModel {
  final String name;
  final String specialty;
  final String imagePath;
  final String multiSpecialization;
  final String nextAppointment;
  final String salary;
  final int sessions;
  final bool isTopTherapist;

  DoctorModel({
    required this.name,
    required this.specialty,
    required this.imagePath,
    required this.multiSpecialization,
    required this.nextAppointment,
    required this.salary,
    required this.sessions,
    required this.isTopTherapist,
  });
}
