import styled from 'styled-components';

interface VerticallyPartitionedComponentProperties {
    direction: 'vertical';
}

interface HorizontallyPartitionedComponentProperties {
    direction: 'horizontal';
}

type PartitionedComponentProperties = VerticallyPartitionedComponentProperties | HorizontallyPartitionedComponentProperties;

const Partitioned = styled.div<PartitionedComponentProperties>``;

Partitioned.displayName = 'Stacked';

export {
    Partitioned,
};
