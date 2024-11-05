import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/services/do_test.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../const/colors.dart';
import '../../const/const_image.dart';
import '../../widgets/custem_button_back.dart';

class TestService extends StatelessWidget {
  const TestService({super.key});
  static String id = 'test';
  final String _data = '''
These critical tests help to understand the personality of the person better, as they give an idea about the personality and some indications of the current psychological state. But you should know an expert after getting the results because the tests are not a substitute for him
''';

  Widget _testCard(BuildContext _, {required String title}) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.5),
          border: Border.all(
            width: 2,
            color: Colors.black,
          )),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Row(
              children: [
                Image.asset(ConstImage.sadIdea),
                SizedBox(
                  width: 10.w,
                ),
                Text(
                  title, //!data from json title
                  style: const TextStyle(
                    color: textMainColor,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                )
              ],
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 12).w,
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: button2Color,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12.5),
                      ),
                    ),
                    onPressed: () {
                      Navigator.pushNamed(_, DoTest.id);
                    },
                    child: const Text(
                      'Take the test',
                      style: TextStyle(color: secoundryColor, fontSize: 20),
                    )),
              ),
            )
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: primaryColor,
        title: Row(
          children: [
            Image.asset(
              logoApp,
              height: 60.h,
              width: 50.w,
              fit: BoxFit.cover,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 4).w,
              child: Text(
                'Tests',
                style: TextStyle(
                  color: secoundryColor,
                  fontSize: 26.sp,
                ),
              ),
            )
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            children: [
              Text(
                _data,
                softWrap: true,
                style: const TextStyle(
                    color: textThirdColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 14),
              ),
              const Row(
                children: [
                  Icon(Icons.done_outline_outlined),
                  SizedBox(
                    width: 10,
                  ),
                  Text(
                    'All test are Documented',
                    style: TextStyle(
                        color: textThirdColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 14),
                  )
                ],
              ),
              SizedBox(
                height: 12.h,
              ),
              //*here
              ListView.separated(
                separatorBuilder: (context, index) => SizedBox(
                  height: 6.h,
                ),
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (context, index) =>
                    _testCard(context, title: 'mohamed'),
                itemCount: 6,
              )
            ],
          ),
        ),
      ),
    );
  }
}
