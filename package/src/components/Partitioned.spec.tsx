import 'jest';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Partitioned, PartitionedComponentProperties } from './Partitioned';

describe(`Partitioned`, function () {
    let container: HTMLDivElement;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
    });

    const SUPPORTED_DIRECTIONS: Array<PartitionedComponentProperties['direction']> = [ 'vertical', 'horizontal' ];

    for (const direction of SUPPORTED_DIRECTIONS) {
        it(`produces a proper div element in ${ direction } mode`, function () {
            act(() => {
                render(<Partitioned direction={ direction } />, container);
            });

            const node = container.lastChild;

            expect(node).toBeDefined();
            expect(node).not.toBeNull();
            expect(node?.nodeType).toBe(Node.ELEMENT_NODE);
            expect((node as HTMLElement).tagName.toLowerCase()).toEqual('div');
        });
    }
});
