// daily_challenge_screen.dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'daily_challenge.dart';

class DailyChallengeScreen extends StatefulWidget {
  @override
  _DailyChallengeScreenState createState() => _DailyChallengeScreenState();
}

class _DailyChallengeScreenState extends State<DailyChallengeScreen> {
  late DailyChallenge currentChallenge;
  final TextEditingController _responseController = TextEditingController();
  bool showReward = false;

  final List<DailyChallenge> challenges = [
    DailyChallenge(
      title: "تحدي التنفس العميق",
      description:
          "خذ 3 دقائق للتركيز على تنفسك. استنشق ببطء لعدّ 4، واحتفظ بالنفس لعدّ 4، ثم أخرجه لعدّ 6.",
      reward: "\"التنفس العميق هو مرساة للهدوء النفسي.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي كتابة المشاعر",
      description: "اكتب في دفتر مذكراتك مشاعرك الحالية دون أي تصحيح أو حكم.",
      reward: "\"عندما تكتب، تمنح مشاعرك المساحة للتعبير.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي الراحة النفسية",
      description:
          "خصص 15 دقيقة لفعل شيء يُشعرك بالراحة (مثل قراءة كتاب، سماع موسيقى هادئة، أو الرسم).",
      reward: "\"الراحة النفسية ليست ترفًا، بل ضرورة.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي الامتنان المتخصص",
      description:
          "فكر في ثلاثة أشياء تشعر بالامتنان تجاهها اليوم، وركز على مشاعرك أثناء الكتابة.",
      reward: "\"الامتنان يُغيّر طريقة نظرتك للعالم.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي مواجهة الأفكار السلبية",
      description:
          "اختر فكرة سلبية واحدة تراودك عادة واكتب 3 أدلة تُثبت أنها غير صحيحة.",
      reward: "\"عندما تتحدى الأفكار السلبية، تُعيد صياغة واقعك.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي التأمل الذاتي",
      description:
          "اسأل نفسك: \"ما الذي أحتاجه اليوم لأكون سعيدًا؟\" ودوّن إجابتك.",
      reward: "\"التأمل في النفس يفتح الأبواب للوعي الذاتي.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي قوة الكلمة",
      description:
          "اختر كلمة إيجابية واحدة (مثل: أمل، سلام) ورددها بصوت عالٍ أو داخليًا طوال اليوم.",
      reward: "\"الكلمات الإيجابية تُزرع في العقل وتُثمر طاقة إيجابية.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي الحاضر",
      description:
          "ركز على شيء تفعله الآن، مثل تناول الطعام أو المشي، دون تشتيت.",
      reward: "\"العيش في الحاضر هو مفتاح السعادة.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي التواصل العاطفي",
      description: "تحدث مع صديق أو فرد من العائلة عن يومك ومشاعرك بصدق.",
      reward: "\"التواصل يُقوّي الروابط ويخفف العبء.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي التعاطف مع الذات",
      description:
          "اختر خطأً قمت به مؤخرًا، وبدلاً من لوم نفسك، حاول فهم السبب وراءه وتقبل الخطأ كجزء من التعلّم.",
      reward: "\"التعاطف مع الذات هو بداية الشفاء الداخلي.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي التمارين البسيطة",
      description:
          "قم بتمارين تمدد خفيفة لمدة 5 دقائق وأشعر بجسدك يتنفس وينتعش.",
      reward: "\"الحركة تُحرّر الطاقة السلبية.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي الضحك",
      description: "شاهد فيديو مضحك أو تذكر موقفًا أضحكك كثيرًا.",
      reward: "\"الضحك علاج مجاني للقلب والروح.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي كتابة الإيجابيات",
      description: "اكتب 5 صفات أو مهارات جيدة تمتلكها وتفتخر بها.",
      reward: "\"تقدير الذات خطوة نحو تحسين الصحة النفسية.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي التخلص من القلق",
      description:
          "اكتب قائمة بأشياء تقلقك، ثم قسّمها إلى ما يمكنك التحكم به وما لا يمكنك تغييره.",
      reward: "\"التمييز بين ما يمكن تغييره وما لا يمكن يقلل التوتر.\"",
      date: DateTime.now(),
    ),
    DailyChallenge(
      title: "تحدي النوم الجيد",
      description:
          "تجنب استخدام الأجهزة الإلكترونية قبل النوم بساعة واحدة لضمان نوم عميق.",
      reward: "\"النوم الجيد يغذي العقل والجسد.\"",
      date: DateTime.now(),
    ),
  ];

  @override
  void initState() {
    super.initState();
    _loadCurrentChallenge();
  }

  Future<void> _loadCurrentChallenge() async {
    final prefs = await SharedPreferences.getInstance();
    final savedChallengeJson = prefs.getString('currentChallenge');

    if (savedChallengeJson != null) {
      final savedChallenge =
          DailyChallenge.fromJson(json.decode(savedChallengeJson));
      if (savedChallenge.date.day == DateTime.now().day) {
        setState(() {
          currentChallenge = savedChallenge;
        });
        return;
      }
    }

    // إذا لم يكن هناك تحدي لليوم، اختر تحدياً عشوائياً جديداً
    currentChallenge = challenges[DateTime.now().day % challenges.length];
    _saveCurrentChallenge();
  }

  Future<void> _saveCurrentChallenge() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        'currentChallenge', json.encode(currentChallenge.toJson()));
  }

  void _completeChallenge() {
    if (_responseController.text.isNotEmpty) {
      setState(() {
        currentChallenge = DailyChallenge(
          title: currentChallenge.title,
          description: currentChallenge.description,
          reward: currentChallenge.reward,
          isCompleted: true,
          date: currentChallenge.date,
        );
        showReward = true;
      });
      _saveCurrentChallenge();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('تحدي اليوم'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              elevation: 4,
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      currentChallenge.title,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      currentChallenge.description,
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 20),
            if (!currentChallenge.isCompleted) ...[
              TextField(
                controller: _responseController,
                maxLines: 3,
                decoration: InputDecoration(
                  labelText: 'اكتب استجابتك هنا',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _completeChallenge,
                child: Padding(
                  padding: EdgeInsets.all(12),
                  child: Text(
                    'إكمال التحدي',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
              ),
            ],
            if (showReward) ...[
              SizedBox(height: 20),
              Card(
                color: Theme.of(context).primaryColor.withOpacity(0.1),
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Icon(
                        Icons.star,
                        size: 48,
                        color: Colors.amber,
                      ),
                      SizedBox(height: 8),
                      Text(
                        'مكافأتك',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        currentChallenge.reward,
                        style: TextStyle(fontSize: 16),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _responseController.dispose();
    super.dispose();
  }
}
