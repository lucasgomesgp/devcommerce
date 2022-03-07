import { render } from "@testing-library/react";
import { Input } from ".";

describe("Input Component", () =>{
    it("should input working", () =>{
        const {getByPlaceholderText} = render(<Input type="email" placeholder="Email"/>);
        const inputElement = getByPlaceholderText("Email");

        expect(inputElement).toBeInTheDocument();
    });
});
