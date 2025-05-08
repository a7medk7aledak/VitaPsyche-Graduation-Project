export const tests = [
  {
    testId: "rses-001", // Added unique ID
    testTitle: "مقياس روزنبرغ لتقدير الذات",
    generalTitle: "مقياس روزنبرغ لتقدير الذات",
    testSlug: "rosenberg-self-esteem-scale-(rses)",
    questions: [
    
      {
        questionId: 1,
        questionText: "بشكل عام، أنا راضٍ عن نفسي",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 0 },
          { optionId: 2, optionText: "لا أوافق", score: 1 },
          { optionId: 3, optionText: "أوافق", score: 2 },
          { optionId: 4, optionText: "أوافق بشدة", score: 3 },
        ],
      },
      {
        questionId: 2,
        questionText: "في بعض الأحيان، أعتقد أنني لا أصلح لشيء على الإطلاق",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 3 },
          { optionId: 2, optionText: "لا أوافق", score: 2 },
          { optionId: 3, optionText: "أوافق", score: 1 },
          { optionId: 4, optionText: "أوافق بشدة", score: 0 },
        ],
      },
      {
        questionId: 3,
        questionText: "أشعر أن لدي عدداً من الصفات الجيدة",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 0 },
          { optionId: 2, optionText: "لا أوافق", score: 1 },
          { optionId: 3, optionText: "أوافق", score: 2 },
          { optionId: 4, optionText: "أوافق بشدة", score: 3 },
        ],
      },
      {
        questionId: 4,
        questionText: "أنا قادر على القيام بالأشياء مثل معظم الناس الآخرين",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 0 },
          { optionId: 2, optionText: "لا أوافق", score: 1 },
          { optionId: 3, optionText: "أوافق", score: 2 },
          { optionId: 4, optionText: "أوافق بشدة", score: 3 },
        ],
      },
      {
        questionId: 5,
        questionText: "أشعر أنه ليس لدي الكثير لأفتخر به",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 3 },
          { optionId: 2, optionText: "لا أوافق", score: 2 },
          { optionId: 3, optionText: "أوافق", score: 1 },
          { optionId: 4, optionText: "أوافق بشدة", score: 0 },
        ],
      },
      {
        questionId: 6,
        questionText: "أشعر بأنني عديم الفائدة في بعض الأحيان",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 3 },
          { optionId: 2, optionText: "لا أوافق", score: 2 },
          { optionId: 3, optionText: "أوافق", score: 1 },
          { optionId: 4, optionText: "أوافق بشدة", score: 0 },
        ],
      },
      {
        questionId: 7,
        questionText:
          "أشعر أنني شخص ذو قيمة، على الأقل على قدم المساواة مع الآخرين",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 0 },
          { optionId: 2, optionText: "لا أوافق", score: 1 },
          { optionId: 3, optionText: "أوافق", score: 2 },
          { optionId: 4, optionText: "أوافق بشدة", score: 3 },
        ],
      },
      {
        questionId: 8,
        questionText: "أتمنى لو كان لدي المزيد من الاحترام لنفسي",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 3 },
          { optionId: 2, optionText: "لا أوافق", score: 2 },
          { optionId: 3, optionText: "أوافق", score: 1 },
          { optionId: 4, optionText: "أوافق بشدة", score: 0 },
        ],
      },
      {
        questionId: 9,
        questionText: "بشكل عام، أميل إلى الشعور بأنني فاشل",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 3 },
          { optionId: 2, optionText: "لا أوافق", score: 2 },
          { optionId: 3, optionText: "أوافق", score: 1 },
          { optionId: 4, optionText: "أوافق بشدة", score: 0 },
        ],
      },
      {
        questionId: 10,
        questionText: "أتخذ موقفاً إيجابياً تجاه نفسي",
        options: [
          { optionId: 1, optionText: "لا أوافق بشدة", score: 0 },
          { optionId: 2, optionText: "لا أوافق", score: 1 },
          { optionId: 3, optionText: "أوافق", score: 2 },
          { optionId: 4, optionText: "أوافق بشدة", score: 3 },
        ],
      },
    ],
    scoring: {
      instruction:
        "قم بجمع الدرجات لجميع الأسئلة العشرة. الأسئلة 2 و5 و6 و8 و9 يتم احتسابها بشكل عكسي.",
      scoreRanges: [
        {
          range: "0-10",
          description: "تقدير ذات منخفض",
          color: "bg-red-600",
          info: "يشير إلى مخاوف كبيرة تتعلق بتقدير الذات قد تتطلب دعماً مهنياً.",
        },
        {
          range: "11-20",
          description: "تقدير ذات متوسط",
          color: "bg-yellow-500",
          info: "يظهر مستويات متوسطة من تقدير الذات مع وجود مجال للتحسين.",
        },
        {
          range: "21-30",
          description: "تقدير ذات مرتفع",
          color: "bg-green-600",
          info: "يدل على مستويات صحية من تقدير الذات ونظرة إيجابية للذات.",
        },
      ],
    },
  },

  {
    testId: "ybocs-001", // Added unique ID
    generalTitle: "مقياس الوسواس القهري",
    testTitle: "مقياس ييل-براون للوسواس القهري (Y-BOCS)",
    testSlug: "ocd-scale",
    questions: [
      {
        questionId: 1, // Added question IDs for consistency
        questionText: "مقدار الوقت المستغرق في الأفكار الوسواسية",
        options: [
          { optionId: 0, optionText: "لا شيء", score: 0 },
          {
            optionId: 1,
            optionText: "خفيف (أقل من ساعة في اليوم أو بشكل متقطع)",
            score: 1,
          },
          {
            optionId: 2,
            optionText: "متوسط (1-3 ساعات في اليوم أو بشكل متكرر)",
            score: 2,
          },
          {
            optionId: 3,
            optionText: "شديد (أكثر من 3 ساعات في اليوم أو بشكل متكرر جداً)",
            score: 3,
          },
          {
            optionId: 4,
            optionText:
              "شديد جداً (أكثر من 8 ساعات في اليوم أو بشكل مستمر تقريباً)",
            score: 4,
          },
        ],
      },
      {
        questionId: 2,
        questionText:
          "التدخل الناجم عن الأفكار الوسواسية في الأنشطة الاجتماعية أو العمل",
        options: [
          { optionId: 0, optionText: "لا شيء", score: 0 },
          {
            optionId: 1,
            optionText: "تدخل خفيف لكن يمكن التعامل معه بشكل عام",
            score: 1,
          },
          {
            optionId: 2,
            optionText: "تدخل متوسط، لا يزال يمكن التعامل معه",
            score: 2,
          },
          {
            optionId: 3,
            optionText: "تدخل شديد، يصعب التعامل معه",
            score: 3,
          },
          {
            optionId: 4,
            optionText: "تدخل شديد جداً، معيق بشدة",
            score: 4,
          },
        ],
      },
      {
        questionId: 3,
        questionText: "الضيق أو القلق الناجم عن الأفكار الوسواسية",
        options: [
          { optionId: 0, optionText: "لا شيء", score: 0 },
          { optionId: 1, optionText: "ضيق خفيف، متقطع", score: 1 },
          {
            optionId: 2,
            optionText: "ضيق متوسط، يمكن التعامل معه",
            score: 2,
          },
          {
            optionId: 3,
            optionText: "ضيق شديد، يصعب التعامل معه",
            score: 3,
          },
          { optionId: 4, optionText: "ضيق شديد جداً، معيق", score: 4 },
        ],
      },
      {
        questionId: 4,
        questionText: "الجهد المبذول لمقاومة الأفكار الوسواسية",
        options: [
          {
            optionId: 0,
            optionText: "مقاومة دائمة أو لا حاجة للمقاومة",
            score: 0,
          },
          { optionId: 1, optionText: "مقاومة في معظم الأحيان", score: 1 },
          { optionId: 2, optionText: "مقاومة في بعض الأحيان", score: 2 },
          {
            optionId: 3,
            optionText: "مقاومة نادرة، الاستسلام بعد تردد",
            score: 3,
          },
          { optionId: 4, optionText: "لا مقاومة، الاستسلام التام", score: 4 },
        ],
      },
      {
        questionId: 5,
        questionText: "السيطرة على الأفكار الوسواسية",
        options: [
          { optionId: 0, optionText: "سيطرة كاملة", score: 0 },
          {
            optionId: 1,
            optionText: "سيطرة جيدة، قادر عادة على صرفها",
            score: 1,
          },
          {
            optionId: 2,
            optionText: "سيطرة متوسطة، قادر أحياناً على صرفها",
            score: 2,
          },
          { optionId: 3, optionText: "سيطرة منخفضة، يصعب صرفها", score: 3 },
          {
            optionId: 4,
            optionText: "لا توجد سيطرة، يستحيل تقريباً صرفها",
            score: 4,
          },
        ],
      },
      {
        questionId: 6,
        questionText: "مقدار الوقت المستغرق في السلوكيات القهرية",
        options: [
          { optionId: 0, optionText: "لا شيء", score: 0 },
          {
            optionId: 1,
            optionText: "خفيف (أقل من ساعة في اليوم أو بشكل متقطع)",
            score: 1,
          },
          {
            optionId: 2,
            optionText: "متوسط (1-3 ساعات في اليوم أو بشكل متكرر)",
            score: 2,
          },
          {
            optionId: 3,
            optionText: "شديد (أكثر من 3 ساعات في اليوم أو بشكل متكرر جداً)",
            score: 3,
          },
          {
            optionId: 4,
            optionText:
              "شديد جداً (أكثر من 8 ساعات في اليوم أو بشكل مستمر تقريباً)",
            score: 4,
          },
        ],
      },
      {
        questionId: 7,
        questionText:
          "التدخل الناجم عن السلوكيات القهرية في الأنشطة الاجتماعية أو العمل",
        options: [
          { optionId: 0, optionText: "لا شيء", score: 0 },
          {
            optionId: 1,
            optionText: "تدخل خفيف لكن يمكن التعامل معه بشكل عام",
            score: 1,
          },
          {
            optionId: 2,
            optionText: "تدخل متوسط، لا يزال يمكن التعامل معه",
            score: 2,
          },
          {
            optionId: 3,
            optionText: "تدخل شديد، يصعب التعامل معه",
            score: 3,
          },
          {
            optionId: 4,
            optionText: "تدخل شديد جداً، معيق بشدة",
            score: 4,
          },
        ],
      },
      {
        questionId: 8,
        questionText: "الضيق أو القلق الناجم عن عدم تنفيذ السلوكيات القهرية",
        options: [
          { optionId: 0, optionText: "لا شيء", score: 0 },
          { optionId: 1, optionText: "ضيق خفيف، يمكن تحمله", score: 1 },
          {
            optionId: 2,
            optionText: "ضيق متوسط، صعب لكن يمكن تحمله",
            score: 2,
          },
          {
            optionId: 3,
            optionText: "ضيق شديد، يصعب تحمله",
            score: 3,
          },
          {
            optionId: 4,
            optionText: "ضيق شديد جداً، يستحيل تقريباً تحمله",
            score: 4,
          },
        ],
      },
      {
        questionId: 9,
        questionText: "الجهد المبذول لمقاومة السلوكيات القهرية",
        options: [
          {
            optionId: 0,
            optionText: "مقاومة دائمة أو لا حاجة للمقاومة",
            score: 0,
          },
          { optionId: 1, optionText: "مقاومة في معظم الأحيان", score: 1 },
          { optionId: 2, optionText: "مقاومة في بعض الأحيان", score: 2 },
          {
            optionId: 3,
            optionText: "مقاومة نادرة، الاستسلام بعد تردد",
            score: 3,
          },
          { optionId: 4, optionText: "لا مقاومة، الاستسلام التام", score: 4 },
        ],
      },

      {
        questionId: 10,
        questionText: "السيطرة على السلوكيات القهرية",
        options: [
          { optionId: 0, optionText: "سيطرة كاملة", score: 0 },
          {
            optionId: 1,
            optionText: "سيطرة جيدة، قادر عادة على التأجيل",
            score: 1,
          },
          {
            optionId: 2,
            optionText: "سيطرة متوسطة، قادر أحياناً على التأجيل",
            score: 2,
          },
          { optionId: 3, optionText: "سيطرة منخفضة، يصعب التأجيل", score: 3 },
          {
            optionId: 4,
            optionText: "لا توجد سيطرة، يستحيل تقريباً التأجيل",
            score: 4,
          },
        ],
      },
    ],
    scoring: {
      instruction:
        "قم بجمع الدرجات لجميع الأسئلة العشرة للحصول على الدرجة الإجمالية.",
      scoreRanges: [
        {
          range: "0-7",
          description: "وسواس قهري خفيف جداً",
          color: "bg-green-400",
          info: "ميول وسواسية قهرية عرضية وخفية لا تتدخل بشكل كبير في الحياة اليومية أو الأداء الوظيفي.",
        },
        {
          range: "8-15",
          description: "وسواس قهري خفيف",
          color: "bg-heading",
          info: "سلوكيات وسواسية قهرية ملحوظة قد تسبب اضطرابات طفيفة في الأنشطة اليومية، لكن لا تزال قابلة للإدارة.",
        },
        {
          range: "16-23",
          description: "وسواس قهري متوسط",
          color: "bg-yellow-400",
          info: "أعراض وسواسية قهرية تتدخل في الأداء اليومي وتسبب ضيقاً عاطفياً كبيراً.",
        },
        {
          range: "24-31",
          description: "وسواس قهري شديد",
          color: "bg-orange-400",
          info: "أعراض وسواسية قهرية مكثفة ومنتشرة تهيمن على الحياة اليومية وتسبب ضيقاً وضعفاً كبيرين.",
        },
        {
          range: "32-40",
          description: "وسواس قهري شديد جداً",
          color: "bg-red-500",
          info: "يتميز الوسواس القهري الشديد جداً بضيق شديد ومشاركة شبه مستمرة في السلوكيات القهرية، مما يضعف بشكل كبير جميع جوانب الحياة.",
        },
      ],
    },
  },

  {
    testId: "bdi-2025",
    generalTitle: "مقياس الاكتئاب",
    testTitle: "قائمة بيك للاكتئاب",
    testSlug: "depression-scale", // URL-friendly slug

    questions: [
      {
        questionId: 1,
        questionText: "لا أشعر بالحزن.",
        options: [
          { optionId: 1, optionText: "لا أشعر بالحزن.", score: 0 },
          { optionId: 2, optionText: "أشعر بالحزن.", score: 1 },
          {
            optionId: 3,
            optionText: "أشعر بالحزن طوال الوقت ولا أستطيع التخلص منه.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "أنا حزين أو تعيس لدرجة لا أستطيع تحملها.",
            score: 3,
          },
        ],
      },
      {
        questionId: 2,
        questionText: "لست متشائماً بشأن المستقبل.",
        options: [
          {
            optionId: 1,
            optionText: "لست متشائماً بشأن المستقبل.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أشعر بالتشاؤم حيال المستقبل.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "أشعر بأنه ليس لدي ما أتطلع إليه.",
            score: 2,
          },
          {
            optionId: 4,
            optionText:
              "أشعر أن المستقبل لا أمل فيه وأن الأمور لا يمكن أن تتحسن.",
            score: 3,
          },
        ],
      },
      {
        questionId: 3,
        questionText: "لا أشعر بأنني فاشل.",
        options: [
          {
            optionId: 1,
            optionText: "لا أشعر بأنني فاشل.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أشعر بأنني فشلت أكثر من الشخص العادي.",
            score: 1,
          },
          {
            optionId: 3,
            optionText:
              "عندما أنظر إلى حياتي الماضية، كل ما أراه هو الكثير من الفشل.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "أشعر بأنني فاشل تماماً كشخص.",
            score: 3,
          },
        ],
      },
      {
        questionId: 4,
        questionText: "أحصل على نفس القدر من المتعة من الأشياء كما اعتدت.",
        options: [
          {
            optionId: 1,
            optionText: "أحصل على نفس القدر من المتعة من الأشياء كما اعتدت.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "لا أستمتع بالأشياء كما اعتدت.",
            score: 1,
          },
          {
            optionId: 3,
            optionText:
              "أحصل على القليل جداً من المتعة من الأشياء التي كنت أستمتع بها.",
            score: 2,
          },
          {
            optionId: 4,
            optionText:
              "لا أستطيع الحصول على أي متعة من الأشياء التي كنت أستمتع بها.",
            score: 3,
          },
        ],
      },
      {
        questionId: 5,
        questionText: "لا أشعر بالذنب بشكل خاص.",
        options: [
          {
            optionId: 1,
            optionText: "لا أشعر بالذنب بشكل خاص.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أشعر بالذنب تجاه العديد من الأشياء.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "أشعر بالذنب معظم الوقت.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "أشعر بالذنب طوال الوقت.",
            score: 3,
          },
        ],
      },
      {
        questionId: 6,
        questionText: "لا أشعر بأنني أتعرض للعقاب.",
        options: [
          {
            optionId: 1,
            optionText: "لا أشعر بأنني أتعرض للعقاب.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أشعر بأنني قد أتعرض للعقاب.",
            score: 1,
          },
          { optionId: 3, optionText: "أتوقع أن أتعرض للعقاب.", score: 2 },
          { optionId: 4, optionText: "أشعر بأنني أتعرض للعقاب.", score: 3 },
        ],
      },
      {
        questionId: 7,
        questionText: "لست خائب الأمل في نفسي.",
        options: [
          {
            optionId: 1,
            optionText: "لست خائب الأمل في نفسي.",
            score: 0,
          },
          { optionId: 2, optionText: "أنا خائب الأمل في نفسي.", score: 1 },
          { optionId: 3, optionText: "أنا مشمئز من نفسي.", score: 2 },
          { optionId: 4, optionText: "أكره نفسي.", score: 3 },
        ],
      },
      {
        questionId: 8,
        questionText: "لا أشعر بأنني أسوأ من أي شخص آخر.",
        options: [
          {
            optionId: 1,
            optionText: "لا أشعر بأنني أسوأ من أي شخص آخر.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أنا ناقد لنفسي بسبب ضعفي أو أخطائي.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "ألوم نفسي طوال الوقت على عيوبي.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "ألوم نفسي على كل شيء سيء يحدث.",
            score: 3,
          },
        ],
      },
      {
        questionId: 9,
        questionText: "ليس لدي أي أفكار للانتحار.",
        options: [
          {
            optionId: 1,
            optionText: "ليس لدي أي أفكار للانتحار.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "لدي أفكار للانتحار ولكن لن أنفذها.",
            score: 1,
          },
          { optionId: 3, optionText: "أود أن أقتل نفسي.", score: 2 },
          {
            optionId: 4,
            optionText: "سأقتل نفسي إذا سنحت لي الفرصة.",
            score: 3,
          },
        ],
      },
      {
        questionId: 10,
        questionText: "لا أبكي أكثر من المعتاد.",
        options: [
          {
            optionId: 1,
            optionText: "لا أبكي أكثر من المعتاد.",
            score: 0,
          },
          { optionId: 2, optionText: "أبكي أكثر مما اعتدت.", score: 1 },
          { optionId: 3, optionText: "أبكي طوال الوقت الآن.", score: 2 },
          {
            optionId: 4,
            optionText:
              "كنت قادراً على البكاء، لكن الآن لا أستطيع البكاء حتى لو أردت ذلك.",
            score: 3,
          },
        ],
      },
      {
        questionId: 11,
        questionText: "لست أكثر انزعاجاً الآن مما كنت عليه من قبل.",
        options: [
          {
            optionId: 1,
            optionText: "لست أكثر انزعاجاً الآن مما كنت عليه من قبل.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أنا منزعج قليلاً أكثر من المعتاد.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "أنا منزعج أو مستاء كثيراً معظم الوقت.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "أشعر بالانزعاج طوال الوقت.",
            score: 3,
          },
        ],
      },
      {
        questionId: 12,
        questionText: "لم أفقد اهتمامي بالآخرين.",
        options: [
          {
            optionId: 1,
            optionText: "لم أفقد اهتمامي بالآخرين.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أنا أقل اهتماماً بالآخرين مما كنت عليه سابقاً.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "فقدت معظم اهتمامي بالآخرين.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "فقدت كل اهتمامي بالآخرين.",
            score: 3,
          },
        ],
      },
      {
        questionId: 13,
        questionText: "أتخذ القرارات بنفس الكفاءة التي كنت عليها دائماً.",
        options: [
          {
            optionId: 1,
            optionText: "أتخذ القرارات بنفس الكفاءة التي كنت عليها دائماً.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أؤجل اتخاذ القرارات أكثر مما اعتدت.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "لدي صعوبة أكبر في اتخاذ القرارات أكثر من ذي قبل.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "لا أستطيع اتخاذ القرارات على الإطلاق.",
            score: 3,
          },
        ],
      },
      {
        questionId: 14,
        questionText: "لا أشعر بأن مظهري أسوأ مما كان عليه من قبل.",
        options: [
          {
            optionId: 1,
            optionText: "لا أشعر بأن مظهري أسوأ مما كان عليه من قبل.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أنا قلق من أنني أبدو كبيراً في السن أو غير جذاب.",
            score: 1,
          },
          {
            optionId: 3,
            optionText:
              "أشعر أن هناك تغييرات دائمة في مظهري تجعلني أبدو غير جذاب.",
            score: 2,
          },
          { optionId: 4, optionText: "أعتقد أنني أبدو قبيحاً.", score: 3 },
        ],
      },
      {
        questionId: 15,
        questionText: "يمكنني العمل بنفس الكفاءة التي كنت عليها من قبل.",
        options: [
          {
            optionId: 1,
            optionText: "يمكنني العمل بنفس الكفاءة التي كنت عليها من قبل.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "يتطلب الأمر جهداً إضافياً للبدء في عمل شيء ما.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "علي أن أدفع نفسي بقوة للقيام بأي شيء.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "لا أستطيع القيام بأي عمل على الإطلاق.",
            score: 3,
          },
        ],
      },
      {
        questionId: 16,
        questionText: "يمكنني النوم جيداً كالمعتاد.",
        options: [
          {
            optionId: 1,
            optionText: "يمكنني النوم جيداً كالمعتاد.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "لا أنام جيداً كما اعتدت.",
            score: 1,
          },
          {
            optionId: 3,
            optionText:
              "أستيقظ قبل 1-2 ساعة من المعتاد وأجد صعوبة في العودة للنوم.",
            score: 2,
          },
          {
            optionId: 4,
            optionText:
              "أستيقظ قبل عدة ساعات من المعتاد ولا أستطيع العودة للنوم.",
            score: 3,
          },
        ],
      },
      {
        questionId: 17,
        questionText: "لا أشعر بالتعب أكثر من المعتاد.",
        options: [
          {
            optionId: 1,
            optionText: "لا أشعر بالتعب أكثر من المعتاد.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أتعب بسهولة أكثر مما اعتدت.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "أتعب من القيام بأي شيء تقريباً.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "أنا متعب جداً للقيام بأي شيء.",
            score: 3,
          },
        ],
      },
      {
        questionId: 18,
        questionText: "شهيتي ليست أسوأ من المعتاد.",
        options: [
          {
            optionId: 1,
            optionText: "شهيتي ليست أسوأ من المعتاد.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "شهيتي ليست جيدة كما كانت من قبل.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "شهيتي أسوأ بكثير الآن.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "ليس لدي شهية على الإطلاق.",
            score: 3,
          },
        ],
      },
      {
        questionId: 19,
        questionText: "لم أفقد الكثير من الوزن، إن وجد، مؤخراً.",
        options: [
          {
            optionId: 1,
            optionText: "لم أفقد الكثير من الوزن، إن وجد، مؤخراً.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "فقدت أكثر من خمسة أرطال.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "فقدت أكثر من عشرة أرطال.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "فقدت أكثر من خمسة عشر رطلاً.",
            score: 3,
          },
        ],
      },
      {
        questionId: 20,
        questionText: "لست أكثر قلقاً على صحتي من المعتاد.",
        options: [
          {
            optionId: 1,
            optionText: "لست أكثر قلقاً على صحتي من المعتاد.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أنا قلق بشأن الآلام أو المشاكل في المعدة أو الإمساك.",
            score: 1,
          },
          {
            optionId: 3,
            optionText:
              "أنا قلق جداً بشأن المشاكل الجسدية ومن الصعب التفكير في الكثير غيرها.",
            score: 2,
          },
          {
            optionId: 4,
            optionText:
              "أنا قلق جداً بشأن مشاكلي الجسدية لدرجة أنني لا أستطيع التفكير في أي شيء آخر.",
            score: 3,
          },
        ],
      },
      {
        questionId: 21,
        questionText: "لم ألاحظ أي تغيير حديث في اهتمامي بالجنس.",
        options: [
          {
            optionId: 1,
            optionText: "لم ألاحظ أي تغيير حديث في اهتمامي بالجنس.",
            score: 0,
          },
          {
            optionId: 2,
            optionText: "أنا أقل اهتماماً بالجنس مما كنت عليه.",
            score: 1,
          },
          {
            optionId: 3,
            optionText: "أنا أقل اهتماماً بكثير بالجنس الآن.",
            score: 2,
          },
          {
            optionId: 4,
            optionText: "فقدت الاهتمام بالجنس تماماً.",
            score: 3,
          },
        ],
      },
    ],
    scoring: {
      instruction:
        "قيّم كل عبارة على أساس التكرار (1=نادراً، 2=أحياناً، 3=غالباً، 4=دائماً). اجمع الدرجة الإجمالية لتقييم أعراض الاكتئاب.",
      scoreRanges: [
        {
          range: "0-9",
          description: "لا يوجد اكتئاب.",
          color: "bg-heading",
          info: "تشير هذه الحالة إلى غياب الأعراض السريرية المهمة للاكتئاب. يمكن للأفراد أن يعانوا من تقلبات عاطفية طبيعية ولكنهم عموماً قادرون على إدارة الأنشطة اليومية والحفاظ على علاقات صحية.",
        },
        {
          range: "10-16",
          description: "اكتئاب خفيف.",
          color: "bg-yellow-400",
          info: "شكل أقل حدة من الاكتئاب يتضمن بعض أعراض الحزن والتعب أو انخفاض الطاقة. بينما يمكن أن يؤثر على الأداء اليومي، فإنه لا يعجز الفرد عادة.",
        },
        {
          range: "17-29",
          description: "اكتئاب متوسط.",
          color: "bg-orange-500",
          info: "شكل أكثر وضوحاً من الاكتئاب مع أعراض تبدأ بالتداخل بشكل كبير مع الحياة اليومية، بما في ذلك العمل والعلاقات الاجتماعية والعناية بالنفس.",
        },
        {
          range: "30-63",
          description: "اكتئاب شديد.",
          color: "bg-red-500",
          info: "هذا شكل معيق من الاكتئاب حيث تكون الأعراض مكثفة ومنتشرة، مما يؤثر بشدة على جميع مجالات الحياة. قد يشعر الأفراد بعدم القدرة على العمل ويختبرون شعوراً باليأس.",
        },
      ],
    },
  },

  {
    testId: "ptsd-2025",
    generalTitle: "مقياس اضطراب ما بعد الصدمة",
    testTitle:
      "مقياس اضطراب ما بعد الصدمة وفقاً للدليل التشخيصي والإحصائي الرابع",
    testSlug: "ptsd-scale", // URL-friendly slug

    questions: [
      {
        questionId: 1,
        questionText: "هل واجهت صوراً أو أفكاراً أو ذكريات متكررة للصدمة؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 2,
        questionText: "هل تحلم بالصدمة أو تعاني من كوابيس؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 3,
        questionText: "هل تشعر أو تتصرف كما لو أن الحدث الصادم يحدث مرة أخرى؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 4,
        questionText: "هل تشعر بالانزعاج عندما يتم تذكيرك بالحدث الصادم؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 5,
        questionText:
          "هل تتجنب الأفكار أو المشاعر أو المحادثات المتعلقة بالصدمة؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 6,
        questionText:
          "هل تتجنب الأنشطة أو الأماكن أو الأشخاص الذين يذكرونك بالصدمة؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 7,
        questionText: "هل تجد صعوبة في تذكر أجزاء من الصدمة؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 8,
        questionText: "هل فقدت الاهتمام بالأنشطة التي كنت تستمتع بها سابقاً؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 9,
        questionText: "هل تشعر بالانفصال أو العزلة عن الآخرين؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 10,
        questionText: "هل تجد صعوبة في اختبار المشاعر الإيجابية؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 11,
        questionText: "هل تشعر كما لو أن أهدافك أو خططك المستقبلية لن تتحقق؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 12,
        questionText: "هل تجد صعوبة في النوم أو البقاء نائماً؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 13,
        questionText: "هل أنت سريع الانفعال أو لديك نوبات غضب؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 14,
        questionText: "هل تجد صعوبة في التركيز؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 15,
        questionText: "هل أنت متيقظ أو حذر بشكل مفرط، تشعر بأنك في حالة تأهب؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 16,
        questionText: "هل تفزع بسهولة عندما تتفاجأ؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
      {
        questionId: 17,
        questionText:
          "هل الأشياء والأشخاص السيئون يذكرونك بتجارب سابقة تجعلك تعاني من ضيق في التنفس أو ارتجاف أو تسارع في ضربات القلب؟",
        options: [
          { optionId: 1, optionText: "أبداً", score: 0 },
          { optionId: 2, optionText: "نادراً", score: 0 },
          { optionId: 3, optionText: "أحياناً", score: 0 },
          { optionId: 4, optionText: "غالباً", score: 1 },
          { optionId: 5, optionText: "دائماً", score: 1 },
        ],
      },
    ],
    scoring: {
      scoreRanges: [
        {
          range: "0-4",
          description: "أنت لا تعاني من اضطراب ما بعد الصدمة",
          color: "bg-green-400",
          info: "أنت لا تعاني من أي أعراض لاضطراب ما بعد الصدمة (PTSD).",
        },
        {
          range: "5-17",
          description: "أنت تعاني من اضطراب ما بعد الصدمة.",
          color: "bg-red-600",
          info: "أنت تعاني من أعراض متوافقة مع اضطراب ما بعد الصدمة (PTSD)، والتي تؤثر بشكل كبير على صحتك النفسية والعاطفية.",
        },
      ],
    },
  },

  {
    testId: "ias-2025",
    generalTitle: "مقياس إدمان الإنترنت",
    testTitle: "مقياس إدمان الإنترنت",
    testSlug: "internet-addiction-scale-arabic", // URL-friendly slug

    questions: [
      {
        questionId: 1,
        questionText:
          "كم مرة تجد نفسك تبقى متصلاً بالإنترنت لفترة أطول مما كنت تنوي؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 2,
        questionText:
          "كم مرة تهمل الأعمال المنزلية لتقضي وقتاً أطول على الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 3,
        questionText: "كم مرة تفضل إثارة الإنترنت على الحميمية مع شريك حياتك؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 4,
        questionText:
          "كم مرة تكوّن علاقات جديدة مع مستخدمين آخرين على الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 5,
        questionText:
          "كم مرة يشتكي الآخرون في حياتك من كمية الوقت الذي تقضيه على الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 6,
        questionText:
          "كم مرة يتأثر أداؤك الأكاديمي سلباً بسبب الوقت الذي تقضيه على الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 7,
        questionText:
          "كم مرة تتحقق من بريدك الإلكتروني قبل القيام بشيء آخر تحتاج إلى فعله؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 8,
        questionText:
          "كم مرة يتأثر أداؤك الوظيفي أو إنتاجيتك سلباً بسبب الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 9,
        questionText: "كم مرة تتجنب الآخرين لقضاء وقت أطول على الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 10,
        questionText:
          "كم مرة تحجب أفكاراً مزعجة عن حياتك بأفكار مريحة عن الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 11,
        questionText:
          "كم مرة تجد نفسك تتوقع المرة القادمة التي ستتصل فيها بالإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 12,
        questionText:
          "كم مرة تخشى أن تكون الحياة بدون الإنترنت مملة أو فارغة أو خالية من المتعة؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 13,
        questionText: "كم مرة تنزعج إذا قاطعك شخص ما أثناء اتصالك بالإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 14,
        questionText:
          "كم مرة تفقد النوم بسبب الدخول إلى الإنترنت في ساعات متأخرة من الليل؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 15,
        questionText:
          "كم مرة تشعر بأنك مشغول بالإنترنت عندما تكون غير متصل، أو تتخيل أنك متصل بشبكة الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 16,
        questionText:
          'كم مرة تجد نفسك تقول "بضع دقائق إضافية فقط" عندما تكون متصلاً بالإنترنت؟',
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 17,
        questionText:
          "كم مرة تحاول تقليل مقدار الوقت الذي تقضيه على الإنترنت وتفشل؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 18,
        questionText: "كم مرة تحاول إخفاء المدة التي قضيتها على الإنترنت؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 19,
        questionText:
          "كم مرة تختار قضاء المزيد من الوقت على الإنترنت بدلاً من الخروج مع الآخرين؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
      {
        questionId: 20,
        questionText:
          "كم مرة تشعر بالاكتئاب أو المزاجية أو العصبية عندما تكون غير متصل بالإنترنت، ويزول ذلك بمجرد عودتك للاتصال؟",
        options: [
          { optionId: 1, optionText: "نادراً", score: 1 },
          { optionId: 2, optionText: "أحياناً", score: 2 },
          { optionId: 3, optionText: "بشكل متكرر", score: 3 },
          { optionId: 4, optionText: "عادةً", score: 4 },
          { optionId: 5, optionText: "دائماً", score: 5 },
          { optionId: 0, optionText: "تجاهل السؤال", score: 0 },
        ],
      },
    ],
    scoring: {
      instruction:
        "اجمع نقاطك لجميع الأسئلة. كلما ارتفعت الدرجة، كلما زادت شدة مستوى إدمان الإنترنت لديك.",
      scoreRanges: [
        {
          range: "20-49",
          description: "ضمن النطاق الطبيعي.",
          color: "bg-green-600",
          info: "استخدام الإنترنت ضمن الحدود الصحية ولا يؤثر سلباً على الحياة اليومية أو العلاقات أو الرفاهية العامة.",
        },
        {
          range: "50-79",
          description:
            "أنت تعاني من مشاكل عرضية بسبب الإفراط في استخدام الإنترنت.",
          color: "bg-yellow-400",
          info: "استخدام الإنترنت بدأ يسبب اضطرابات طفيفة في الحياة اليومية، على الرغم من أنها قابلة للإدارة ببعض الجهد.",
        },
        {
          range: "80-100",
          description: "استخدامك للإنترنت يسبب مشاكل كبيرة في حياتك.",
          color: "bg-red-600",
          info: "الإفراط في استخدام الإنترنت يؤدي إلى اضطرابات كبيرة في الجوانب الشخصية والمهنية والاجتماعية من الحياة.",
        },
      ],
    },
  },

  {
    testId: "anx-2025",
    generalTitle: "مقياس القلق",

    testTitle: "مقياس القلق",
    testSlug: "anxiety-scale-arabic",

    questions: [
      {
        questionId: 1,
        questionText: "نومي مضطرب وغير مريح.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 2,
        questionText: "كانت هناك أوقات لم أستطع فيها النوم بسبب القلق.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 3,
        questionText: "مخاوفي قليلة جداً مقارنة بأصدقائي.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 4,
        questionText: "أعتقد أنني أكثر عصبية من معظم الناس.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 5,
        questionText: "غالباً ما أعاني من أحلام مزعجة أو كوابيس.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 6,
        questionText: "أعاني أحياناً من مشاكل في المعدة.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 7,
        questionText: "غالباً ما ألاحظ ارتعاش يدي عندما أحاول القيام بشيء ما.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 8,
        questionText: "أعاني أحياناً من الإسهال.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 9,
        questionText: "غالباً ما تسبب لي أمور العمل والأعمال التجارية القلق.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 10,
        questionText: "أعاني من الغثيان بسبب القلق.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 11,
        questionText: "غالباً ما أخشى أن أحمر خجلاً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 12,
        questionText: "أشعر بالجوع تقريباً طوال الوقت.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 13,
        questionText: "لدي الكثير من الثقة بالنفس.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 14,
        questionText: "أتعب بسرعة.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 15,
        questionText: "الانتظار يجعلني عصبياً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 16,
        questionText: "أشعر بالإثارة أحياناً لدرجة أنني لا أستطيع النوم.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 17,
        questionText: "عادة ما أكون هادئاً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 18,
        questionText:
          "هناك أوقات أشعر فيها بعدم الاستقرار لدرجة أنني لا أستطيع الجلوس بهدوء.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 19,
        questionText: "أنا لست سعيداً معظم الوقت.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 20,
        questionText: "يمكنني تركيز ذهني بسهولة على المهام.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 21,
        questionText: "أشعر بالقلق تجاه شيء أو شخص ما تقريباً طوال الوقت.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 22,
        questionText: "أنا لا أخاف من الأزمات أو الصعوبات.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 23,
        questionText: "أتمنى أن أكون سعيداً مثلما يبدو الآخرون.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 24,
        questionText: "غالباً ما أجد نفسي قلقاً بشأن شيء ما.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 25,
        questionText: "أشعر أحياناً بأنني عديم الفائدة تماماً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 26,
        questionText: "أشعر أحياناً وكأنني أنهار.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 27,
        questionText: "أتعرق بسهولة، حتى في الطقس البارد.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 28,
        questionText: "الحياة صعبة بالنسبة لي معظم الوقت.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 29,
        questionText: "أنا لست قلقاً بشأن مواجهة المصائب.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 30,
        questionText: "أنا شخص حساس بشكل غير عادي.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 31,
        questionText: "لاحظت أن قلبي يخفق بقوة وأحياناً أشعر بقلق شديد.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 32,
        questionText: "لا أذعر بسهولة.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 33,
        questionText: "أشعر أحياناً بأنني غير مؤهل تماماً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 34,
        questionText: "أنا شخص متوتر جداً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 35,
        questionText: "أتعرق أحياناً بشكل كثير لدرجة أنه يزعجني كثيراً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 36,
        questionText: "أحمر خجلاً أكثر من المعتاد عندما أتحدث مع الآخرين.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 37,
        questionText: "أنا أكثر حساسية من معظم الناس.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 38,
        questionText:
          "كانت هناك أوقات تراكمت فيها الصعوبات لدرجة أنني لم أستطع التغلب عليها.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 39,
        questionText: "أنا شديد التوتر أثناء القيام بشيء ما.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 40,
        questionText: "يداي وقدماي باردتان عادة.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 41,
        questionText: "أحلم أحياناً بأشياء أفضل الاحتفاظ بها لنفسي.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 42,
        questionText: "أنا واثق من نفسي.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 43,
        questionText: "أعاني أحياناً من الإمساك.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 44,
        questionText: "لا أحمر خجلاً من الإحراج أبداً.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 45,
        questionText: "لا أبكي بسهولة.",
        options: [
          { optionId: 1, optionText: "نعم", score: 0 },
          { optionId: 2, optionText: "لا", score: 1 },
        ],
      },
      {
        questionId: 46,
        questionText: "خشيت من أشياء أو أشخاص أعرف أنهم لا يستطيعون إيذائي.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 47,
        questionText: "أنا شديد التأثر بالأحداث.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 48,
        questionText: "أعاني غالباً من الصداع.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 49,
        questionText: "يجب أن أعترف بأنني شعرت بالقلق بشأن أشياء ليس لها قيمة.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
      {
        questionId: 50,
        questionText: "لا أستطيع تركيز أفكاري على شيء واحد.",
        options: [
          { optionId: 1, optionText: "نعم", score: 1 },
          { optionId: 2, optionText: "لا", score: 0 },
        ],
      },
    ],
    scoring: {
      scoreRanges: [
        {
          range: "0-16",
          description: "قلق منخفض جداً",
          color: "bg-green-600",
          info: "يشير هذا إلى حالة تكون فيها مشاعر القلق ضئيلة ولا تؤثر بشكل كبير على الأداء اليومي أو الرفاهية العاطفية.",
        },
        {
          range: "17-19",
          description: "قلق منخفض",
          color: "bg-green-500",
          info: "يتضمن القلق المنخفض مشاعر خفيفة من القلق أو عدم الارتياح التي قد تظهر أحياناً في المواقف المجهدة ولكنها قابلة للإدارة وليست ساحقة.",
        },
        {
          range: "20-24",
          description: "قلق متوسط",
          color: "bg-yellow-500",
          info: "يظهر القلق المتوسط أعراضاً أكثر تكراراً وملاحظة قد تؤثر على الأنشطة اليومية والصحة العاطفية، رغم أنها لا تزال قابلة للإدارة بالدعم أو التدخل.",
        },
        {
          range: "25-29",
          description: "قلق مرتفع",
          color: "bg-orange-600",
          info: "يتضمن القلق المرتفع مشاعر متكررة وشديدة من عدم الارتياح والتوتر التي تتداخل بشكل كبير مع الحياة اليومية، وغالباً ما تضعف الرفاهية العاطفية والجسدية.",
        },
        {
          range: "30-50",
          description: "قلق مرتفع جداً",
          color: "bg-red-600",
          info: "القلق المرتفع جداً ساحق ومنتشر، غالباً ما يؤدي إلى ضائقة عاطفية شديدة، واضطرابات في الأنشطة اليومية، واحتمالية عالية لظهور أعراض جسدية ونفسية.",
        },
      ],
    },
  },
];
