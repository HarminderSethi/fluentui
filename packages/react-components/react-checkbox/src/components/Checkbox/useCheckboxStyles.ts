import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { CheckboxSlots, CheckboxState } from './Checkbox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
};

// The indicator size is used by the indicator and label styles
const indicatorSizeMedium = '16px';
const indicatorSizeLarge = '20px';

const useRootBaseClassName = makeResetStyles({
  position: 'relative',
  display: 'inline-flex',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useInputBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  cursor: 'pointer',
  height: '100%',
  margin: 0,
  opacity: 0,
  position: 'absolute',
  top: 0,
  // Calculate the width of the hidden input by taking into account the size of the indicator + the padding around it.
  // This is done so that clicking on that "empty space" still toggles the checkbox.
  width: `calc(${indicatorSizeMedium} + 2 * ${tokens.spacingHorizontalS})`,

  // Colors for the unchecked state
  ':enabled:not(:checked):not(:indeterminate)': {
    [`& ~ .${checkboxClassNames.label}`]: {
      color: tokens.colorNeutralForeground3,
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      borderColor: tokens.colorNeutralStrokeAccessible,
    },

    ':hover': {
      [`& ~ .${checkboxClassNames.label}`]: {
        color: tokens.colorNeutralForeground2,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        borderColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active:hover': {
      [`& ~ .${checkboxClassNames.label}`]: {
        color: tokens.colorNeutralForeground1,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        borderColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  // Colors for the checked state
  ':enabled:checked:not(:indeterminate)': {
    [`& ~ .${checkboxClassNames.label}`]: {
      color: tokens.colorNeutralForeground1,
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      backgroundColor: tokens.colorCompoundBrandBackground,
      color: tokens.colorNeutralForegroundInverted,
      borderColor: tokens.colorCompoundBrandBackground,
    },

    ':hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
        borderColor: tokens.colorCompoundBrandBackgroundHover,
      },
    },

    ':active:hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
        borderColor: tokens.colorCompoundBrandBackgroundPressed,
      },
    },
  },

  // Colors for the mixed state
  ':enabled:indeterminate': {
    [`& ~ .${checkboxClassNames.label}`]: {
      color: tokens.colorNeutralForeground1,
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      borderColor: tokens.colorCompoundBrandStroke,
      color: tokens.colorCompoundBrandForeground1,
    },

    ':hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        borderColor: tokens.colorCompoundBrandStrokeHover,
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },

    ':active:hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        borderColor: tokens.colorCompoundBrandStrokePressed,
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },

  ':disabled': {
    cursor: 'default',

    [`& ~ .${checkboxClassNames.label}`]: {
      cursor: 'default',
      color: tokens.colorNeutralForegroundDisabled,
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      borderColor: tokens.colorNeutralStrokeDisabled,
      color: tokens.colorNeutralForegroundDisabled,
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
    [`& ~ .${checkboxClassNames.indicator} svg`]: {
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
  },
});

const useInputStyles = makeStyles({
  before: {
    right: 0,
  },
  after: {
    left: 0,
  },

  large: {
    width: `calc(${indicatorSizeLarge} + 2 * ${tokens.spacingHorizontalS})`,
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  alignSelf: 'flex-start',
  boxSizing: 'border-box',
  flexShrink: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  border: tokens.strokeWidthThin + ' solid',
  borderRadius: tokens.borderRadiusSmall,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  fill: 'currentColor',
  pointerEvents: 'none',

  fontSize: '12px',
  height: indicatorSizeMedium,
  width: indicatorSizeMedium,
});

const useIndicatorStyles = makeStyles({
  large: {
    fontSize: '16px',
    height: indicatorSizeLarge,
    width: indicatorSizeLarge,
  },

  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    cursor: 'pointer',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },

  before: {
    paddingRight: tokens.spacingHorizontalXS,
  },
  after: {
    paddingLeft: tokens.spacingHorizontalXS,
  },

  // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
  // This prevents the label from expanding the height of the checkbox, but preserves line height if the label wraps.
  medium: {
    marginTop: `calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`,
  },
  large: {
    marginTop: `calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`,
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
  const { labelPosition, shape, size } = state;

  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(checkboxClassNames.root, rootBaseClassName, state.root.className);

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    checkboxClassNames.input,
    inputBaseClassName,
    size === 'large' && inputStyles.large,
    inputStyles[labelPosition],
    state.input.className,
  );

  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      checkboxClassNames.indicator,
      indicatorBaseClassName,
      size === 'large' && indicatorStyles.large,
      shape === 'circular' && indicatorStyles.circular,
      state.indicator.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      checkboxClassNames.label,
      labelStyles.base,
      labelStyles[size],
      labelStyles[labelPosition],
      state.label.className,
    );
  }

  return state;
};
