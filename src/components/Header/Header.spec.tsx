import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act, renderHook } from "@testing-library/react-hooks";
import { useShop } from "../../hooks/useShop";
import itemsShopMock from "../../mocks/itemsShopMock";
import { Header } from ".";
import { removeItem, setItem } from "../../storage";
import { useAuth } from "../../hooks/Auth";

jest.mock("../../storage");

describe("Header Component", () => {
    it("should logout clean storage and hook", () => {
        const { getByTestId } = render(<Header />, { wrapper: BrowserRouter });
        const btnLogout = getByTestId("logout");

        userEvent.click(btnLogout);
        expect(global.localStorage.length).toBe(0);

        expect(global.window.location.pathname).toEqual("/");
    });

    it("should navigation after click works", () => {
        const { getByTestId } = render(<Header />, { wrapper: BrowserRouter });

        const homeHamburgerBtn = getByTestId("home_hamburger");
        const shopHamburgerBtn = getByTestId("shop_hamburger");

        userEvent.click(homeHamburgerBtn);

        expect(global.window.location.pathname).toEqual("/home");

        userEvent.click(shopHamburgerBtn);

        expect(global.window.location.pathname).toEqual("/shop");
    });

    it("should add and remove items on cart", () => {
        render(<Header />, { wrapper: BrowserRouter });
        const { result } = renderHook(() => useShop());

        act(() => {
            setItem("PRODUCTS", [...itemsShopMock]);
            result.current.items = [...itemsShopMock];
        });
        expect(setItem).toHaveBeenCalledTimes(1);
        expect(result.current.items.length).toBe(2);
        expect(setItem).toHaveBeenCalledWith("PRODUCTS", [...itemsShopMock]);

        act(() => {
            removeItem("PRODUCTS");
            result.current.items = [];
        });

        expect(removeItem).toHaveBeenCalledTimes(1);
        expect(result.current.items.length).toEqual(0);

    });


    it("should menu hamburger toggle correctly", () => {
        const { getByRole, getByTestId } = render(<Header />, { wrapper: BrowserRouter });

        const menuHamburger = getByRole("list", { hidden: true });
        const toggler = getByTestId("hamburger");

        expect(menuHamburger.getAttribute("aria-hidden")).toBe("true");
        expect(menuHamburger).toHaveStyle({ display: "block" });

        userEvent.click(toggler);

        expect(menuHamburger.getAttribute("aria-hidden")).toBe("false");
        expect(menuHamburger).toHaveStyle({ height: "42vh" });

        userEvent.click(toggler);
        expect(menuHamburger.getAttribute("aria-hidden")).toBe("true");
        expect(menuHamburger).toHaveStyle({ display: "none" });
        expect(menuHamburger).toHaveStyle({ height: "0" });
    });
});
