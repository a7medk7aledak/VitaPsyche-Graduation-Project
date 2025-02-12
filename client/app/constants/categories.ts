type TCategories = {
  title: string;
  description: string;
  icon: string;
  buttonTitle: string;
  buttonLink: string;
  alt: string;
}[];

export const categories: TCategories = [
  {
    title: "Depression",
    description:
      "Depression is a mental health disorder characterized by deep sadness, loss of interest or pleasure, and impaired thinking, mood, and behavior, affecting daily life.",
    icon: "/images/Home/categories/depression.png",
    buttonLink: "/doctorList?specialization=Depression",
    buttonTitle: "Go now",
    alt: "depression.png",
  },
  {
    title: "Addiction",
    description:
      "Addiction is a chronic condition in which a person compulsively uses a substance or engages in a specific behavior, often driven by physical or psychological dependency. ",
    icon: "/images/Home/categories/addiction.png",
    buttonLink: "/doctorList?specialization=Addiction",
    buttonTitle: "Go now",
    alt: "addiction.png",
  },
  {
    title: "Psychosis",
    description:
      "psychosis is a mental disorder that causes a loss of touch with reality, involving hallucinations and delusions. It requires both medication and psychological support for recovery. ",
    icon: "/images/Home/categories/Psychosis.png",
    buttonLink: "/doctorList?specialization=Psychosis",
    buttonTitle: "Go now",
    alt: "Psychosis.png",
  },
  {
    title: "Personality disorders",
    description:
      "Personality disorders are conditions where long-term patterns of behavior and thinking deviate from societal norms, affecting relationships and daily functioning.",
    icon: "/images/Home/categories/PersonalityDisorders.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Personality disorders"
    )}`,
    buttonTitle: "Go now",
    alt: "PersonalityDisorders.png",
  },
  {
    title: "Adjustment disorders",
    description:
      "Adjustment disorders are mental health conditions that occur when a person has difficulty coping with a significant life change or stressor, leading to emotional or behavioral symptoms.",
    icon: "/images/Home/categories/AdjustmentDisorders.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Adjustment disorders"
    )}`,
    buttonTitle: "Go now",
    alt: "Adjustment disorders.png",
  },
  {
    title: "Anxiety",
    description:
      "Anxiety disorders are mental health conditions where excessive fear or worry disrupts daily life, often leading to physical symptoms like rapid heartbeat.",
    icon: "/images/Home/categories/anxiety.png",
    buttonLink: "/doctorList?specialization=anxiety",
    buttonTitle: "Go now",
    alt: "anxiety.png",
  },
  {
    title: "Eating disorders",
    description:
      "Eating disorders are mental health conditions characterized by abnormal eating habits, such as extreme food restriction or overeating, often linked to emotional and psychological factors.",
    icon: "/images/Home/categories/eating.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Eating disorders"
    )}`,
    buttonTitle: "Go now",
    alt: "Eating disorders.png",
  },
  {
    title: "Sexual disorders",
    description:
      "Sexual disorders are conditions that affect a person's sexual health or behavior, causing distress or difficulty in sexual functioning, often linked to psychological or physical factors.",
    icon: "/images/Home/categories/sexual.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Sexual disorders"
    )}`,
    buttonTitle: "Go now",
    alt: "Sexual disorders.png",
  },
  {
    title: "Posttraumatic stress disorder",
    description:
      "Posttraumatic Stress Disorder (PTSD) is a mental health condition triggered by traumatic events. It causes symptoms like flashbacks, nightmares, and intense anxiety, impacting daily functioning.",
    icon: "/images/Home/categories/PosttraumaticStressDisorder.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Posttraumatic stress disorder"
    )}`,
    buttonTitle: "Go now",
    alt: "Posttraumatic stress disorder.png",
  },
  {
    title: "Bipolar disorder",
    description:
      "Bipolar disorder is a mental health condition characterized by extreme mood swings, including manic highs and depressive lows, which can affect a person's behavior, energy, and ability to function.",
    icon: "/images/Home/categories/Bipolar.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Bipolar disorder"
    )}`,
    buttonTitle: "Go now",
    alt: "Bipolar disorder.png",
  },
  {
    title: "Attention deficit hyperactivity",
    description:
      "Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental condition marked by symptoms of inattention, hyperactivity, and impulsivity, affecting focus and daily functioning.",
    icon: "/images/Home/categories/AttentionDeficitHyperactivity.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Attention deficit hyperactivity"
    )}`,
    buttonTitle: "Go now",
    alt: "Attention deficit hyperactivity.png",
  },
  {
    title: "Obsessive-compulsive",
    description:
      "Obsessive-Compulsive Disorder (OCD) is marked by recurring, unwanted thoughts (obsessions) and repetitive actions (compulsions). These behaviors are performed to reduce anxiety but can interfere with daily life.",
    icon: "/images/Home/categories/Obsessive-compulsive .png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Obsessive-compulsive"
    )}`,
    buttonTitle: "Go now",
    alt: "Obsessive-compulsive.png",
  },
  {
    title: "schizophrenia",
    description:
      "Schizophrenia is a severe mental disorder that affects thinking, emotions, and behavior, often leading to symptoms like hallucinations, delusions, and disorganized speech or behavior.",
    icon: "/images/Home/categories/schizophrenia.png",
    buttonLink: "/doctorList?specialization=schizophrenia",
    buttonTitle: "Go now",
    alt: "schizophrenia.png",
  },
  {
    title: "Marriage counseling",
    description:
      "Marriage counseling helps couples address relationship issues like communication problems, trust, and conflict. It aims to improve emotional connection and resolve conflicts for a healthier relationship.",
    icon: "/images/Home/categories/marriageCounseling.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Marriage counseling"
    )}`,
    buttonTitle: "Go now",
    alt: "Marriage counseling.png",
  },
  {
    title: "Behavioral and emotional disorders in children",
    description:
      "Behavioral and emotional disorders in children include issues like anxiety, depression, and conduct problems. These disorders affect their ability to function well in school, at home, and in social situations.",
    icon: "/images/Home/categories/BehavioralAndEmotionalDisordersInChildren.png",
    buttonLink: `/doctorList?specialization=${encodeURIComponent(
      "Behavioral and emotional disorders in children"
    )}`,
    buttonTitle: "Go now",
    alt: "Behavioral and emotional disorders in children.png",
  },
];
