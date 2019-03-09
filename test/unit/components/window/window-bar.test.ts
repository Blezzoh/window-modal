import { Component } from "@src/components";
import { Button } from "@src/components/button";
import * as div from "@src/components/div";
import { WindowBar } from "@src/components/window/window-bar";
import { createWindowStub } from "./test-util";

const { Div } = div;

describe("WindowBar", () => {
    const title = "test title";
    let options: any;
    let windowStub: any;
    let windowBar: any;

    beforeEach(() => {
        windowStub = createWindowStub();
        options = {
            title,
            window: windowStub,
        };
        windowBar = new WindowBar(options);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        HTMLElement.prototype.addEventListener = jest.fn();
        HTMLElement.prototype.removeEventListener = jest.fn();
    });

    it("can be created", () => {
        expect(windowBar.moving).toBe(false);
        expect(windowBar.element).toEqual((
            new Div([
                new Div([title]).classname("WindowModal-title") as any,
                new Div().classname("WindowModal-bar-spacer") as any,
                new Div([
                    new Button(["_"], "minimize"),
                    new Button(["✖"], "close"),
                ]).classname("WindowModal-buttons"),
            ]).classname("WindowModal-bar ") as Component
        ).element);
        expect(HTMLElement.prototype.addEventListener).toHaveBeenCalledWith("mousedown", windowBar.onMouseDown);
    });

    it("can be compact", () => {
        windowBar = new WindowBar({
            ...options,
            compact: true,
        });

        expect(windowBar.element.className).toEqual("WindowModal-bar WindowModal-bar--compact");
    });

    it("can hide minimize button", () => {
        windowBar = new WindowBar({
            ...options,
            hideMinimize: true,
        });

        expect(windowBar.element).toEqual((
            new Div([
                new Div([title]).classname("WindowModal-title") as any,
                new Div().classname("WindowModal-bar-spacer") as any,
                new Div([
                    new Button(["✖"], "close"),
                ]).classname("WindowModal-buttons"),
            ]).classname("WindowModal-bar ") as Component
        ).element);
    });

    it("can hide close button", () => {
        windowBar = new WindowBar({
            ...options,
            hideClose: true,
        });

        expect(windowBar.element).toEqual((
            new Div([
                new Div([title]).classname("WindowModal-title") as any,
                new Div().classname("WindowModal-bar-spacer") as any,
                new Div([
                    new Button(["_"], "minimize"),
                ]).classname("WindowModal-buttons"),
            ]).classname("WindowModal-bar ") as Component
        ).element);
    });

    it("can move the window", () => {
        const originalPos = { ...windowStub.pos };
        const moveDistX = 6;
        const moveDistY = 13;
        const clickPos = {
            x: windowStub.pos.x + 20,
            y: windowStub.pos.y + 5,
        };

        const mouseDownEvent = { pageX: clickPos.x, pageY: clickPos.y };
        const mouseMoveEvent = {
            pageX: clickPos.x + moveDistX,
            pageY: clickPos.y + moveDistY,
            preventDefault: jest.fn(),
        };

        windowBar.onMouseDown(mouseDownEvent);
        expect(windowBar.moving).toBe(true);
        windowBar.onMouseMove(mouseMoveEvent);

        expect(windowStub.pos).toEqual({
            x: originalPos.x + moveDistX,
            y: originalPos.y + moveDistY,
        });
        expect(mouseMoveEvent.preventDefault).toHaveBeenCalled();
    });

    it("can minimize", () => {
        windowBar.setStyle = jest.fn();
        windowBar.minimize();

        expect(windowBar.setStyle).toHaveBeenCalledWith({ cursor: "default" });
        expect(windowBar.minimizeButton.element.textContent).toEqual("□");
        expect(windowStub.minimize).toHaveBeenCalled();
    });

    it("can maximize", () => {
        windowBar.setStyle = jest.fn();
        windowBar.maximize();

        expect(windowBar.setStyle).toHaveBeenCalledWith({ cursor: "pointer" });
        expect(windowBar.minimizeButton.element.textContent).toEqual("_");
        expect(windowStub.maximize).toHaveBeenCalled();
    });

});
