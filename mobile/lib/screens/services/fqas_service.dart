import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/const/const_image.dart';
import 'package:flutter_mindmed_project/models/model_fqas.dart';
import 'package:flutter_mindmed_project/widgets/custem_button_back.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class FqasService extends StatefulWidget {
  const FqasService({super.key});
  static String id = 'fqasService....';

  @override
  State<FqasService> createState() => _FqasServiceState();
}

class _FqasServiceState extends State<FqasService> {
  Widget _bottonCard({double? elevation}) {
    return Container(
      height: 32.h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25.r),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [secoundryColor, primaryColor],
        ),
      ),
      child: Card(
        color: Colors.transparent,
        elevation: elevation ?? 0,
        margin: const EdgeInsets.all(4),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(25.r)),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.person_4_outlined,
              size: 32.sp,
              color: primaryColor,
            ),
            Text(
              'Ask Doctor',
              style: TextStyle(color: textMainColor, fontSize: 18.sp),
            ),
          ],
        ),
      ),
    );
  }

  Widget _listItem({required String dataAsk, required String answer}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0, horizontal: 10.0).w,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [secoundryColor, primaryColor],
          ),
          borderRadius: BorderRadius.circular(25.r),
        ),
        child: Theme(
          data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
          child: ExpansionTile(
            maintainState: true,
            collapsedIconColor: secoundryColor,
            iconColor: secoundryColor,
            childrenPadding: const EdgeInsets.symmetric(horizontal: 10).w,
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  dataAsk,
                  softWrap: true,
                  style: TextStyle(
                    color: textMainColor,
                    fontSize: 18.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Divider(
                  color: textMainColor,
                  thickness: 2,
                  height: 0.h,
                ),
              ],
            ),
            expandedAlignment: Alignment.topLeft,
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 5000),
                curve: Curves.easeInQuad,
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10.0, vertical: 3)
                          .w,
                  child: Text(
                    answer,
                    softWrap: true,
                    style: TextStyle(
                      color: textMainColor,
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<Fqas> _loadFqasData() async {
    try {
      print("Attempting to load FAQ data...");

      //* Load the string from the asset file
      String jsonString = await rootBundle.loadString('assets/json/FAQs.json');

      print("JSON string loaded: $jsonString");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON: $jsonData");

      return Fqas.fromJson(jsonData); // Pass the decoded map directly
    } catch (e) {
      print("Error occurred while loading or decoding JSON: $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      appBar: AppBar(
        leading: custemButtonBack(context),
        elevation: 4,
        titleSpacing: 0,
        backgroundColor: Colors.transparent,
        title: Row(
          children: [
            Image.asset(
              logoApp,
              height: 40.h,
              width: 50.w,
              fit: BoxFit.cover,
            ),
            Text(
              'MindMed',
              style: TextStyle(
                color: textMainColor,
                fontSize: 21.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
      body: FutureBuilder<Fqas>(
        future: _loadFqasData(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
                child: Text('Error Loading data...${snapshot.error}'));
          } else if (snapshot.hasData && snapshot.data != null) {
            var fqasdata = snapshot.data!;
            return CustomScrollView(
              slivers: <Widget>[
                SliverToBoxAdapter(
                  child: Column(
                    children: [
                      ClipRRect(
                        borderRadius:
                            BorderRadius.only(topRight: Radius.circular(150.r)),
                        child: Image.asset(
                          ConstImage.fqas,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ],
                  ),
                ),
                SliverFillRemaining(
                  child: Container(
                    color: secoundryColor,
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            SizedBox(height: 10.h),
                            Text(
                              'More Questions',
                              style: TextStyle(
                                color: textMainColor,
                                fontSize: 24.sp,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            _bottonCard(),
                          ],
                        ),
                        SizedBox(height: 10.h),
                        Expanded(
                          child: ListView.separated(
                            separatorBuilder: (context, index) =>
                                SizedBox(height: 5.h),
                            itemCount: fqasdata.fqas.length,
                            itemBuilder: (context, index) {
                              return _listItem(
                                dataAsk:
                                    '${index + 1}) ${fqasdata.fqas[index].question}',
                                answer: fqasdata.fqas[index].answer,
                              );
                            },
                          ),
                        ),
                        Container(
                          color: secoundryColor,
                          height: 10.h,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          } else {
            return const Center(child: Text('NO data here'));
          }
        },
      ),
    );
  }
}
