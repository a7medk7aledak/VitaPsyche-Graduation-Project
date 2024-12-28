import 'package:flutter/material.dart';
import '../../../../core/theme/colors.dart';
import 'doctor_profile_details.dart'; // Import the new screen

// Define a Doctor model class
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

class Doctor extends StatelessWidget {
  Doctor({super.key});
  static const id = 'Doctor';

  final List<DoctorModel> doctors = [
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
    DoctorModel(
      name: 'Dr. Michael Brown',
      specialty: 'Neurologist',
      imagePath: 'assets/images/doctor2.png',
      multiSpecialization: 'Brain Disorders',
      nextAppointment: 'Next: 1:00 PM',
      salary: '\$150/hr',
      sessions: 30,
      isTopTherapist: false,
    ),
    DoctorModel(
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      imagePath: 'assets/images/doctor3.png',
      multiSpecialization: 'Skin Care',
      nextAppointment: 'Next: 2:30 PM',
      salary: '\$110/hr',
      sessions: 20,
      isTopTherapist: true,
    ),
    DoctorModel(
      name: 'Dr. John Smith',
      specialty: 'Orthopedic',
      imagePath: 'assets/images/doctor2.png',
      multiSpecialization: 'Bone Fractures',
      nextAppointment: 'Next: 3:00 PM',
      salary: '\$140/hr',
      sessions: 28,
      isTopTherapist: false,
    ),
    DoctorModel(
      name: 'Dr. Olivia Wilson',
      specialty: 'Pediatrician',
      imagePath: 'assets/images/doctor3.png',
      multiSpecialization: 'Child Health',
      nextAppointment: 'Next: 4:00 PM',
      salary: '\$130/hr',
      sessions: 18,
      isTopTherapist: true,
    ),
    DoctorModel(
      name: 'Dr. James Anderson',
      specialty: 'Psychologist',
      imagePath: 'assets/images/doctor2.png',
      multiSpecialization: 'Mental Health',
      nextAppointment: 'Next: 5:00 PM',
      salary: '\$100/hr',
      sessions: 22,
      isTopTherapist: false,
    ),
  ];

