export type ColorPalette = 'blush' | 'stone' | 'slate' | 'sage';

export interface ApologyData {
  recipient: string;
  sender: string;
  whatHappened: string;
  impactAndResponsibility: string;
  whatDifferent: string;
  sharedMemory: string;
  closingLine: string;
  contactType: 'whatsapp' | 'sms' | 'email' | 'none';
  contactValue: string;
  palette: ColorPalette;
}

export const DEFAULT_APOLOGY: ApologyData = {
  recipient: 'Siddhi',
  sender: 'Psycho Shyan',
  whatHappened: 'I should have told you much sooner than I did. I kept quiet and hesitated, and that was unfair to you.',
  impactAndResponsibility: 'You deserved honesty from the start. Keeping it to myself left you in the dark, and I know that broke your trust. There is no excuse for waiting.',
  whatDifferent: 'Going forward, I will be open with you right away, even when the truth feels difficult to say.',
  sharedMemory: 'I was thinking about how much your honesty has always meant to me. You have always been genuine with me, and you deserved that same openness in return.',
  closingLine: "Please take all the time and space you need. You don't have to reply or reassure me of anything. I just wanted to say this, and to tell you how truly sorry I am.",
  contactType: 'whatsapp',
  contactValue: '',
  palette: 'blush',
};

export interface PaletteTheme {
  name: string;
  id: ColorPalette;
  description: string;
  light: {
    bg: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    accent: string;
    accentHover: string;
    accentSubtle: string;
  };
  dark: {
    bg: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    accent: string;
    accentHover: string;
    accentSubtle: string;
  };
}

export const PALETTES: Record<ColorPalette, PaletteTheme> = {
  blush: {
    name: 'Soft Blush & Linen',
    id: 'blush',
    description: 'Tender porcelain and muted rose tones',
    light: {
      bg: 'bg-[#FAF7F5]',
      surface: 'bg-[#F4EFEB]',
      textPrimary: 'text-[#2D2825]',
      textSecondary: 'text-[#5E5550]',
      textMuted: 'text-[#8C817A]',
      border: 'border-[#EAE1DA]',
      accent: 'bg-[#8F6A64] text-white',
      accentHover: 'hover:bg-[#7D5B56]',
      accentSubtle: 'bg-[#F2E7E4] text-[#744E49]',
    },
    dark: {
      bg: 'dark:bg-[#1A1817]',
      surface: 'dark:bg-[#23201F]',
      textPrimary: 'dark:text-[#ECE7E3]',
      textSecondary: 'dark:text-[#B5ABA4]',
      textMuted: 'dark:text-[#7D746D]',
      border: 'dark:border-[#332E2A]',
      accent: 'dark:bg-[#B38780] dark:text-[#181615]',
      accentHover: 'dark:hover:bg-[#C49992]',
      accentSubtle: 'dark:bg-[#2A2322] dark:text-[#D9ACA5]',
    },
  },
  stone: {
    name: 'Warm Gray & Parchment',
    id: 'stone',
    description: 'Understated limestone and quiet charcoal',
    light: {
      bg: 'bg-[#F8F7F4]',
      surface: 'bg-[#EFECE6]',
      textPrimary: 'text-[#262422]',
      textSecondary: 'text-[#56524D]',
      textMuted: 'text-[#857F77]',
      border: 'border-[#E3DFD7]',
      accent: 'bg-[#5C5750] text-white',
      accentHover: 'hover:bg-[#4A463F]',
      accentSubtle: 'bg-[#EAE6DE] text-[#4A453F]',
    },
    dark: {
      bg: 'dark:bg-[#161514]',
      surface: 'dark:bg-[#201E1C]',
      textPrimary: 'dark:text-[#E8E6E1]',
      textSecondary: 'dark:text-[#ABA69D]',
      textMuted: 'dark:text-[#767168]',
      border: 'dark:border-[#2E2B27]',
      accent: 'dark:bg-[#9E978C] dark:text-[#161514]',
      accentHover: 'dark:hover:bg-[#B0A99E]',
      accentSubtle: 'dark:bg-[#262320] dark:text-[#CBC4B9]',
    },
  },
  slate: {
    name: 'Pale Blue & Mist',
    id: 'slate',
    description: 'Tranquil coastal mist and weathered indigo',
    light: {
      bg: 'bg-[#F5F7FA]',
      surface: 'bg-[#EBF0F5]',
      textPrimary: 'text-[#1F262E]',
      textSecondary: 'text-[#4A5563]',
      textMuted: 'text-[#7B8794]',
      border: 'border-[#DAE2EB]',
      accent: 'bg-[#4B6375] text-white',
      accentHover: 'hover:bg-[#3D5262]',
      accentSubtle: 'bg-[#E2EAF1] text-[#3E5568]',
    },
    dark: {
      bg: 'dark:bg-[#13171B]',
      surface: 'dark:bg-[#1B2127]',
      textPrimary: 'dark:text-[#E4E9F0]',
      textSecondary: 'dark:text-[#A4B1C0]',
      textMuted: 'dark:text-[#6C7B8B]',
      border: 'dark:border-[#27313B]',
      accent: 'dark:bg-[#7F9BB1] dark:text-[#101418]',
      accentHover: 'dark:hover:bg-[#92ADC4]',
      accentSubtle: 'dark:bg-[#1C2630] dark:text-[#AEC7DC]',
    },
  },
  sage: {
    name: 'Pale Sage & Linen',
    id: 'sage',
    description: 'Quiet eucalyptus and soothing natural earth',
    light: {
      bg: 'bg-[#F6F7F4]',
      surface: 'bg-[#ECEFE8]',
      textPrimary: 'text-[#222923]',
      textSecondary: 'text-[#4D584F]',
      textMuted: 'text-[#7D8A7F]',
      border: 'border-[#DCE2D9]',
      accent: 'bg-[#506654] text-white',
      accentHover: 'hover:bg-[#415445]',
      accentSubtle: 'bg-[#E3EBE4] text-[#415545]',
    },
    dark: {
      bg: 'dark:bg-[#131714]',
      surface: 'dark:bg-[#1C221D]',
      textPrimary: 'dark:text-[#E4EBE5]',
      textSecondary: 'dark:text-[#A3B3A6]',
      textMuted: 'dark:text-[#6E7E72]',
      border: 'dark:border-[#263128]',
      accent: 'dark:bg-[#86A28A] dark:text-[#111612]',
      accentHover: 'dark:hover:bg-[#98B59D]',
      accentSubtle: 'dark:bg-[#1E2920] dark:text-[#B1CCB6]',
    },
  },
};
