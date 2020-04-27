import 'jest';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Stacked } from './Stacked';

describe(`Stacked`, function () {
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

    it(`produces a proper div element`, function () {
        act(() => {
            render(<Stacked />, container);
        });

        const node = container.lastChild;

        expect(node).toBeDefined();
        expect(node).not.toBeNull();
        expect(node?.nodeType).toBe(Node.ELEMENT_NODE);
        expect((node as HTMLElement).tagName.toLowerCase()).toEqual('div');
    });
});
