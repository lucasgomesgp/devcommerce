import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from ".";
import userEvent from "@testing-library/user-event";

describe("Login Component", () => {
    it("should form works", () => {
        const { getByTestId, getByText } = render(<Login />, { wrapper: BrowserRouter });
        const btnSend = getByText("Entrar");

        expect(getByTestId("email")).toBeInTheDocument();
        expect(getByTestId("password")).toBeInTheDocument();
        expect(btnSend).toBeInTheDocument();
    });

    it("should send form working", () => {
        const { getByText, getByTestId } = render(<Login />, { wrapper: BrowserRouter });
        const btnSend = getByText("Entrar");
        const emailElement = getByTestId("email");
        const passwordElement = getByTestId("password");

        userEvent.type(emailElement, "lucas@lucas.com")
        userEvent.type(passwordElement, "123456dadadas");

        expect(emailElement).toHaveValue("lucas@lucas.com");
        expect(passwordElement).toHaveValue("123456dadadas");

        userEvent.click(btnSend);

        waitFor(() => {
            expect(global.window.location.pathname).toEqual("/home");
        });

    });
});
