/// <reference types="cypress" />

describe("Login and Sale", () => {
    it("should login work", () => {
        cy.visit("http://localhost:3000");
        cy.get("input[type=text]").type("lucas@email.com");
        cy.get("input[type=password]").type("password");
        cy.get("button[type=submit]").click();

    });
    it("should sale working", () => {
        localStorage.setItem("user","logged");
        cy.visit("http://localhost:3000/home");

        //Carrinho

        cy.get(":nth-child(1) > [data-cy='btnCart']").dblclick();
        cy.get(":nth-child(2) > [data-cy='btnCart']").click();
        cy.get(":nth-child(3) > [data-cy='btnCart']").dblclick();
        cy.get("[data-cy='shop']").click();

        //Carrinho - Adicionar/Remover
        cy.get(":nth-child(2) > [data-cy='items-section'] > [data-cy='qtd'] > [data-testid='plus']").dblclick();
        cy.get(":nth-child(1) > [data-cy='items-section'] > [data-cy='qtd'] > [data-testid='sub']").click();
        cy.get(":nth-child(3) > [data-cy='items-section'] > [data-cy='qtd'] > [data-testid='plus']").dblclick();
        cy.get(":nth-child(2) > [data-cy='items-section'] > [data-cy='qtd'] > [data-testid='sub']").dblclick();
        cy.get("[style='background-color: green;']").click();

        //Informações
        cy.get("[name='name']").type("Lucas");
        cy.get("[name='lastName']").type("Gomes");
        cy.get("[data-cy='cep']").type("63275000");
        cy.wait(2000);
        cy.get("[data-cy='send']").click();

        //Cartão de crédito
        cy.get("[name='number']").type("5145547041236589");
        cy.get("[name='name']").type("Lucas Gomes");
        cy.get("[name='month']").type("08");
        cy.get("[name='year']").type("28");
        cy.get("[data-testid='cvv']").type("123",{force: true});
        cy.get("[data-cy='done']").click();
        cy.get("[data-cy='home']").click();
        cy.get("[data-testid='logout']").click();
    });
})
