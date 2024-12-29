import 'package:flutter/material.dart';
import 'package:flutter_email_sender/flutter_email_sender.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SendToGmail extends StatefulWidget {
  const SendToGmail({super.key});
  @override
  _SendToGmailState createState() => _SendToGmailState();
}

class _SendToGmailState extends State<SendToGmail> {
  final TextEditingController _subjectController = TextEditingController();
  final TextEditingController _bodyController = TextEditingController();

  // This function sends the email
  Future<void> sendEmail() async {
    final Email email = Email(
      body: _bodyController.text,
      subject: _subjectController.text,
      recipients: ['graduation.team2025@gmail.com'], //gmail to send me
      isHTML: false, // Set to true if you are sending HTML formatted emails
    );

    try {
      await FlutterEmailSender.send(email);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Email Sent Successfully!')),
      );
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to send email: $error')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    const outlineInputBorder = OutlineInputBorder(
      borderRadius: BorderRadius.all(
        Radius.circular(12.5),
      ),
      borderSide: BorderSide(
        color: primaryColor,
        width: 2,
      ),
    );
    return Scaffold(
      appBar: AppBar(
        title: const Text('Send massage to gmail'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _subjectController,
              decoration: const InputDecoration(
                border: outlineInputBorder,
                focusedBorder: outlineInputBorder,
                labelText: 'Subject',
                labelStyle: TextStyle(color: textMainColor),
              ),
            ),
            SizedBox(
              height: 10.h,
            ),
            TextField(
              controller: _bodyController,
              decoration: const InputDecoration(
                labelText: 'Email Body',
                labelStyle: TextStyle(color: textMainColor),
                border: outlineInputBorder,
                focusedBorder: outlineInputBorder,
              ),
              maxLines: 8,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: sendEmail,
              child: const Text('Send Email'),
            ),
          ],
        ),
      ),
    );
  }
}
