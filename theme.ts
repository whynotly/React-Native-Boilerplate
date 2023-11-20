export interface DisplayFontScheme {
  fontSize: number;
  fontStyle: 'normal';
  lineHeight: number;
}

type ColorShades = {
  '50': string;
  '100': string;
  '150': string;
  '200': string;
  '250': string;
  '300': string;
  '350': string;
  '400': string;
  '450': string;
  '500': string;
  '600': string;
  '650': string;
  '700': string;
  '750': string;
  '800': string;
  '850': string;
  '900': string;
};

export interface FontScheme {
  display2xl: DisplayFontScheme;
  displayxl: DisplayFontScheme;
  displaylg: DisplayFontScheme;
  displaymd: DisplayFontScheme;
  displaysm: DisplayFontScheme;
  displayxs: DisplayFontScheme;
  textxl: DisplayFontScheme;
  textmd: DisplayFontScheme;
  textsm: DisplayFontScheme;
  textxs: DisplayFontScheme;
}

type ColorScheme = {
  base: {
    white: string;
    black: string;
  };
  gray: ColorShades;
  primary: ColorShades;
  secoundary: ColorShades;
  third: ColorShades;
  error: ColorShades;
  warning: ColorShades;
  success: ColorShades;
};

type Shadow = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
};

type ShadowsScheme = {
  xs: Shadow;
  sm: Shadow;
  md: Shadow;
  lg: Shadow;
  xl: Shadow;
  '2xl': Shadow;
  '3xl': Shadow;
};

type SpacingScheme = {
  [key in
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '8'
    | '10'
    | '12'
    | '16'
    | '20'
    | '24'
    | '32'
    | '40'
    | '48'
    | '56'
    | '64']: number;
};

export interface Theme {
  fonts: FontScheme;
  colors: ColorScheme;
  shadows: ShadowsScheme;
  spacing: SpacingScheme;
}

