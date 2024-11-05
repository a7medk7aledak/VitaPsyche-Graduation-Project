import 'package:flutter/material.dart';

import '../widgets/colors.dart'; // Assuming primaryColor is defined here

class Profile extends StatefulWidget {
  const Profile({super.key});
  static const id = 'Profile';

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  bool isUserInfoSelected = true; // To track which text is selected

  final List<Map<String, dynamic>> infoList = [
    {
      'label': 'Email',
      'icon': Icons.email,
      'data': 'example@email.com',
    },
    {
      'label': 'Phone',
      'icon': Icons.phone,
      'data': '+1234567890',
    },
    {
      'label': 'Gender',
      'icon': Icons.male_outlined,
      'data': 'Male',
    },
    {
      'label': 'Birthday',
      'icon': Icons.cake,
      'data': '01/01/1990',
    },
    {
      'label': 'Password',
      'icon': Icons.lock,
      'data': '********',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Stack(children: [
          Column(
            children: [
              Container(
                height: 300,
                width: double.infinity,
                decoration: const BoxDecoration(
                  color: primaryColor,
                  borderRadius:
                      BorderRadius.only(bottomRight: Radius.circular(200)),
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          GestureDetector(
                            onTap: () {
                              setState(() {
                                isUserInfoSelected = true;
                              });
                            },
                            child: Column(
                              children: [
                                Text(
                                  'User Information',
                                  style: TextStyle(
                                    color: isUserInfoSelected
                                        ? const Color.fromARGB(255, 1, 255, 1)
                                        : secoundryColor,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                if (isUserInfoSelected)
                                  Container(
                                    margin: const EdgeInsets.only(top: 4),
                                    height: 2,
                                    width: 150,
                                    color: const Color.fromARGB(255, 1, 255, 1),
                                  ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 30),
                          GestureDetector(
                            onTap: () {
                              setState(() {
                                isUserInfoSelected = false;
                              });
                            },
                            child: Column(
                              children: [
                                Text(
                                  'Payment Information',
                                  style: TextStyle(
                                    color: !isUserInfoSelected
                                        ? const Color.fromARGB(255, 1, 255, 1)
                                        : secoundryColor,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                if (!isUserInfoSelected)
                                  Container(
                                    margin: const EdgeInsets.only(top: 4),
                                    height: 2,
                                    width: 180,
                                    color: const Color.fromARGB(255, 1, 255, 1),
                                  ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),
                    // CircleAvatar for the user photo with + icon
                    Padding(
                        padding: const EdgeInsets.only(left: 20, top: 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Column(
                              children: [
                                Stack(
                                  alignment: AlignmentDirectional.bottomStart,
                                  children: [
                                    CircleAvatar(
                                      radius: 80, // Size of the avatar
                                      backgroundImage: AssetImage(
                                          'assets/images/User_fill@3x.png'), // Placeholder image
                                      backgroundColor:
                                          secoundryColor, // Background color
                                    ),
                                    Positioned(
                                      bottom: 0,
                                      right: 0,
                                      child: GestureDetector(
                                        onTap: () {
                                          // TODO: Add functionality to pick image from device
                                        },
                                        child: Container(
                                          height: 30,
                                          width: 30,
                                          decoration: BoxDecoration(
                                            color:
                                                primaryColor, // Background color of the + icon
                                            shape: BoxShape.circle,
                                            border: Border.all(
                                                color: secoundryColor,
                                                width: 2), // White border
                                          ),
                                          child: const Icon(
                                            Icons.add, // + icon
                                            color: secoundryColor,
                                            size: 20,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 10),
                                Text(
                                  'Add Photo',
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: secoundryColor,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(
                                width:
                                    20), // Space between avatar and user info
                            Padding(
                              padding: EdgeInsets.only(bottom: 50),
                              child: Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons
                                              .person, // Icon next to user name
                                          color: secoundryColor,
                                        ),
                                        const SizedBox(width: 5),
                                        Text(
                                          'User Name', // User name text
                                          style: TextStyle(
                                            fontSize: 18,
                                            fontWeight: FontWeight.bold,
                                            color: secoundryColor,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 10),
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.email, // Email icon
                                          color: secoundryColor,
                                        ),
                                        const SizedBox(width: 5),
                                        Text(
                                          'user@example.com', // User email text
                                          style: TextStyle(
                                            fontSize: 14,
                                            color: secoundryColor,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 10),
                                    Container(
                                      height: 35,
                                      decoration: BoxDecoration(
                                        color:
                                            primaryColor, // Background color of the button
                                        borderRadius: BorderRadius.circular(8),
                                        border: Border.all(
                                          color: Colors
                                              .white, // White border color
                                          width: 2, // Border width
                                        ),
                                      ),
                                      child: TextButton(
                                        onPressed: () {
                                          // TODO: Add functionality to edit profile
                                        },
                                        child: Text(
                                          'Edit Info',
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: secoundryColor,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        )),
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Text(
                'My Profile',
                style: TextStyle(
                    fontSize: 30,
                    color: primaryColor,
                    fontWeight: FontWeight.bold),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: infoList.map((info) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          info['label'],
                          style: TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        Container(
                          padding: EdgeInsets.all(16),
                          margin: EdgeInsets.only(bottom: 16),
                          decoration: BoxDecoration(
                            color: primaryColor,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                info['data'],
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                ),
                              ),
                              Icon(
                                info['icon'],
                                color: Colors.white,
                              ),
                            ],
                          ),
                        ),
                      ],
                    );
                  }).toList(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        // Handle change password logic
                      },
                      style: ElevatedButton.styleFrom(
                        side: const BorderSide(
                            color: primaryColor, width: 2), // Border only
                        backgroundColor: Colors.white, // Transparent background
                        foregroundColor: primaryColor, // Icon and text color
                        elevation: 0, // No shadow
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(
                            Icons.lock_outline,
                            color: primaryColor,
                          ),
                          SizedBox(width: 8.0),
                          Text('Change Password',
                              style: TextStyle(
                                  color: primaryColor,
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    SizedBox(width: 25),
                    ElevatedButton(
                      onPressed: () {
                        // Handle sign out logic
                      },
                      style: ElevatedButton.styleFrom(
                        side: const BorderSide(
                            color: Colors.red, width: 2), // Border only
                        backgroundColor: Colors.white, // Transparent background
                        foregroundColor: Colors.red, // Icon and text color
                        elevation: 0, // No shadow
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.logout),
                          SizedBox(width: 8.0),
                          Text('Sign Out',
                              style: TextStyle(
                                  color: Colors.red,
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(top: 250),
            child: Align(
              alignment: Alignment.bottomRight,
              child: Image.asset(
                'assets/animation/Animation - 1726516753981.gif',
                width: 100,
                height: 100,
                fit: BoxFit.contain,
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
