import styled from 'styled-components';

interface BoxedComponentProperties {
    height?: string;
    width?: string;
    maxHeight?: string;
    maxWidth?: string;
}

const NON_FORWARDED_PROPERTIES = [
    'height',
    'width',
    'maxHeight',
    'maxWidth',
];

const Boxed = styled.div.withConfig<BoxedComponentProperties>({
    shouldForwardProp: (prop, defaultValidatorFn) => !NON_FORWARDED_PROPERTIES.includes(prop) && defaultValidatorFn(prop),
})`
    height: ${ ({ height }): string => height || 'auto' };
    width: ${ ({ width }): string => width || 'auto' };
    max-height: ${ ({ maxHeight }): string => maxHeight || 'auto' };
    max-width: ${ ({ maxWidth }): string => maxWidth || 'auto' };
`;

Boxed.displayName = 'Stacked';

export {
    Boxed,
};
