import { getByTestId, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { HeaderShop } from ".";

describe("HeaderShop Component", () => {
    it("should items showing in screen", () => {
        const { getByText } = render(<HeaderShop activeCart={true} />, {wrapper: BrowserRouter});
        expect(getByText("Carrinho")).toBeInTheDocument();
        expect(getByText("Entrega")).toBeInTheDocument();
        expect(getByText("Finalização")).toBeInTheDocument();
    });

    it("should redirect to link", ()=>{
        const {getByText} = render(<HeaderShop activeCart={true} />,{wrapper: BrowserRouter});
        const shopElement = getByText("Carrinho");
        const infoElement = getByText("Entrega");
        const cardElement = getByText("Finalização");

        userEvent.click(shopElement);
        expect(global.window.location.pathname).toEqual("/shop");

        userEvent.click(infoElement);
        expect(global.window.location.pathname).toEqual("/info");

        userEvent.click(cardElement);
        expect(global.window.location.pathname).toEqual("/card");
    });

});
