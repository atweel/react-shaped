import 'jest';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { paramCase } from 'param-case';

import { Boxed } from './Boxed';

describe('Boxed', function () {
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

    it('produces a proper div element', function () {
        act(() => {
            render(<Boxed />, container);
        });

        const node = container.lastChild;

        expect(node).toBeDefined();
        expect(node).not.toBeNull();
        expect(node?.nodeType).toBe(Node.ELEMENT_NODE);
        expect((node as HTMLElement).tagName.toLowerCase()).toEqual('div');
    });

    for (const propertyName of [ 'height', 'width', 'maxHeight', 'maxWidth' ]) {
        it(`applies CSS '${ propertyName }' property while leaving '${ propertyName }' attribute not set`, function () {
            act(() => {
                render(<Boxed { ...{ [propertyName]: '20px' } } />, container);
            });

            const element = container.lastChild as HTMLElement;

            const style = getComputedStyle(element);

            const cssPropertyName = paramCase(propertyName);

            expect(element.getAttribute(cssPropertyName)).toBeNull();
            expect(style.getPropertyValue(cssPropertyName)).toEqual('20px');
        });
    }
});