  void _showFilterDialog(BuildContext context) {
    String selectedAvailability = 'Today';
    String selectedDuration = 'All';
    String selectedGender = 'Male';
    int selectedRating = 5;
    String selectedCountry = 'USA';
    String selectedCity = 'New York';
    double selectedSalaryRange = 100;
    DateTime selectedDate = DateTime.now();

    showModalBottomSheet(
      backgroundColor: Colors.white,
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return Container(
              height: 600,
              width: MediaQuery.of(context).size.width,
              padding: const EdgeInsets.all(16.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Filter Options',
                      style: TextStyle(
                        fontSize: 18,
                        color: primaryColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 20),
                    // Availability
                    const Row(
                      children: [
                        Icon(Icons.access_time, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Availability',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Row(
                          children: [
                            Radio<String>(
                              value: 'Today',
                              groupValue: selectedAvailability,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedAvailability = value!;
                                });
                              },
                            ),
                            const Text('Today'),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<String>(
                              value: 'This Week',
                              groupValue: selectedAvailability,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedAvailability = value!;
                                });
                              },
                            ),
                            const Text('This Week'),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<String>(
                              value: 'Online',
                              groupValue: selectedAvailability,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedAvailability = value!;
                                });
                              },
                            ),
                            const Text('Online'),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    // Specific Date or Range
                    const Row(
                      children: [
                        Icon(Icons.date_range, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Specific Date or Range',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () async {
                        DateTime? pickedDate = await showDatePicker(
                          context: context,
                          initialDate: selectedDate,
                          firstDate: DateTime(2000),
                          lastDate: DateTime(2101),
                        );
                        if (pickedDate != null && pickedDate != selectedDate) {
                          setState(() {
                            selectedDate = pickedDate;
                          });
                        }
                      },
                      child: const Text('Select Date'),
                    ),
                    const SizedBox(height: 20),
                    // Areas of Interest
                    const Row(
                      children: [
                        Icon(Icons.location_on, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Areas of Interest',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    DropdownButton<String>(
                      isExpanded: true,
                      hint: const Text('Select Language'),
                      items: <String>['English', 'Spanish', 'French', 'German']
                          .map((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        // Handle language selection
                      },
                    ),
                    const SizedBox(height: 20),
                    // Duration
                    const Row(
                      children: [
                        Icon(Icons.timer, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Duration',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Row(
                          children: [
                            Radio<String>(
                              value: 'All',
                              groupValue: selectedDuration,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedDuration = value!;
                                });
                              },
                            ),
                            const Text('All'),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<String>(
                              value: '30 min',
                              groupValue: selectedDuration,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedDuration = value!;
                                });
                              },
                            ),
                            const Text('30 min'),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<String>(
                              value: '60 min',
                              groupValue: selectedDuration,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedDuration = value!;
                                });
                              },
                            ),
                            const Text('60 min'),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    // Gender
                    const Row(
                      children: [
                        Icon(Icons.person, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Therapist Gender',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Row(
                          children: [
                            Radio<String>(
                              value: 'Male',
                              groupValue: selectedGender,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedGender = value!;
                                });
                              },
                            ),
                            const Text('Male'),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<String>(
                              value: 'Female',
                              groupValue: selectedGender,
                              onChanged: (String? value) {
                                setState(() {
                                  selectedGender = value!;
                                });
                              },
                            ),
                            const Text('Female'),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    // Rating
                    const Row(
                      children: [
                        Icon(Icons.star, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Rating',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: List.generate(5, (index) {
                        return IconButton(
                          icon: Icon(
                            index < selectedRating
                                ? Icons.star
                                : Icons.star_border,
                            color: index < selectedRating
                                ? Colors.amber
                                : Colors.grey,
                          ),
                          onPressed: () {
                            setState(() {
                              selectedRating = index + 1;
                            });
                          },
                        );
                      }),
                    ),
                    const SizedBox(height: 20),
                    // Country and City
                    const Row(
                      children: [
                        Icon(Icons.public, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Country and City',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    DropdownButton<String>(
                      isExpanded: true,
                      value: selectedCountry,
                      items: <String>['USA', 'Canada', 'UK', 'Australia']
                          .map((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedCountry = newValue!;
                        });
                      },
                    ),
                    const SizedBox(height: 10),
                    DropdownButton<String>(
                      isExpanded: true,
                      value: selectedCity,
                      items: <String>['New York', 'Toronto', 'London', 'Sydney']
                          .map((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedCity = newValue!;
                        });
                      },
                    ),
                    const SizedBox(height: 20),
                    // Salary Range
                    const Row(
                      children: [
                        Icon(Icons.attach_money, color: mainBlueColor),
                        SizedBox(width: 10),
                        Text(
                          'Salary Range',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Slider(
                      value: selectedSalaryRange,
                      min: 50,
                      max: 500,
                      divisions: 9,
                      label: '\$${selectedSalaryRange.round()}',
                      onChanged: (double value) {
                        setState(() {
                          selectedSalaryRange = value;
                        });
                      },
                    ),
                    const SizedBox(height: 20),
                    // Apply Filter Button
                    Center(
                      child: ElevatedButton(
                        onPressed: () {
                          // Apply filter logic
                          Navigator.pop(context);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: primaryColor,
                        ),
                        child: const Text(
                          'Apply Filter',
                          style: TextStyle(color: secoundryColor),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
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
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.white,
                hintText: 'Therapist name or title',
                hintStyle: const TextStyle(color: Colors.grey),
                prefixIcon: const Icon(Icons.search, color: primaryColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: const BorderSide(color: Colors.grey),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: const BorderSide(color: Colors.grey),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: const BorderSide(color: primaryColor),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  vertical: 0,
                  horizontal: 16,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SizedBox(
                  width: 150,
                  child: ElevatedButton.icon(
                    onPressed: () => _showFilterDialog(context),
                    label: const Text('Filter',
                        style: TextStyle(color: Colors.white)),
                    icon: const Icon(Icons.filter_alt, color: Colors.white),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: primaryColor,
                      shape: const StadiumBorder(),
                    ),
                  ),
                ),
                DropdownButtonHideUnderline(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 30),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20.0),
                      border: Border.all(color: Colors.grey),
                      color: Colors.white,
                    ),
                    child: DropdownButton<String>(
                      value: 'Sort by',
                      icon: const Icon(Icons.arrow_drop_down,
                          color: primaryColor),
                      items: <String>['Sort by', 'Name', 'Experience', 'Rating']
                          .map((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value,
                              style: const TextStyle(color: Colors.black)),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {},
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: doctors.length,
              itemBuilder: (context, index) {
                final doctor = doctors[index];
                return Card(
                  color: secoundryColor,
                  margin: const EdgeInsets.all(10),
                  elevation: 10,
                  child: Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: Column(
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            CircleAvatar(
                              radius: 30,
                              backgroundImage: AssetImage(doctor.imagePath),
                            ),
                            const SizedBox(width: 10),
                            Column(
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
                            ),
                            const Spacer(),
                            Column(
                              children: [
                                if (doctor.isTopTherapist)
                                  const Icon(Icons.star, color: Colors.amber),
                                const Text(
                                  'Top Therapist',
                                  style: TextStyle(color: mainBlueColor),
                                ),
                                Text('${doctor.sessions} Sessions',
                                    style:
                                        const TextStyle(color: mainBlueColor)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(doctor.multiSpecialization),
                                const SizedBox(height: 5),
                                Row(
                                  children: [
                                    const Icon(
                                      Icons.access_time,
                                      size: 16,
                                      color: mainBlueColor,
                                    ),
                                    const SizedBox(width: 5),
                                    Text(doctor.nextAppointment,
                                        style: const TextStyle(
                                            color: mainBlueColor)),
                                  ],
                                ),
                                const SizedBox(height: 5),
                                Row(
                                  children: [
                                    const Icon(
                                      Icons.attach_money,
                                      size: 16,
                                      color: mainBlueColor,
                                    ),
                                    const SizedBox(width: 5),
                                    Text('Salary: ${doctor.salary}',
                                        style: const TextStyle(
                                            color: mainBlueColor)),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            ElevatedButton(
                              onPressed: () {
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
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: primaryColor,
                                shape: const StadiumBorder(),
                              ),
                              child: const Text('View Profile',
                                  style: TextStyle(color: secoundryColor)),
                            ),
                            ElevatedButton(
                              onPressed: () {},
                              style: ElevatedButton.styleFrom(
                                backgroundColor: primaryColor,
                                shape: const StadiumBorder(),
                              ),
                              child: const Text(
                                'Book Now',
                                style: TextStyle(color: secoundryColor),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
