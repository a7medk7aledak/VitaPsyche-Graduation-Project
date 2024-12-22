import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/screens/morescreen/send_to_gmail.dart';
import 'package:flutter_mindmed_project/widgets/custem_button_back.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ContactUs extends StatelessWidget {
  const ContactUs({super.key});
  static String id = 'contact us';

  final String _scrip =
      """ you can get touch with us below platforms. our team will reach out to you as soon as it would be possible""";
  Widget item(BuildContext _,
      {required String go, required String titles, required String subtitle}) {
    return GestureDetector(
      onTap: () => Navigator.of(_).pushNamed(go),
      child: Padding(
        padding: const EdgeInsets.only(top: 8, left: 12, bottom: 4).w,
        child: Row(
          children: [
            Icon(
              Icons.phone,
              size: 32.sp,
            ),
            SizedBox(
              width: 24.w,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  titles,
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 20.sp,
                  ),
                ),
                FittedBox(
                  child: Text(
                    subtitle,
                    style: const TextStyle(
                      color: Colors.black,
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  Widget _costomerSupport(BuildContext _) {
    return Padding(
      padding: const EdgeInsets.all(6.0).w,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(25),
        child: Container(
          color: const Color(0xffE4E7F1),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Contact',
                style: TextStyle(color: textMainColor, fontSize: 22.sp),
              ),
              item(_, go: '', titles: 'Phone', subtitle: '012345678911'),
              item(_,
                  go: SendToGmail.id,
                  titles: 'Gmail',
                  subtitle: 'graduation.team2025@gmail.com'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _socialMedia(BuildContext _) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(25.r),
      child: Container(
        color: const Color(0xffE4E7F1),
        child: Column(
          children: [
            Text(
              'Social Media',
              style: TextStyle(color: textMainColor, fontSize: 22.sp),
            ),
            item(_, go: '', titles: 'contact us', subtitle: '012345678911'),
            item(_, go: '', titles: 'contact us', subtitle: '012345678911'),
            item(_, go: '', titles: 'contact us', subtitle: '012345678911'),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: Padding(
        padding: EdgeInsets.only(left: 20.w, right: 20.w, bottom: 20.h),
        child: SafeArea(
          child: ClipRRect(
            borderRadius: BorderRadius.all(Radius.circular(25.r)),
            child: Scaffold(
              backgroundColor: secoundryColor,
              appBar: AppBar(
                leading: custemButtonBack(context),
                title: Text(
                  'Contact us',
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 26.sp,
                      fontWeight: FontWeight.bold),
                ),
              ),
              //! here
              body: Column(
                children: [
                  Text(
                    _scrip,
                    style: TextStyle(color: Colors.black, fontSize: 21.sp),
                  ),
                  _costomerSupport(context),
                  SizedBox(
                    height: 8.h,
                  ),
                  _socialMedia(context)
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