const theme: Theme = {
  fonts: {
    display2xl: {
      fontSize: 72,
      lineHeight: 90,
      fontStyle: 'normal',
    },
    displayxl: {
      fontSize: 60,
      lineHeight: 72,
      fontStyle: 'normal',
    },
    displaylg: {
      fontSize: 48,
      lineHeight: 60,
      fontStyle: 'normal',
    },
    displaymd: {
      fontSize: 36,
      lineHeight: 44,
      fontStyle: 'normal',
    },
    displaysm: {
      fontSize: 30,
      lineHeight: 38,
      fontStyle: 'normal',
    },
    displayxs: {
      fontSize: 24,
      lineHeight: 32,
      fontStyle: 'normal',
    },
    textxl: {
      fontSize: 20,
      lineHeight: 30,
      fontStyle: 'normal',
    },
    textmd: {
      fontSize: 16,
      lineHeight: 24,
      fontStyle: 'normal',
    },
    textsm: {
      fontSize: 14,
      lineHeight: 20,
      fontStyle: 'normal',
    },
    textxs: {
      fontSize: 12,
      lineHeight: 18,
      fontStyle: 'normal',
    },
  },
  colors: {
    base: {
      white: '#fff',
      black: '#000',
    },
    gray: {
      '50': '#f0f1f3',
      '100': '#e0e2e7',
      '150': '#d1d4da',
      '200': '#c2c6ce',
      '250': '#b3b8c2',
      '300': '#a3a9b6',
      '350': '#949baa',
      '400': '#858d9d',
      '450': '#757e91',
      '500': '#667085',
      '600': '#525a6a',
      '650': '#474e5d',
      '700': '#3d4350',
      '750': '#333843',
      '800': '#292d35',
      '850': '#1f2228',
      '900': '#14161b',
    },
    primary: {
      '50': '#e6edfd',
      '100': '#cddbfa',
      '150': '#b3c8f8',
      '200': '#9ab6f5',
      '250': '#81a4f3',
      '300': '#6892f1',
      '350': '#4f80ee',
      '400': '#356dec',
      '450': '#1c5be9',
      '500': '#0349e7',
      '600': '#023ab9',
      '650': '#0233a2',
      '700': '#022c8b',
      '750': '#022574',
      '800': '#011d5c',
      '850': '#011645',
      '900': '#010f2e',
    },
    secoundary: {
      '50': '#eaf5ff',
      '100': '#d5ecff',
      '150': '#c0e2ff',
      '200': '#abd8ff',
      '250': '#97cfff',
      '300': '#82c5ff',
      '350': '#6dbbff',
      '400': '#58b1ff',
      '450': '#43a8ff',
      '500': '#2E9EFF',
      '600': '#257ecc',
      '650': '#206fb3',
      '700': '#1c5f99',
      '750': '#174f80',
      '800': '#123f66',
      '850': '#0e2f4d',
      '900': '#092033',
    },
    third: {
      '50': '#e8f2ff',
      '100': '#d2e5ff',
      '150': '#bbd7ff',
      '200': '#a4caff',
      '250': '#8ebdff',
      '300': '#77b0ff',
      '350': '#60a3ff',
      '400': '#4995ff',
      '450': '#3388ff',
      '500': '#1C7BFF',
      '600': '#1662cc',
      '650': '#1456b3',
      '700': '#114a99',
      '750': '#0e3e80',
      '800': '#0b3166',
      '850': '#08254d',
      '900': '#061933',
    },
    error: {
      '50': '#feeceb',
      '100': '#fcdad7',
      '150': '#fbc7c3',
      '200': '#f9b4af',
      '250': '#f8a29c',
      '300': '#f68f88',
      '350': '#f57c74',
      '400': '#f36960',
      '450': '#f2574c',
      '500': '#F04438',
      '600': '#c0362d',
      '650': '#a83027',
      '700': '#902922',
      '750': '#78221c',
      '800': '#601b16',
      '850': '#481411',
      '900': '#300e0b',
    },
    warning: {
      '50': '#fef4e6',
      '100': '#fde9ce',
      '150': '#fddeb5',
      '200': '#fcd39d',
      '250': '#fbc884',
      '300': '#fabc6b',
      '350': '#f9b153',
      '400': '#f9a63a',
      '450': '#f89b22',
      '500': '#F79009',
      '600': '#c67307',
      '650': '#ad6506',
      '700': '#945605',
      '750': '#7c4805',
      '800': '#633a04',
      '850': '#4a2b03',
      '900': '#311d02',
    },
    success: {
      '50': '#f0f5ea',
      '100': '#e0ecd4',
      '150': '#d1e2bf',
      '200': '#c2d9aa',
      '250': '#b3cf95',
      '300': '#a3c57f',
      '350': '#94bc6a',
      '400': '#85b255',
      '450': '#75a93f',
      '500': '#669F2A',
      '600': '#527f22',
      '650': '#476f1d',
      '700': '#3d5f19',
      '750': '#335015',
      '800': '#294011',
      '850': '#1f300d',
      '900': '#142008',
    },
  },
  shadows: {
    xs: {
      shadowColor: 'rgba(16, 24, 40, 0.05)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    sm: {
      shadowColor: 'rgba(16, 24, 40, 0.10)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    md: {
      shadowColor: 'rgba(16, 24, 40, 0.10)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    lg: {
      shadowColor: 'rgba(16, 24, 40, 0.08)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.03,
      shadowRadius: 6,
    },
    xl: {
      shadowColor: 'rgba(16, 24, 40, 0.08)',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.03,
      shadowRadius: 8,
    },
    '2xl': {
      shadowColor: 'rgba(16, 24, 40, 0.18)',
      shadowOffset: {
        width: 0,
        height: 24,
      },
      shadowOpacity: 0.18,
      shadowRadius: 24,
    },
    '3xl': {
      shadowColor: 'rgba(16, 24, 40, 0.14)',
      shadowOffset: {
        width: 0,
        height: 32,
      },
      shadowOpacity: 0.14,
      shadowRadius: 32,
    },
  },
  spacing: {
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '8': 32,
    '10': 40,
    '12': 48,
    '16': 64,
    '20': 80,
    '24': 96,
    '32': 128,
    '40': 160,
    '48': 192,
    '56': 224,
    '64': 256,
  },
};

export default theme;
